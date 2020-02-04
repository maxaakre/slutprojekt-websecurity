const Datastore = require('nedb-promise');
const products = new Datastore({
    filename:'./db/products.db',
    autoload:true
});



module.exports = {
    //GET ALL PRODUCTS
    async all(){
        return await products.find({})
    },
    //GET ONE PRODUCT
    async get(productID){
        return await products.findOne({_id:productID})
    },
    //CREATE NEW PRODUCT
    async create(body){
        const newProduct = {
            serial: body.serial,
            title: body.title,
            price: body.price,
            shortDesc: body.shortDesc,
            longDesc: body.longDesc,
            imgFile: body.imgFile
        }
        return await products.insert( newProduct)
    },
    //REMOVE PRODUCT
    async remove(id){
        const deleteProduct = await products.remove({_id:id})
        return deleteProduct >0
    },
    //UPDATE PRODUCT
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