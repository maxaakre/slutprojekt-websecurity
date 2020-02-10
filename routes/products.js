const { Router } = require("express");
const router = new Router();
const Product = require("../models/Product");
const auth = require('./verifytoken')


//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.all();
  res.status(201).json(products);
});
//GET ONE PRODUCT
router.get("/:id", async (req,res) =>{
  const products = await Product.get(req.params.id)
  if(products){
    res.status(201).json(products)
  }else{
    res.status(401).json({message:"Product not found!"})
  }
})
//CREATE NEW PRODUCT
router.post("/", auth.auth, async(req,res) =>{
    if(req.user.role === "admin"){
    const products = await Product.create(req.body)
    res.status(201).json(products)
  }else{
    res.status(401).json({message:"Not aloud to put in products!"})
  }
})
//DELETE PRODUCT
router.delete("/:id",auth.auth,async (req,res)=>{
  if(req.user.role === "admin"){
  const products = await Product.remove(req.params.id)
  res.status(201).json(products)
  }else{
    res.status(401).json({message:"Could not delete item!"})
  }
})
//UPDATE PRODUCT
router.patch("/:id",auth.auth, async(req,res)=>{
if(req.user.role === "admin"){ 
const product = await Product.update(req.params.id,req.body)
res.status(201).json(product)
}else{
  res.status(401).json({message:"Product not found!"})
}
})



module.exports = router;