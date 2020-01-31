const { Router } = require("express");
const router = new Router();
const Product = require("../models/Product");

router.get("/api/products", async (req, res) => {
  const products = await Product.all();
  res.json(products);
});

router.get("api/products/:id", async (req,res) =>{
  const products = await Product.get(req.params.id)
  if(products){
    res.json(products)
  }else{
    res.status(404).json({message:"Product not found!"})
  }
})

router.post("/api/products", async(req,res) =>{
  const products = await Product.create(req.body)
  if(products){
    res.status(201).json(products)
  }else{
    res.status(404).json({message:"Product already in store!"})
  }
})

router.delete("/api/products/:id",async (req,res)=>{
  const products = await Product.remove(req.params.id)
  if(products){
    res.json({message:"Product deleted!"})
  }else{
    res.json({message:"Could not delete item!"})
  }
})

router.patch("/api/products/:id", async(req,res)=>{
const product = await Product.update(req.params.id,req.body)
if(product){
res.json({message: "Updated product!"})
}else{
  res.json({message:"Product not found!"})
}
})



module.exports = router;