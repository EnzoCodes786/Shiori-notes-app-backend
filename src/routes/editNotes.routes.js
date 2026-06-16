const express = require('express')
const router = express.Router()
const editNotesController = require('../controllers/editNotes.controllers')
const getUser = require('../services/decodeToken')

router.post('/editNotes/:id',getUser,editNotesController.editNotes)

module.exports = router