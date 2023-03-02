const express = require('express');
const authMiddlewar = require('../middlerwares/authMiddlewar');

const { getDoctorInfoController ,updateProfileController,getDoctorByIdController,getDoctorAppointmentsController,updateAppointmentStatusController} = require('../controllers/doctorController');
const router = express.Router();

router.get('/getDoctorInfo', authMiddlewar, getDoctorInfoController);

router.post('/updateProfile',authMiddlewar,updateProfileController);

router.post('/getDoctorById', authMiddlewar, getDoctorByIdController);

router.get('/doctor-appointments', authMiddlewar, getDoctorAppointmentsController);
router.post('/update-appointment-status', authMiddlewar, updateAppointmentStatusController);

module.exports = router;