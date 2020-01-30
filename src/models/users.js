const DataStore = require('nedb-promise')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const token =  jwt.sign(token,secret )


const db = new DataStore({
    filename: './db/mydata.db',
    autoload:true
});



module.exports= {
    async create(body) {
     if(body.password == body.repeatPassword){
        const  user = await db.findOne({email:body.email})
        if(user){
          return false 
        }else{
            const passwordHash = await bcrypt.hash(body.password, 10)
            return await db.insert({
                email: body.email,
                password: passwordHash,
                role: "customer",
                name:body.name,
                adress: {
                    street:body.adress.street,
                    zip: body.adress.zip,
                    city: body.adress.city
                }
            })
            
            
        }
    }else{
    return false
    }
    },
           
        async auth(body){
        const user = await db.findOne({email:body.email,})
           if(!user){
            return false   
           }else{
               const passwordHash = await bcrypt.compare(body.password == user.password,(err,result)=>{
                   if (err){
                       return false
                   }
                   if(result) {
                       const token = jwt.sign({
                           email: body.email,
                           passsword:body.password
                       }, process.env.SECRET,{
                           expiresIn: "1h"
                       }
                    )
                    return token
                   }
               })
           }
           
           
            
        }
        
    }    
        
    
    

    
  
