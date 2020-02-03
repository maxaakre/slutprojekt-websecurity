const { Router } = require("express");
const router = new Router();
const Order = require("../models/Order");
const User = require("../routes/users")
const auth = require('./verifytoken')


//GETTING ALL ORDERS
router.get("/api/orders",auth.auth, async (req, res) => {
  if(req.user.role === "admin"){
    const order = await Order.all();
    console.log(req.headers.authorization)
    res.status(201).json(order);
  }else{
    if(req.user.role === "customer"){
      const order = await Order.get(req.user.userID)
      console.log(req.headers.authorization)
      res.status(201).json(order)
    }else {
      res.status(404).json({message:"Could not load orders!"})
    }
  }
  });

//POST ALL ORDERS
router.post("/api/orders",auth.auth, async(req,res) =>{
    const order = await Order.create(req.body,req.user.userID)
    if(order){
      res.status(201).json(order)
    }else{
      res.status(401).json({message:"Couldent load orders"})
    }
})  

module.exports = router