
const express = require("express");
const router = express.Router();
const {body , validationResult} = require("express-validator")
//Functions
const { getAllCourses,getSingleCours,createCourse,updateCourse,deleteCourse } = require("../controller/Controller");
const verifyToken = require("../MiddleWers/auth");
const verifyRoles = require("../MiddleWers/VerifyRole");
const Validation = require("../MiddleWers/ValidationCours")
const Roles = require("../Utilis/roles");
const Role = require("../MiddleWers/auth");
console.log(Role);
router.route("/")
                .get( getAllCourses)
                .post( Validation(), verifyToken , verifyRoles(Roles.ADMIN), createCourse);



router.route("/:id")
                   .get( getSingleCours )
                   .patch(  updateCourse)
                   .delete(verifyToken , verifyRoles(Roles.ADMIN) , deleteCourse)

module.exports = router;