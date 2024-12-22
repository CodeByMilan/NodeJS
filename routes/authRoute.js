const { handleRegister, renderRegisterPage, handleLogin, renderLoginPage } = require("../controller /authController")

const router =require("express").Router()


router.route('/register').post(handleRegister).get(renderRegisterPage)

router.route('/login').post(handleLogin).get(renderLoginPage)



module.exports =router