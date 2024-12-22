const express = require("express");
const { users } = require("./model/index");
const app = express();
const PORT = 3000;

require("./model/index");
const bcrypt = require("bcrypt");
//to render frontend ejs template engine is used
app.set("view engine", "ejs");
// by default nodejs doesnot understand incomming data so to understand the data coming from the frontendlike ejs template
app.use(express.urlencoded({ extended: true })); //ssr
//if data is coming from other like react , angular etc then use json
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.post("/register", async (req, res) => {
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
  
});

app.post("/login", async (req, res) => {
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
      res.send("login successfully");
    } else {
      res.status(400).send("invalid email or password");
    }
  }
});

app.use(express.static("public/css/"));
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
