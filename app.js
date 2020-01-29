const express = require('express')
const app = express()

app.use(express.static('public'))


app.get('/api/products', (req,res) => {
    res.json(
        [
            {
                _id: 1,
                title: "Awesome shit",
                price: 1337,
                shortDesc: "lorem ipsum",
                longDesc: "loredm dfsfsafmlfds",
                imgFile: 'skateboard-greta.png'
            }
        ]
    )
})


app.listen(8080, () => console.log("Server started"))
