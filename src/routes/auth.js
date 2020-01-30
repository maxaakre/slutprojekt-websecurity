const {Router} = require("express")
const router = new Router()



const User = require ('../models/users')


router.post('/', async (req,res) =>{
const usr = await User.auth(req.body)
if(!usr){
    res.json({message:"You not logged in !",})
}else{
    res.json({message:"You logged in !", token: token})
}
}
)


module.exports = router

 