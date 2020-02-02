const { Router } = require("express");
const router = new Router();
const Product = require("../models/Order");


//GETTING ALL ORDERS
router.get("/api/orders", async (req, res) => {
    const products = await Product.all();
    res.status(201).json(products);
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