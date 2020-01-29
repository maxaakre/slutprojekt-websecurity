const express = require('express')
const app = express()
const userRoutes = require('./src/routes/register')
const userAuth = require('./src/routes/auth')


app.use(express.static('public'))
app.use(express.json())


app.use('/api/register', userRoutes)
// app.use('/api/auth', userAuth)


app.listen(8080, () => console.log("Server started"))
