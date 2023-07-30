const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')


router.route('/').get(usersController.getAllUsers)
router.route('/register').post(usersController.createUser)
router.route('/login').post(usersController.getUser)



router.route('/profile/:id').get(usersController.protect, usersController.profile)


module.exports = router