const express = require('express');
const authMiddlewar = require('../middlerwares/authMiddlewar');

const { getDoctorInfoController ,updateProfileController} = require('../controllers/doctorController');
const router = express.Router();

router.get('/getDoctorInfo', authMiddlewar, getDoctorInfoController);

router.post('/updateProfile',authMiddlewar,updateProfileController)

module.exports = router;