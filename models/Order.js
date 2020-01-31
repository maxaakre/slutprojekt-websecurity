const Datastore = require('nedb-promise')
const products = new Datastore({
    filename:'./db/orders.db',
    autoload:true
})


module.exports = {
    async all(){
        return await products.find({})
    },
    async create(body){
        const newOrder = {
            _id: body.id,
            timeStamp: Date.now(), 
            status: 'inProcess', 
            items: body.items,
            orderValue: body.orderValue
        }
        return await products.insert( newOrder)
    }

}