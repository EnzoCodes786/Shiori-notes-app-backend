const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPass(user_password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(user_password, salt);
}

module.exports = encryptPass;