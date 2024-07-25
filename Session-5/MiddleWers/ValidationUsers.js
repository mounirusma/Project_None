const { body } = require("express-validator")



const Validation =()=>{

    return [
        body('name').notEmpty().withMessage("name is required").isLength({min :2}).withMessage("length is long"),
        body('email').notEmpty().withMessage("email is required"),
        body('password').notEmpty().withMessage("password is required").isLength({min :8}).withMessage("length is long"),


    ]
} 



module.exports=Validation
