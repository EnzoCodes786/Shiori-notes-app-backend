const bcrypt = require("bcrypt");
const getUser = require("../services/getUserFromDb");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
async function checkPassword(req, res) {
  const { entered_email, entered_password } = req.body;
  const user = await getUser(entered_email);
  if (!user) {
    res.status(404).json("User note found");
  } else {
    const isMatch = await bcrypt.compare(entered_password, user.user_password);
    if (!isMatch) {
      res.json("Wrong Password");
    } else {
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
        },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json("User succesfully logged in!");
    }
  }
}

module.exports = { checkPassword };
