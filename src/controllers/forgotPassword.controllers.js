const otpGenerator = require('otp-generator')
const pool = require('../db/db')
const sendMail = require('../services/mailTrap')

async function forgotPassword(req,res) {
    const{user_email} = req.body;
    const otp = otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});
    const expiresAt = Date.now() + 5 * 60 * 1000;
    const otpSend = await pool.query(`
        INSERT INTO otp_table (otp_number,email,expires_at)
        VALUES(?,?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
        `,[otp,user_email])
    await sendMail(user_email,otp);
    res.json("OTP sent !")
    
}

module.exports = {forgotPassword}
