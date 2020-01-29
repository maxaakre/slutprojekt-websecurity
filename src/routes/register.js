const {Router} = require("express")
const router = new Router()


const User = require ('../models/users')

router.post('/', async (req,res) =>{
    const usr = await User.create(req.body)
    if(usr){
        res.json({message:"Youare registereterdec !?!"})
    }else{
        res.json({message:"You done goofed!?!"})

    }
    
})




module.exports = router