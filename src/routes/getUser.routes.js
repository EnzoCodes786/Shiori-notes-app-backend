const express = require('express')
const router = express.Router();
const getUser = require('../services/decodeToken')
const getUserController = require('../controllers/getUser.controllers')

router.get('/getUserInfo',getUser,getUserController.getUserInfo)

module.exports =  router