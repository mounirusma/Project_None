const {validationResult} = require("express-validator");
const Users  = require("../Models/Course_Users");
const apperWrapper = require("../MiddleWers/TryCatch");
const ERROR = require("../Utilis/FnError");
const httpText = require("../Utilis/statusText");
const bcrypt = require('bcryptjs');
const genToken = require("../Utilis/genToken");


const getUsers = apperWrapper( async (req , res , next)=>{

    const users = await Users.find({} ,{password:false});

    if(!users){
      return next(ERROR("Users not Found" , 401 , httpText.FAIL ))
    }

    res.json({status:httpText.SUCCESS , data:{users:users}})
}
);


const getSingleUser = apperWrapper(async(req , res , next)=>{
    

    const user = await  Users.findById(req.params.id);

    if(!user){
        return next(ERROR("User not Found" , 401 , httpText.FAIL ))
    }
    res.json({status:httpText.SUCCESS , data:{users:user}})
})


const Registry = apperWrapper(async(req , res , next)=>{
    const verify = validationResult(req);

    if(!verify.isEmpty()){
        return next(ERROR(verify.array() , 401 , httpText.ERROR ))
    }
    
const {name , email , password , role} = req.body;

const verifyEmail =await  Users.find({email:email});


if(verifyEmail.length !== 0){
    return next(ERROR("this email is alredey exist  " , 401 , httpText.FAIL ))
}

let hash = await bcrypt.hash(password , 8);

  const newUser = new Users({
    name ,
     email ,
      password : hash,
      role ,
      avatar:req.file.filename

  });

const Token = await  genToken({email:newUser.email , id:newUser._id , role:newUser.role});
newUser.token = Token;
await newUser.save();

res.json({status:httpText.SUCCESS , data:{users:newUser}})

})


const updateUser = apperWrapper(async (req , res , next)=>{
  const id = req.params.id;
    const user = Users.findByIdAndUpdate(id , {$set:{...req.body}});
    if(!user){
        return next(ERROR("User not Found" , 401 , httpText.FAIL ))

    }
    res.json({status:httpText.SUCCESS , data:{user}})


})

const deleteUser = apperWrapper(async (req , res , next)=>{
    const user = Users.findByIdAndDelete(id);
    if(!user){
        return next(ERROR("User not Found" , 401 , httpText.FAIL ))

    }
    res.json({status:httpText.SUCCESS , data:{user}})

})

const Login = apperWrapper( async(req , res , next)=>{

const {email , password} = req.body;
 
const verify = validationResult(req);

if(!verify.isEmpty()){
        return next(ERROR(verify.array() , 401 , httpText.FAIL ));
}

const user = await Users.findOne({email:email});

if(!user){
        return next(ERROR("Username is inCorect" , 401 , httpText.FAIL ))
}

const passwordUser = await bcrypt.compare(password , user.password);
       
if(!passwordUser){
        return next(ERROR("password is inCorect" , 401 , httpText.FAIL ))
}
 
const Token =  await genToken({email:user.email , id:user._id , role:user.role});
res.json({status:"Success" , data:{token:Token}  });    
})


module.exports = {
    getUsers,
    getSingleUser,
    Registry,
    updateUser,
    deleteUser,
    Login
}