const express = require('express')
const product = require('./json/products.json')

const app = express();

const PORT = process.env.PORT ?? 5000

app.get('/products', (req, res)=>{
    res.json(product)
});

app.post('/newproducts', (req, res)=>{
    let body = '';

    req.on('data', chunk =>{
        body += chunk.toString() 
    })

    req.on('end', ()=>{
        const data = JSON.parse(body)

        data.timestamp = Date.now()
        res.status(201).json(data)
    })
})




app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT}`)
})