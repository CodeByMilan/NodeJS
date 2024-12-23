const express = require("express");
const app = express();
const PORT = 3000;

require("./model/index");
const { renderHomePage} = require("./controller /authController");
//used to parse cookie as nodejs cannot read cookie by default
const cookieParser = require("cookie-parser");
const authRoute =require("./routes/authRoute")
const questionRoute=require("./routes/questionRoute");
const answerRoute =require("./routes/answerRoute")
const {promisify}=require('util')
const jwt = require('jsonwebtoken');

//to render frontend ejs template engine is used
app.set("view engine", "ejs");
// by default nodejs doesnot understand incomming data so to understand the data coming from the frontendlike ejs template
app.use(express.urlencoded({ extended: true })); //ssr
//if data is coming from other like react , angular etc then use json
app.use(express.json());
app.use(cookieParser())

app.use (async(req,res,next)=>{
  const token =req.cookies.token;
 try{
  const decryptedResult = await promisify(jwt.verify)(token,"milan")
  //locals is like making a variable global  given by express which can be accessed anywhere 
  if(decryptedResult){
    res.locals.isAuthenticated=true
  }else{
    res.locals.isAuthenticated=false
  }
 }catch(error){
  res.locals.isAuthenticated=false
 };
  //console.log(token)
  next()
})

app.get("/", renderHomePage)

app.use('',authRoute)
app.use('',questionRoute)
app.use('/answer',answerRoute)

app.use(express.static("./uploads/"))
app.use(express.static("public/css/"));
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
