const pool = require('../db/db')

async function getUserInfo(req,res) {
    const user_id = req.user.user_id;
    const data = await pool.query(`
        SELECT * FROM user_info 
        WHERE user_id = (?);
        `,[user_id])
    
    res.json({
        message :"User fetched",
        info : data[0][0]
    });
}

module.exports = {getUserInfo}