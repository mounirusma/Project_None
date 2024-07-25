const apperWrapper = require("../MiddleWers/TryCatch");
const ERROR = require("../Utilis/FnError");
const httpText = require("../Utilis/statusText");
const JWT = require("jsonwebtoken");

 const Role ="";


const Auth =  apperWrapper( async (req , res , next)=>{
 const authToken = req.headers["Authorization"] || req.headers["authorization"];
 if(!authToken){
    return  next(ERROR("Your not Logged in " ,401 , httpText.FAIL ));
 }

 const Token = authToken.split(' ')[1];

 try{

    const decodeToket = JWT.verify(Token , process.env.SUCRET_KEY);
    req.User =  decodeToket;    
     next();
 }catch(err){
    return  next(ERROR("token invalid " ,401 , httpText.ERROR ));

 }

}
)

module.exports = Auth  ;

