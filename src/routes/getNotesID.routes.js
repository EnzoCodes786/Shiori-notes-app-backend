const express = require('express')
const router =  express.Router()
const getUser = require('../services/decodeToken')
const getNotesIdController = require('../controllers/getNotesId.controllers')
router.get(`/getNotes/:id`,getUser,getNotesIdController.notesByID)

module.exports = router