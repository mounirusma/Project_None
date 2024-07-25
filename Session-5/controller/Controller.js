 let courses = require("../Models/courses")
 const {validationResult} = require("express-validator")
 const httpText = require("../Utilis/statusText");
const asyncWrapper = require("../MiddleWers/TryCatch")
const Error = require("../Utilis/FnError")

const getAllCourses = asyncWrapper( async (req , res)=>{
//pagination
let query   = req.query ;
let limit = query.limit || 3;
let page = query.page || 1;
let skip = (page - 1)*limit;


// const Courses  = await courses.find({title:"title1"} , {"__v":false}); // fiha 2 object 1-how quiryFilter w 2-Projection
// const Courses  = await courses.find().limit(limit).skip(skip);
const Courses  = await courses.find();

    res.json({status:httpText.SUCCESS,data:{Courses}});  
  }
);

  const getSingleCours = asyncWrapper(
                         async (req , res , next)=>{
    const course = await courses.findById(req.params.id);
    if(!course){
        return  next(Error("Course is not Found" , 400 , httpText.FAIL))
    }
    
      res.json({status:httpText.SUCCESS , data:{course}});
         
}
  );


const createCourse = asyncWrapper( async (req , res , next)=>{
    const Err = validationResult(req);
    
    if(!Err.isEmpty()){
         //return res.status(400).json({status:httpText.FAIL , data:Error.array() });
    
        return next(Error( Err.array() , 400 , httpText.FAIL ))
    } 
    const newCourse = new courses(req.body);
    await newCourse.save();
    res.status(201).json({status:httpText.SUCCESS , data:{course:newCourse}});
    }
)


const updateCourse =  asyncWrapper(async(req , res , next)=>{

    let id = req.params.id;
    const courseUpdate  = await courses.findByIdAndUpdate(id , {$set:{...req.body}})

    if(!courseUpdate){
       
        return next(Error("not found Course" , 400 , httpText.FAIL));
    }
    
    res.json({status:httpText.SUCCESS , data:{course:courseUpdate}})
}
);

const deleteCourse = asyncWrapper( async (req , res , next)=>{
    const deleteCourse = await courses.findByIdAndDelete({_id:req.params.id})
    if(!deleteCourse){
        return next(Error("not found Course" , 400 , httpText.FAIL));
    }
    res.json({status:httpText.SUCCESS , data:null});
}
);




module.exports = {
    getAllCourses,
    getSingleCours,
    createCourse,
    updateCourse,
    deleteCourse
}