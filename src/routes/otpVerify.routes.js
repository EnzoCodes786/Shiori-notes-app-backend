const express = require('express')
const router = express.Router()
const otpVerifyController = require('../controllers/otpVerify.controllers')

router.post('/verifyOtp',otpVerifyController.verifyOtp)

module.exports = router