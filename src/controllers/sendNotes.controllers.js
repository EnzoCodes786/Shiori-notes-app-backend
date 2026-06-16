const pool = require('../db/db')
const createNote = async function  (req,res) {
   
     const{title,content} = req.body
     const user_id = req.user.user_id
     const result = await pool.query(`
           INSERT INTO notes_data (title,content,user_id)
           VALUES(?,?,?)
        `,[title,content,user_id])

     res.json('Note created successfully...');
 
}


module.exports = {createNote}