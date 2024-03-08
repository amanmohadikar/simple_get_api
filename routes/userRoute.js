const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
router.post('/createUser', userController.createUser)
router.get('/getUsers', userController.getAllUsers)

module.exports = router;