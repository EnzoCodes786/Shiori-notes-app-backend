const {Resend} = require('resend')

async function sendMail(user_email,generated_otp) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: user_email,
  subject: 'OTP :',
  html: generated_otp  
});

console.log("Email Sent:");
}

module.exports  = sendMail