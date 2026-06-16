const pool = require('../db/db')

async function verifyOtp(req,res) {
    const {email,otp_user} = req.body;
    const [db_otp] = await pool.query(
        `
        SELECT otp_number FROM otp_table 
        WHERE email = (?) 
        AND expires_at > NOW()
        `
    ,[email])
    const required_otp = db_otp[0].otp_number
    if(db_otp.length === 0){
    return res.status(400).json("OTP expired or not found");
    }
    if(String(otp_user) == String(required_otp)){
        res.json("Otp verified!")
    }
    else{
        res.json("Invalid Otp!")
    }
    console.log(required_otp)
    
}

module.exports = {verifyOtp}