const express = require('express')
const router = express.Router()
const getUser = require('../services/decodeToken')

const getNotesControllers = require('../controllers/getNotes,controllers')

router.get('/getNotes',getUser,getNotesControllers.getNotesControllers)

module.exports = router