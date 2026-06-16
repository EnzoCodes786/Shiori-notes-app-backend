const { Resend } = require('resend')

async function sendMail(user_email, generated_otp) {
  try {
    const resend = new Resend('re_3e4ma7wm_CuUrHwB2Gkm7w6q5bhpWFh8L')

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: user_email,
      subject: 'OTP',
      html: `<h1>${generated_otp}</h1>`
    })

    console.log("RESEND RESPONSE:", data)

  } catch (err) {
    console.error("RESEND ERROR:", err)
  }
}

module.exports = sendMail