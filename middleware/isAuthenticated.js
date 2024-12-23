const jwt = require('jsonwebtoken');
//promisify is a built in function in node.js which is used for converting callback based functions to promise based functions
const {promisify}=require('util');
const { users } = require('../model');
exports.isAuthenticated = async (req, res,next ) => {
    //by default nodejs cannot read or parse token from cookie so we have to used third party package like cookie-parser
    const token = req.cookies.token
    console.log(token)
    if (!token || token == null || token ==undefined) {
        return res.redirect('/login')
    }
  const decryptedResult= await promisify( jwt.verify)(token,'milan')
  console.log(decryptedResult)
  const data =await users.findByPk(decryptedResult.id)
  if (!data) {
    return res.redirect('no user belong to that id ')
    }
    req.userId=decryptedResult.id
  next()
} 