const pool = require('../db/db')

async function deleteNotes(req,res) {
    const user_id = req.user.user_id;
    const{id} = req.params;
    const data = await pool.query(`
        DELETE FROM notes_data 
        WHERE id = (?)
        AND user_id=();
        `,[id,user_id]);
    res.json({
        message:"Noted deleted succesfully",
        note_id:id
    });   
}

module.exports = {deleteNotes};