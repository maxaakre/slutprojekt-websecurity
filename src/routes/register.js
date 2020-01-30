const {Router} = require("express")
const router = new Router()


const User = require ('../models/users')

router.post('/', async (req,res,next) =>{
    const usr = await User.create(req.body)
    if(usr){
        res.json({message:"You registered !"})
    }else{
        res.json({message:"You didnt registered!"})

    }
    next()
})




module.exports = router