const express = require('express')
const router = express.Router()
const deleteNotesController = require('../controllers/deleteNotes.controllers')
const getUser = require('../services/decodeToken')
router.delete('/deleteNotes/:id',getUser,deleteNotesController.deleteNotes)

module.exports = router
