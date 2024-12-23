const nodemailer=require('nodemailer')

 const sendEmail=async( data)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'milanacharya2001@gmail.com',
            pass:'dcsooiucmvlzdcuo'
            }

})
//what to send to the user 
const mailOptions={
    from:'forum website <milanacharya2001@gmail.com',
    to:data.email,  
    subject:data.subject,
    text:data.text
}
await transporter.sendMail(mailOptions)
}
module.exports=sendEmail