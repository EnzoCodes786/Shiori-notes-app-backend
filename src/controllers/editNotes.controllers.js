const pool = require('../db/db')

async function editNotes(req,res) {
    const user_id = req.user.user_id;
    const {id} = req.params;
    const {new_title,new_content} = req.body;
    if(!new_title){
        await pool.query(`
            UPDATE notes_data
            SET content = (?)
            WHERE id = (?)
            AND user_id =(?);
            `,[new_content,id,user_id])
        res.json({
            message:"content updated",
            updated_note_id:id,
            updated_user_id:user_id
        })
    }
    else if(!new_content){
        await pool.query(`
            UPDATE notes_data
            SET title = (?)
            WHERE id = (?)
            AND user_id=(?);
            `,[new_title,id,user_id])
        res.json({
            message:"title updated",
            updated_note_id:id,
            updated_user_id:user_id
        })
    }
    else {
        await pool.query(`
            UPDATE notes_data
            SET title = (?), content =(?)
            WHERE id = (?)
            AND user_id = (?);
            `,[new_title,new_content,id,user_id])
        res.json({
            message:"title and content updated",
            updated_note_id:id,
            updated_user_id:user_id
        })
    }

}

module.exports = {editNotes}