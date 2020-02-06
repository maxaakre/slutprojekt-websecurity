const Datastore = require('nedb-promise')
const User = require('../models/User')
const Product = require('../models/Product')


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
    // CREATE NEW ORDER AND ADD IT TO SPECIFIC USER
    async create(body, userID){
      let total = 0
      for(let i=0; i< body.items.length; i++){
       const productPrice = await Product.get(body.items[i])
        total += parseInt(productPrice.price)
      }
      console.log(total)

    const newOrder = {
      owner: userID,
      timeStamp: Date.now(), 
      status: "inProcess",
      items: body.items,
      orderValue: total
    }
    
    const newDocument = await Order.insert(newOrder)
  
    // INSERT ORDER IN ARRAY AND INSERTING ORDER INTO DATABASE
    const updateOrder = await User.users.update(
      {
        _id: userID
      },
      {
        $push: {
          orderHistory: newDocument._id,
        },
        $set:{
          payment:body.payment
        }
      
      }
    )
    return updateOrder
  }
}