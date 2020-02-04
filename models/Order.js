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
    //GETTING ORDER FOR EVERY USER
    async get(userID){
        return await Order.find({owner:userID})
        
    },
    //CREATE NEW ORDER
    async create(body,userID){

        // let arr = await Order.find({_id: {$in:body.items}})
        const newOrder = {
            owner: userID,
            timeStamp: Date.now(), 
            status: 'inProcess', 
            items: body.items,
            orderValue: body.orderValue
        }
        console.log(newOrder)
        //ADDING USERS PAYMENT IN ORDERS, ADDING ORDER TO USER 
      const newDocument = await Order.insert(newOrder)
       await User.addUserPayment(userID, body.payment)
       await User.addOrdertoUser(userID,newDocument._id)
        return newDocument
        }
   
    

};