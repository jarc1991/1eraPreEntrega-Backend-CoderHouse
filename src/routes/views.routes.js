import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

export const routerView = Router()

const productManager = new ProductManager('./products.json')

routerView.get('/', async (req, res) => {

    const products = await productManager.getProducts()
    res.render('home', {products})

})

routerView.get('/realtimeproducts', async (req, res) => {

    const products = await productManager.getProducts()
    res.render('realTimeProducts', {products})

})

