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
    },

    async get(productID){
        return await products.findOne({_id:productID})
    },

    async create(body){
        const newProduct = {
            _id: body.id,
            serial: body.serial,
            title: body.title,
            price: body.price,
            shortDesc: body.shortDesc,
            longDesc: body.longDesc,
            imgFile: body.imgFile
        }
        return await products.insert( newProduct)
    },

    async remove(id){
        const deleteProduct = await products.remove({_id:id})
        return deleteProduct >0
    },

    async update(id,body){
        let updateProduct = await products.findOne(
            {_id:id}

        )
        updateProduct = await products.update(updateProduct,{
            $set: body
        })
        return updateProduct 
    }
}