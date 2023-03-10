const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is require"],
    },
    email: {
        type : String,
        required: [true,"email is require"],
    },
    password: {
        type : String,
        required: [true,"password is require"],
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    isDoctor: {
        type: Boolean,
        default:false,
    },
    notifications: {
        type: Array,
        default: [],
    },
    seennotifications: {
        type: Array,
        default: [],
    }
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;