const DataStore = require('nedb-promise')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        return await db.findOne({
            email:body.emal,
            password:body.password
        })
        
               


    
   
    }    }
        
    
    

    
