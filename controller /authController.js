const { users } = require("../model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.renderHomePage=(req, res) => {
    res.render("home.ejs");
  };

  exports.renderRegisterPage=(req, res) => {
    res.render("auth/register");
  };

  exports.renderLoginPage=(req, res) => {
    res.render("auth/login");
  }

  exports.handleRegister=async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("Please fill all the fields");
    } 
    //application level validation 
    // const data =await users.findAll({
    //   where: {
    //     email: email,
    //     },
    // })
    // if(data.length>0){
    //   return res.status(400).send("Email already exists")
    //   }
      await users.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      res.send("registerd successfully");
    
  }

  exports.handleLogin=async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
     return res.status(400).send("Please fill all the fields")
      }
  
      //check if email exist
    const user = await users.findOne({ 
      where:{
        email:email 
  }
  });
   
    if (!user) {
      res.status(400).send("invalid email");
    } else {
      //checking password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token=jwt.sign({
          id: user.id,
        },"milan",{
          expiresIn: "30h",
        })
        //onsole.log(token)
        res.cookie("token",token)
        res.send("login successfully");
      } else {
        res.status(400).send("invalid email or password");
      }
    }
  }