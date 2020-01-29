const {Router} = require("express")
const router = new Router()



const User = require ('../models/users')
router.post('/', async (req,res) =>{
const urs = await User.auth(req.body)
console.log(urs)
})


module.exports = router


