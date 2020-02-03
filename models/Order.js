const Datastore = require('nedb-promise')
const User = require('../models/User')
const Order = new Datastore({
    filename:'./db/orders.db',
    autoload:true
})


module.exports = {
    //GET ALL ORDERS
    async all(){
        return await Order.find({});
    },
    async get(userID){
        return await Order.find({owner:userID})
        
    },
    //CREATE NEW ORDER
    async create(body,userID){
        console.log(body)
        const newOrder = {
            owner: userID,
            timeStamp: Date.now(), 
            status: 'inProcess', 
            items: body.items,
            orderValue: body.payment.total,
        }
        console.log(newOrder)
      const newDocument = await Order.insert(newOrder)
       await User.addUserPayment(userID, body.payment)
       await User.addOrdertoUser(userID,newDocument._id)
        return newDocument
        },
   
    

}