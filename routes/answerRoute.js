const { handleAnswer } = require("../controller /answerController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router =require("express").Router()

router.route("/:id").post(isAuthenticated,handleAnswer)

module.exports=router