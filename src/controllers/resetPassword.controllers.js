const encryptPass = require('../services/passwordEncryption')
const pool = require('../db/db')
async function resetPassword(req,res) {
    const{email,new_password} = req.body
    const hash = await encryptPass(new_password)
    await pool.query(`
        UPDATE user_info 
        SET user_password = (?)
        WHERE email = (?)
        `,[hash,email])

    res.json("password reset done!")
}

module.exports = {resetPassword}