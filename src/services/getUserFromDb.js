
const pool = require('../db/db');
async function getUser(email) {
    const [rows] = await pool.query(
        'SELECT * FROM user_info WHERE email = ?',
        [email]
    );

    return rows[0] || null;
}

module.exports = getUser;