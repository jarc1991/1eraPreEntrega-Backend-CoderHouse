import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid'


export class ProductManager {

    constructor(file) {

        this.products = []
        this.file = file
    }

    async getProducts(){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        return products
    }

    async getProductsById (id){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const product = products.find (prod => prod.id === id)
        return product
    
    }

    async addProduct(prod){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const productExist = products.find (prod => prod.code === code)
        
        if(productExist){

            return false
            
        }else {

        prod.id = uuidv4()

        products.push(prod)
        await fs.writeFile(this.file, JSON.stringify(products))
        return true

        }

    }

    async updateProduct(id, product){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const prod = products.find (pro => pro.id === id)

        if(prod){

            prod.title = product.title
            prod.description = product.description
            prod.price = product.price
            prod.stock = product.stock
            prod.thumbnail = product.thumbnail
            prod.code = product.code

            products.push(prod)
            await fs.writeFile(this.file, JSON.stringify(products))

            return true


        }else{

            return false
        }

    }

    async deleteProduct(id){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const product= products.find (prod => prod.id === id)

        if(product){

            products.filter(producto => producto.id !== id)
            await fs.writeFile(this.file, JSON.stringify(products))
            return true
        }else{

            return false
        }


    }

}



