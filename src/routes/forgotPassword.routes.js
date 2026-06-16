const express = require('express')
const router = express.Router()
const forgotPasswordController = require('../controllers/forgotPassword.controllers')
router.post('/forgotPassword',forgotPasswordController.forgotPassword)

module.exports = router
