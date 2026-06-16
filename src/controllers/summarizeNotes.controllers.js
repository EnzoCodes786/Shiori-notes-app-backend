const geminiSummarize = require('../services/gemini')
const pool = require('../db/db')

async function summarizeNotes(req,res) {
    const user_id = req.user.user_id;
    const {id} = req.params;
    const [data] = await pool.query(`
        SELECT content FROM notes_data 
        WHERE user_id = (?)
        AND id = (?) 
        `,[user_id,id])
    const summary = await geminiSummarize(data[0].content)
    res.json(summary);
}

module.exports = {summarizeNotes}