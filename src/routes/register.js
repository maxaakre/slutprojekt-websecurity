const {Router} = require("express")
const router = new Router()


const User = require ('../models/users')

router.post('/', async (req,res) =>{
    const usr = await User.create(req.body)
    res.send(user)
})

module.exports = router