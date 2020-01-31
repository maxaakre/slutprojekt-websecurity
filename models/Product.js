const Datastore = require('nedb-promise')
const products = new Datastore({
    filename:'./db/products.db',
    autoload:true
})

// Add all product to with a json file to database "products.db"

// const fs = require("fs");
// const productsArr = require("../products.json");
// products.insert(productsArr);

module.exports = {
    async all(){
        return await products.find({})
    }
}