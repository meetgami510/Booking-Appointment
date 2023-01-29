 const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlerwares/authMiddlewar')

//router Object
 const router = express.Router()

//routes
//Login || POST
router.post('/login',loginController);

//Register || POST
router.post('/register',registerController);

//Auth || POST
router.post('/getUserData',authMiddleware,authController)

module.exports = router