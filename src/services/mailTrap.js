const nodemailer = require('nodemailer')

async function sendMail(user_email,generated_otp) {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.USER_
        }

    })
    
    await transporter.verify();
    console.log("SMTP VERIFIED");
    
    await transporter.sendMail({
        from : "aryan.qayum666@gmail.com",
        to : user_email,
        subject : "Otp to reset password:",
        text : generated_otp
    })
    console.log("Email Sent:");
}

module.exports  = sendMail