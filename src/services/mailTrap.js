const {Resend} = require('resend')

async function sendMail(user_email,generated_otp) {
  const resend = new Resend('re_3e4ma7wm_CuUrHwB2Gkm7w6q5bhpWFh8L')
  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: user_email,
  subject: 'OTP :',
  html: generated_otp  
});

console.log("Email Sent:");
}

module.exports  = sendMail