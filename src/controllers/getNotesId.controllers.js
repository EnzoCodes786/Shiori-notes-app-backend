const pool = require('../db/db')

async function notesByID(req,res) {
    const user_id = req.user.user_id;
    const id = req.params.id
    const data = await pool.query(`
        SELECT * FROM notes_data WHERE id = (?)
        AND user_id = (?)
        `,[id,user_id])
    res.json(data[0])
} 

module.exports = {notesByID}