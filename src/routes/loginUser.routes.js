const express = require('express')
const router = express.Router()
const loginUserController = require('../controllers/loginUser.controllers')

router.post('/login',loginUserController.checkPassword)

module.exports = router