const Datastore = require('nedb-promise')
const products = new Datastore({
    filename:'./db/products.db',
    autoload:true
})

module.exports = {
    async all(){
        return await products.find({})
    }
}