const express = require("express");
const { users } = require("./model/index");
const app = express();
const PORT = 3000;

require("./model/index");
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
  await users.create({
    username,
    email,
    password,
  });
  res.send("registerd successfully");
});

app.use(express.static("public/css/"));
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
