const express = require('express');
const authMiddlewar = require('../middlerwares/authMiddlewar')
const { getAllDoctorsController, getAllUsersController ,changeAccountStatusController} = require('../controllers/adminController')


const router = express.Router();

router.get('/get-all-users',authMiddlewar,getAllUsersController);

router.get('/get-all-doctors',authMiddlewar,getAllDoctorsController);

router.post('/change-account-status', authMiddlewar, changeAccountStatusController);

module.exports = router;