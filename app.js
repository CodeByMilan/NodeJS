const express = require('express')
const app = express()
const PORT=3000
//to render frontend ejs template engine is used
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})


app.get('/login',(req,res)=>{
    res.render('auth/login')
    })

app.use(express.static('public/css/'))
app.listen(PORT,()=>{
    console.log('Server is running on port ',PORT)
})