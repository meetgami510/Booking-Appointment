const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo DB connected ${mongoose.connection.host}`.bgGreen.white )
    }catch(error) {
        console.log(`Mongo Server Issus ${error}`.bgRed.white);
    }
}

module.exports = connectDB;