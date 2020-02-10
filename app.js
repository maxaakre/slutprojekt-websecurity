const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const productOrders = require('./routes/orders')


require('dotenv').config()

//Middlewares
app.use(express.static('public'));
app.use(express.json());


//Routes
app.use('/api', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', productOrders)


//server
app.listen(8080, () => console.log("Server started"))
