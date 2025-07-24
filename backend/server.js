require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Routes
const homePage = require('./routes/home')
const notesRoute = require('./routes/notesRouter')
const userRoute = require('./routes/user')

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/', homePage)
app.use('/', userRoute)
app.use('/notes', notesRoute)

mongoose.connect(process.env.MONGOURI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log('Connected to DB and Listening on port ', process.env.PORT)
            console.log('http://localhost:4000/')
        })
    })
    .catch((error) =>{
        console.log(error)
    })