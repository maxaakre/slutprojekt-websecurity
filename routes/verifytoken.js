
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports =  {

   async auth(req,res,next){
     const secret = process.env.SECRET   
     const token = req.headers.authorization
     if(!token){
        res.status(403).send({message: "no token supplied"})
     }try{
         const verify  = await jwt.verify(token.replace("Bearer ", "" ),secret)
         req.user = verify
     }catch(err){
         console.log(err)
     }
     next()
    }

}


