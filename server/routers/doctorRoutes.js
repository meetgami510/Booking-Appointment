const express = require('express');
const authMiddlewar = require('../middlerwares/authMiddlewar');

const { getDoctorInfoController ,updateProfileController,getDoctorByIdController} = require('../controllers/doctorController');
const router = express.Router();

router.get('/getDoctorInfo', authMiddlewar, getDoctorInfoController);

router.post('/updateProfile',authMiddlewar,updateProfileController);

router.post('/getDoctorById', authMiddlewar, getDoctorByIdController);

module.exports = router;