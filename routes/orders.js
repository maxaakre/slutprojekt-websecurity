const { Router } = require("express");
const router = new Router();
const Product = require("../models/Order");
const auth = require('./verifytoken')


//GETTING ALL ORDERS
router.get("/api/orders",auth.auth, async (req, res) => {
  if(req.user.role === "admin"){
    const products = await Product.all();
    console.log(req.headers.authorization)
    res.status(201).json(products);
  }else{
    if(req.user.role ==="customer"){
      const products = await Product.all()
      console.log(req.headers.authorization)
      res.status(201).json(products)
    }
  }
  });

//POST ALL ORDERS
router.post("/api/orders", async(req,res) =>{
    const products = await Product.create(req.body)
    if(products){
      res.status(201).json(products)
    }else{
      res.status(404).json({message:"Couldent load orders"})
    }
})  

module.exports = router