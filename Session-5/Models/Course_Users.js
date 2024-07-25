const mongose = require("mongoose");
const validator = require("validator");
const Roles = require("../Utilis/roles");

const shema = mongose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:[true , "this email is duplicated"],
        validate : [validator.isEmail ,"is not Email"]


    },
    password:{
        type:String,
        require:true
    },
    token : {
        type:String,
        unique:true
    },
    role:{
        type:String,
        enum:[Roles.ADMIN , Roles.USER , Roles.MANAGER],
        default : Roles.USER
    },
    avatar:{
        type:String,
        default:'/uploads/profail.jfif'
    }
});

module.exports=mongose.model("Course_User" , shema);