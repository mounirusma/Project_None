

const express = require("express");
const httpText = require("./Utilis/statusText");
const app = express();
const Cors = require("cors")
const path = require('path');
require("dotenv").config();
app.use(express.json());
app.use(Cors());

const mongoose = require('mongoose');
const url=process.env.MONGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  
  socketTimeoutMS: 45000,         
}).then(()=>{
  console.log("Server is started");
})

const courseRouter = require("./Router/courseRouter");
const usersRouter = require("./Router/UsersRouter");

app.use("/api/courses" , courseRouter);
app.use("/api/users" , usersRouter );

// express static to hundle image and video
app.use("/uploads" , express.static(path.join(__dirname , "upload")));

// middleware globale
app.all("*" , (req , res ,next)=>{
  res.json({status:httpText.ERROR , data:null , message:"This router is not avialable" ,code:404})
})

//middleWare for try and catch

app.use((error , req , res , next)=>{
  res.status(error.status || 500).json({status:error.statusText|| httpText.ERROR, data:null , message:error.message ,code:404})
})



app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 5000`);
});

