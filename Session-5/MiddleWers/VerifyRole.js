const apperWrapper  = require("./TryCatch");
const Roles = require("../Utilis/roles");
const Err = require("../Utilis/FnError");
const httpText = require("../Utilis/statusText");

module.exports = verifyRole = (...role )=>{

    

    return  (req , res , next)=>{

        const V_role = role.some((e)=> e == req.User.role);

        console.log(V_role);
            if(V_role){
                next();
            }else {
                next(Err("your not accsible ", 401 ,httpText.FAIL  ));
            }
        }
    
    
  



}





