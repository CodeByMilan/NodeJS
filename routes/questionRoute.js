const { renderAskQuestionPage, askQuestion } = require("../controller /questionController")
const {multer,storage}=require('../middleware/multerConfig')
const upload = multer({ storage: storage });
const router =require("express").Router()


router.route("/askQuestion").get(renderAskQuestionPage).post(upload.single('image'), askQuestion)


module.exports=router