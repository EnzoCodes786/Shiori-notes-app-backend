const express = require('express')
const router = express.Router()
const summarizeNotesController = require('../controllers/summarizeNotes.controllers')
const getUser = require('../services/decodeToken')
router.get('/summarizeNotes/:id',getUser,summarizeNotesController.summarizeNotes)

module.exports = router