const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModels");
const appointmentModel = require("../models/appointmentModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res.status(200).send({
        message: "User Already Exist",
        success: false,
      });
    }
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error is Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    //console.log('from auth controller')
    //console.log(req.body)
    const user = await userModel.findById({ _id: req.body.userId });
    console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const getAllDoctorController = async (req, res) => {
  try {
    // console.log("hiehre")
    // console.log(req.body.name);
    const doctorList = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "doctor list fetched successfully",
      doctorList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while fetching notification",
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const checkDoctor = await doctorModel.findOne({
      $or: [
        { userId: req.body.userId },
        { email: user.email },
        { phone: user.phone },
      ],
    });
    if (checkDoctor) {
      var message = "";
      if (checkDoctor.userId === req.body.userId) {
        if (checkDoctor.status === "approved") {
          message = "your request is already accepted";
        } else {
          message = "you are already applied";
        }
      } else {
        message =
          "emailid and contact number is already exists please give unique one";
      }
      return res.status(200).send({
        success: false,
        message: message,
      });
    } else {
      const checkUser = await userModel.findOne({
        _id: req.body.userId,
        isDoctor: true,
      });
      if (checkUser) {
        return res.status(200).send({
          message: `user's application is already accepted`,
          success: false,
        });
      } else {
        const newDoctor = new doctorModel(user);
        const obj = await newDoctor.save();
        console.log(obj);
        const adminUser = await userModel.findOne({ isAdmin: true });
        console.log(adminUser);
        const notifications = adminUser.notifications;
        notifications.push({
          type: "apply-doctor-request",
          message: `${newDoctor.firstName} ${newDoctor.lastName}}`,
          data: {
            doctorId: newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath: "/admin/doctors",
          },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notifications });
        res.status(201).send({
          success: true,
          message: "Doctor acount applied successfully",
        });
      }
    }
    //console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      error,
      message: "error while applying for doctor",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    const seennotifications = user.seennotifications;
    const notifications = user.notifications;
    seennotifications.push(...notifications);
    user.seennotifications = notifications;
    user.notifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    return res.status(200).send({
      success: true,
      message: "All notification marked as Read",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error getting the Notification",
    });
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.seennotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "all Notification marked as read",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error with delete the  notifications",
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    console.log(req.body);
    console.log("this is bookappointment");
    //   res.status(200).send({
    //     success: true,
    //     message: `Appointment booked succesfully`
    // })
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = 'pending';
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notifications.push({
      type: 'New-Appointment-request',
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: '/user/appointments'
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: `Appointment booked succesfully`
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'error while booking appointment'
    })
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime
      }
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: 'appointment on this time is already booked',
        success: true
      });
    } else {
      return res.status(200).send({
        message: 'appointment on this time is available',
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'error while booking appointment'
    })
  }
}
module.exports = {
  loginController,
  registerController,
  authController,
  getAllDoctorController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  bookAppointmentController,
  bookingAvailabilityController
};
