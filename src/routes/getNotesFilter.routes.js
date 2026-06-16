const express = require('express')
const router = express.Router()
const getUser = require('../services/decodeToken')
const getNotesFilterController = require('../controllers/getNotesFilter.controllers')

router.get('/getNotesFilter',getUser,getNotesFilterController.getNotesFilter)

module.exports = router