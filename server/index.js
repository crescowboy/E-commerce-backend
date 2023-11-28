const express = require('express')
const crypto = require('node:crypto')
const products = require('./json/products.json');
const { validateProduct } = require('./schemas/products');

const app = express();
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 5000


// Middleware para analizar el cuerpo de la solicitud JSON
app.use(express.json());

app.get('/products', (req, res)=>{
    const { type } = req.query
    if(type){
        const filteredType = products.filter(
            product => product.type.some(g => g.toLowerCase() === type.toLowerCase())
        )
        return res.json(filteredType)
    }
    res.json(products)
});

app.get('/products/:id', (req, res)=>{
    const {id} = req.params
    const product = products.find(product => product.id == id) 
    if(product) return res.json(product)

    res.status(404).json({message: "No se encontro el producto"})
})

app.post('/products', (req, res)=>{
    const result = validateProduct(req.body) 

    if(result.error){
        return res.status(400).json({message: result.error.message})
    }

    

    const newProduct = {
        id: crypto.randomUUID(),
        ...result.data
    }

    console.log(newProduct)

    products.push(newProduct)
    res.status(201).json(newProduct)
})

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