 const express = require('express');
const { loginController, registerController, authController ,getAllDoctorController, applyDoctorController,getAllNotificationController} = require('../controllers/userCtrl');
const authMiddleware = require('../middlerwares/authMiddlewar')

//router Object
 const router = express.Router()

//routes
//Login || POST
router.post('/login',loginController);

//Register || POST
router.post('/register',registerController);

//Auth || POST
router.get('/getUserData',authMiddleware,authController)

//Apply Doctor || POST
router.post('/apply-doctor',authMiddleware,applyDoctorController)


router.get('/getAllDoctor',authMiddleware,getAllDoctorController)

router.get('/get-all-notification',authMiddleware,getAllNotificationController)

module.exports = router