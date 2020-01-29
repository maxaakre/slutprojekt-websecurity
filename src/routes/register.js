const {Router} = require("express")
const router = new Router()


const User = require ('../models/users')

router.post('/', async (req,res) =>{
    const usr = await User.create(req.body)
    res.json(usr)
})




module.exports = router