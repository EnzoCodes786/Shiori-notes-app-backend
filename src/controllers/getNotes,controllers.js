const pool = require('../db/db')


async function getNotesControllers(req,res) {
    const user_id = req.user.user_id;
    const notes = await pool.query('SELECT * FROM notes_data WHERE user_id = (?)',[user_id])
    
    res.json(notes[0])
}

module.exports = {getNotesControllers}

