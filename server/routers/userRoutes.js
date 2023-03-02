const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getAllDoctorController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlerwares/authMiddlewar");

//router Object
const router = express.Router();

//routes
//Login || POST
router.post("/login", loginController);

//Register || POST
router.post("/register", registerController);

//Auth || POST
router.get("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// get all doctor || get
router.get("/getAllDoctor", authMiddleware, getAllDoctorController);

// notification Docotr || get
router.get(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// delete all notifications || delete
router.delete(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// book appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// booking avliability
router.post(
  "/booking-avalibility",
  authMiddleware,
  bookingAvailabilityController
);

router.get('/user-appointment', authMiddleware, userAppointmentController);

module.exports = router;
