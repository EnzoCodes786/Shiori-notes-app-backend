const express = require('express')
const router = express.Router()
const getUser = require('../services/decodeToken')

const sendNotesController = require('../controllers/sendNotes.controllers')
router.post('/sendNotes',getUser,sendNotesController.createNote)

module.exports = router