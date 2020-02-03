
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports =  {

   async auth(req,res,next){
     const secret = process.env.SECRET   
     const token = req.headers.authorization
     if(!token){
        return false
     }try{
         const verify  = await jwt.verify(token.replace("Bearer ", "" ),secret)
         req.user = verify
     }catch(err){
         console.log(err)
     }
     next()
    }

}


