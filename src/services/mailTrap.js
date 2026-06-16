const nodemailer = require('nodemailer')

async function sendMail(user_email,generated_otp) {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "aryan.qayum666@gmail.com",
            pass : "heay xcku pilk klrv"
        }

    })

    await transporter.sendMail({
        from : "aryan.qayum666@gmail.com",
        to : user_email,
        subject : "Otp to reset password:",
        text : generated_otp
    })
    console.log("Email Sent:");
}

module.exports  = sendMail