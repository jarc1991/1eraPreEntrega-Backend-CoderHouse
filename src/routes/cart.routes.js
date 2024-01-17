import express from 'express'
import fs from 'fs'
const routerCart = express.Router()


const json__products = fs.readFileSync('./cart.json', 'utf-8')
let products = JSON.parse(json__products)

//Obtener todos los productos

routerCart.get('/', (req, res)=> {

    res.json({ products })

})

//Obtener producto en especifico

routerCart.get('/:cid', (req, res) => {

    const cid = parseInt(req.params.cid)
    console.log(cid)

    const product = products.find ((product) => product.id === cid)

    if(!product){

        return res.status(404).json({ error:'Producto no encontrado.' })

    }else {

        return res.json(product)
    }

})

//Agregar un nuevo producto

routerCart.post('/', (req, res) =>{

    const { title, description, code, price, stock } = req.body

    if(!title || !description || !code || !price || !stock ){

        res.status(400).send('Las entradas deben tener un nombre, una descripción, un código, un stock')
    }

    const newProduct = req.body 

    products.push(newProduct)

    const json_products = JSON.stringify(products)

    fs.writeFileSync('./cart.json', json_products, 'utf-8')

    res.json({ message: 'Producto agregado correctamente' })

})


export { routerCart }