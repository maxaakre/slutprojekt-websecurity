const { Router } = require("express");
const router = new Router();
const Product = require("../models/Order");


router.get("/api/orders", async (req, res) => {
    const products = await Product.all();
    res.json(products);
  });


router.post("/api/orders", async(req,res) =>{
    const products = await Product.create(req.body)
    if(products){
      res.json(products)
    }else{
      res.status(404).json({message:"Couldent load orders"})
    }
})  

module.exports = router