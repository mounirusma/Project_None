const express  = require("express");
const router = express.Router();
const Validation = require("../MiddleWers/ValidationUsers");
const {  getUsers,getSingleUser,Registry,updateUser,deleteUser,Login} = require("../controller/userController");
const ValidationLogin = require("../MiddleWers/ValidationLogin");
const Auth = require("../MiddleWers/auth");
const multer  = require('multer')
const Err = require("../Utilis/FnError");
const httpText = require("../Utilis/statusText");

const storage =multer.diskStorage( {
    destination:function(req , file , cb){
        cb(null , 'upload');
       
    },
    filename:function(req , file , cb){
        const ext = file.mimetype.split('/')[1];
        const name = `user-${Date.now()}.${ext}`;
        cb(null , name)
    }
});

const fileFilter =  function(req , file , cb){
    const fil = file.mimetype.split('/')[0];
     console.log("Fil" , fil);
     console.log("file" , file);

    if(fil =="image"){
         cb(null , true);
    }else {
       return  cb(Err( httpText.ERROR, 404 , "File required is image") , false)
    }

};


const upload = multer({ storage:storage , fileFilter});


router.route("/").get(Auth , getUsers);
                
                

router.route("/:id")
                    .patch(updateUser)
                    .delete(deleteUser)
                    .get(getSingleUser);

router.route("/login").post(ValidationLogin()  , Login)
router.route("/registry").post(upload.single('avatar') , Validation() , Registry);                    
                     
module.exports=router;









