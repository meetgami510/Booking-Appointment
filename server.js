const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./server/config/db')


//Need to put dotenv config function
dotenv.config()

connectDB();

//rest Object
const app = express()

//middlewares
//its handles the error related when we pass the object in form of json
app.use(express.json())
app.use(moragan('dev'))

//routes
app.use('/api/v1/user',require('./server/routers/userRoutes'))
app.use('/api/admin',require('./server/routers/adminRoutes'))
app.use('/api/doctor',require('./server/routers/doctorRoutes'))

//decleareing port
const port = process.env.PORT || 8080

//we need to require listen
app.listen(port,() => {
    console.log(
        `Server is running in ${process.env.NODE_MODE} on port ${process.env.PORT}`.bgCyan.white
    )
})

