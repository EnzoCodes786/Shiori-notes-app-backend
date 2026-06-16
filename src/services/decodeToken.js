const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser')
function getUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json("Login required");
    }

    const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY
    );

    req.user = decoded;
    
    next();
}

module.exports = getUser;