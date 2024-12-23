const { users, questions } = require("../model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.renderHomePage = async (req, res) => {
  const data = await questions.findAll({
    include: [
      {
        model: users,
        attributes: ["username"],
      },
    ],
  });
  console.log(data);
  res.render("home.ejs", { data });
};

exports.renderRegisterPage = (req, res) => {
  res.render("auth/register");
};

exports.renderLoginPage = (req, res) => {
  res.render("auth/login");
};

exports.handleRegister = async (req, res) => {
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
  res.redirect("/login");
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  //check if email exist
  const user = await users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).send("invalid email");
  } else {
    //checking password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        "milan",
        {
          expiresIn: "30h",
        }
      );
      //onsole.log(token)
      res.cookie("token", token);
      res.redirect("/");
    } else {
      res.status(400).send("invalid email or password");
    }
  }
};

exports.renderForgotPasswordPage = async (req, res) => {
  res.render("auth/forgotPassword");
};

exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  const data = await users.findAll({
    where: {
      email: email,
      },
      });
      if (data.length === 0)  return res.status(400).send("Email not found");
        
  const otp = Math.floor(Math.random() * 1000)+9999;
  //send that otp to the above email
  sendEmail({
    email: email,
    subject: "OTP for forgot password",
    text: `your otp is ${otp}`,
  });
  data[0].otp=otp
  await data[0].save()
  res.redirect('/verifyOtp')
};


exports.renderVerifyOtppage = (req,res)=>{
  res.render('auth/verifyOtp')
}