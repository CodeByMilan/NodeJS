const { renderAskQuestionPage, askQuestion, renderSingleQuestionPage } = require("../controller /questionController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {multer,storage}=require('../middleware/multerConfig')
const upload = multer({ storage: storage });
const router =require("express").Router()


router.route("/askQuestion").get(isAuthenticated,renderAskQuestionPage).post(isAuthenticated,upload.single('image'), askQuestion)

router.route("/question/:id").get(renderSingleQuestionPage)


module.exports=router 