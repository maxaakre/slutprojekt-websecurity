const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')

require('dotenv').config()

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded()); 


//Routes
app.use('/', userRoutes)
app.use('/', productRoutes)

//server
app.listen(8080, () => console.log("Server started"))
