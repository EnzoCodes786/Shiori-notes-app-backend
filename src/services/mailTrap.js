const { Resend } = require('resend')

async function sendMail(user_email, generated_otp) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

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