const { handleRegister, renderRegisterPage, handleLogin, renderLoginPage, renderForgotPasswordPage, handleForgotPassword, renderVerifyOtppage } = require("../controller /authController")

const router =require("express").Router()


router.route('/register').post(handleRegister).get(renderRegisterPage)

router.route('/login').post(handleLogin).get(renderLoginPage)

router.route('/forgotPassword').get(renderForgotPasswordPage).post(handleForgotPassword)

router.route("/verifyOtp").get(renderVerifyOtppage)



module.exports =router