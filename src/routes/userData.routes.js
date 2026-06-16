const express = require('express')
const router = express.Router();
const userDataController = require('../controllers/userData.controllers')

router.post('/register',userDataController.userRegister);

module.exports = router