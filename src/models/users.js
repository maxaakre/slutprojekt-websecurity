const DataStore = require('nedb-promise')


const db = new DataStore({
    filename: './db/mydata.db',
    autoload:true
});



module.exports= {
    async create(body){
        return await db.insert({
            email: body.email,
            password: body.password,
            repeatPassword: body.repeatPassword,
            name:body.name,
            adress: {
                street:body.adress.street,
                zip: body.adress.zip,
                city: body.adress.city
            }
        })
    },

    async auth(body){
        return await db.findOne({
        email:body.email,
        password:body.password
        })
    }


    
   
}

