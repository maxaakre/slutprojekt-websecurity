const express = require('express')
const app = express()
const userRoutes = require('./src/routes/register')
const userAuth = require('./src/routes/auth')
require('dotenv').config()

//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded()) 

//Routes
app.use('/api/register', userRoutes)
app.use('/api/auth', userAuth)

//server
app.listen(8080, () => console.log("Server started"))
