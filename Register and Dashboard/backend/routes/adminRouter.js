const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const usersController = require('../controllers/userController')

router.route('/').post(usersController.protect, adminController.getAllUsersByRole)
router.route('/adduser').post(adminController.createUser)
router.route('/deleteUser/:id').delete(adminController.deleteUser)
router.route('/editUser').patch(adminController.updateUser)
// router.route('/register').post(usersController.createUser)
// router.route('/login').post(usersController.getUser)



// router.route('/profile/:id').get(usersController.protect, usersController.profile)


module.exports = router