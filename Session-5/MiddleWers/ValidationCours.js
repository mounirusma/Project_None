const { body } = require("express-validator")



const Validation =()=>{

    return [
        body('title').notEmpty().withMessage("title is required").isLength({min :2}).withMessage("length is long") 
    ]
} 



module.exports=Validation
