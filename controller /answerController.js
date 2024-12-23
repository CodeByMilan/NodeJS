const { answers } = require("../model")

exports.handleAnswer=async(req,res)=>{
    const userId=req.userId
    const{answer}=req.body
    const questionId=req.params.id
    answers.create({
        answerText:answer,
        questionId,
        userId
    })
    res.redirect(`/question/${questionId}`)
}