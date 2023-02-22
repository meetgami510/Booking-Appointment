const userModel = require('../models/userModels')
const doctorModel = require('../models/doctorModels')
const appointmentModel = require('../models/appointmentModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

//register callback
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        if (exisitingUser) {
            return res.status(200).send({
                message: 'User Already Exist',
                success: false
            })
        }
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({
            message: 'Register Successfully', success: true
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`
        })
    }
}

const loginController = async (req, res) => {
    try {
        console.log(req.body);
        const user = await userModel.findOne({ email: req.body.email })
        console.log(user);
        if (!user) {
            return res.status(200).send({ message: 'user not found', success: false })

        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(200).send({ message: 'Login Success', success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error is Login CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        //console.log('from auth controller')
        //console.log(req.body)
        const user = await userModel.findById({ _id: req.body.userId });
        console.log(user);
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false
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
            message: 'auth error',
            success: false,
            error,
        })
    }
}

const getAllDoctorController = async (req, res) => {
    try {
        console.log("hiehre")
        console.log(req.name);
        const doctorList = await doctorModel.find({ name: req.name });
        res.status(200).send({
            success: true,
            message: 'doctor list fetched successfully',
            doctorList
        })

    } catch (error) {           
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notification'
        })
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const user = req.body;
        const checkDoctor = await doctorModel.findOne({ $or: [{ userId: req.body.userId }, { email: user.email }, { phone: user.phone }] });
        if(checkDoctor) {
            var message = '';
            if(checkDoctor.userId === req.body.userId) {
                if(checkDoctor.status === 'approved') {
                    message = 'your request is already accepted';
                }else{
                    message = 'you are already applied'
                }
            }
            else{
                 message = 'emailid and contact number is already exists please give unique one'
            }
            return res.status(200).send({
                success: false,
                message: message
            })
        } else {
            const checkUser = await userModel.findOne({_id:req.body.userId, isDoctor:true});
            if(checkUser) {
                return res.status(200).send({
                    message:`user's application is already accepted`,
                    success: false
                });
            }else{
                const newDoctor = new doctorModel(user);
                const obj = await newDoctor.save();
                console.log(obj);
                const adminUser = await userModel.findOne({isAdmin: true});
                console.log(adminUser);
                const notifications = adminUser.notifications;
                notifications.push({
                    type:'apply-doctor-request',
                    message:`${newDoctor.firstName} ${newDoctor.lastName}}`,
                    data: {
                        doctorId: newDoctor._id,
                        name: newDoctor.firstName + " " + newDoctor.lastName,
                        onClickPath: '/admin/doctors'
                    }
                });
                await userModel.findByIdAndUpdate(adminUser._id,{notifications})
                res.status(201).send({
                    success:true,
                    message:'Doctor acount applied successfully'
                });
            }
        }
        //console.log(user);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            error,
            message: 'error while applying for doctor'
        })
    }
}
module.exports = { loginController, registerController, authController, getAllDoctorController, applyDoctorController };