const pool = require('../db/db')
const passwordEncryption = require('../services/passwordEncryption')
async function userRegister(req,res) {
    const{email,user_password}=req.body;
    const encrypted_password = await passwordEncryption(user_password)
    const register = await pool.query(`
        INSERT INTO user_info (email,user_password)
        VALUES(?,?)
        `,[email,encrypted_password])

    res.json("User Registered")
    
}

module.exports = {userRegister}