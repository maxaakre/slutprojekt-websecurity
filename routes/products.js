const { Router } = require("express");
const router = new Router();
const Product = require("../models/Product");

//GET ALL PRODUCTS
router.get("/api/products", async (req, res) => {
  const products = await Product.all();
  res.status(201).json(products);
});
//GET ONE PRODUCT
router.get("api/products/:id", async (req,res) =>{
  const products = await Product.get(req.params.id)
  if(products){
    res.status(201).json(products)
  }else{
    res.status(404).json({message:"Product not found!"})
  }
})
//CREATE NEW PRODUCT
router.post("/api/products", async(req,res) =>{
  const products = await Product.create(req.body)
  if(products){
    res.status(201).json(products)
  }else{
    res.status(404).json({message:"Product already in store!"})
  }
})
//DELETE PRODUCT
router.delete("/api/products/:id",async (req,res)=>{
  const products = await Product.remove(req.params.id)
  if(products){
    res.status(201).json({message:"Product deleted!"})
  }else{
    res.status(401).json({message:"Could not delete item!"})
  }
})
//UPDATE PRODUCT
router.patch("/api/products/:id", async(req,res)=>{
const product = await Product.update(req.params.id,req.body)
if(product){
res.status(201).json({message: "Updated product!"})
}else{
  res.status(401).json({message:"Product not found!"})
}
})



module.exports = router;