const Datastore = require('nedb-promise')
const orders = require('../models/User')
const products = new Datastore({
    filename:'./db/orders.db',
    autoload:true
})


module.exports = {
    //GET ALL ORDERS
    async all(){
        return await products.find({});
    },
    //CREATE NEW ORDER
    async create(body){
        const newOrder = {
            _id: body.id,
            owner: orders,
            timeStamp: Date.now(), 
            status: 'inProcess', 
            items: body.items,
            orderValue: body.orderValue,
            payment:{
            cardOwner: body.payment.cardOwner,
            cardNumber: body.payment.cardNumber,
            validUntil: body.payment.validUntil,
            cvv: body.payment.cvv,
            },
            orderHistory: [],
        }
        return await products.insert( newOrder)
    },
   
    

}