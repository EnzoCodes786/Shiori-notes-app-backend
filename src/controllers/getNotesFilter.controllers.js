const pool = require('../db/db')

async function getNotesFilter(req,res) {
    const user_id = req.user.user_id;
    const {title} = req.query
    console.log("Search Title:", title)
    console.log("User ID:", user_id)
    const [data] = await pool.query(`
        SELECT * FROM notes_data WHERE title = (?)
        AND user_id = (?)
        `,[title,user_id])
    
        res.json(data[0])
    
}

module.exports = {getNotesFilter}