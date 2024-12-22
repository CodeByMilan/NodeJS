const { questions, users } = require("../model")


exports.renderAskQuestionPage =(req,res)=>{
    res.render("questions/askQuestions")
}


exports.askQuestion=async(req,res)=>{
    const userId=req.userId
    console.log(req.body)
    console.log(req.file)
    const {title,description}=req.body
    const filename =req.file.filename
   
    if(!title||!description){
        return res.status(400).json({message:"Please fill in all fields"})
    }
    await questions.create({
        title,
        description,
        image:filename,
        userId
    })
    res.status(201).json({message:"Question created successfully"})
}

exports.getAllQuestion=async(req,res)=>{
    const data =await questions.findAll({
        include:[{
            model:users,
            attributes:["username"]
            }]
    })

}