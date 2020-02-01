const Datastore = require('nedb-promise')
const orders = require('../models/User')
const products = new Datastore({
    filename:'./db/orders.db',
    autoload:true
})


module.exports = {
    async all(){
        return await products.find({});
    },
    async create(body){
        const newOrder = {
            _id: body.id,
            owner: orders,
            timeStamp: Date.now(), 
            status: 'inProcess', 
            items: body.items,
            orderValue: body.orderValue,
            cardOwner: body.cardOwner,
            cardNumber: body.cardNumber,
            validUntil: body.validUntil,
            cvv: body.cvv,
            orderHistory: []
        }
        return await products.insert( newOrder)
    },
   
    

}