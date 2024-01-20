import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid'

const productsJson = "../products.json"

export class CartManager {

  constructor(){

    this.carts = []
    this.file = '../carts.json'

  }

  // Get

  async getCarts() {

    const readCart = await fs.readFile(this.file, "utf-8")

    try {

      return JSON.parse( this.file )

    } catch (error) {

      console.log("Error en el carrito", error)
      return [];

    }
  }

  // Get

  async getCartById(cartId) {

    const carts = await this.getCarts()
    return carts.find((cart) => cart.id === cartId)

  }

  // Post

  async createCart() {

    const carts = await this.getCarts()

    const newCart = {

        id: uuidv4,
        products: [],

    }

    carts.push(newCart)
    await fs.writeFile(this.file, JSON.stringify(carts))
    return newCart;

  }

  //Delete

  async deleteCart(Id) {

    const cartId = (Id)

    try {

      const carts = await this.getCarts()
      const cartIndex = carts.findIndex((cart) => cart.id === cartId)
  
      if (cartIndex === -1) {

        console.log("El carrito no encontrado")
        return false

      } else {

        carts.splice(cartIndex, 1)
        await fs.writeFile(this.file, JSON.stringify(carts, null, 2))
        return true;

      }
    } catch (error) {

      console.log("Hubo un error")
      return false;

    }

  }

  async addProduct(cartId, productId, quantity) {

    try {

      const carts = await this.getCarts()
      const products = await this.getProducts()

      const cartIndex = carts.findIndex(

        (cart) => cart.id === cartId

      )

      const product = products.find(

        (prod) => prod.id === productId

      );

      if (cartIndex === -1 || !product) {

        console.log("No se ha encontrado carrito ni producto")
        return false;

      }

      const prod = carts[cartIndex].products.find(

        (el) => el.id === productId)

      if (prod) {

        console.log("El producto existe")
        prod.quantity += Number(quantity)
         
      } else {

        console.log("Agregar producto")

        carts[cartIndex].products.push({

          id: productId,
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          quantity: Number(quantity),

        })

      }

      await fs.writeFile(this.file, JSON.stringify(carts, null, 2))
      return true

    } catch (error) {

      console.error("Error", error)
      return false

    }

  }

  async updateQuantity(cartId, productId, newQuantity) {

    try {

      const carts = await this.getCarts()

      const cartIndex = carts.findIndex((cart) => cart.id === cartId)

      if (cartIndex === -1) {

        console.log("Carrito no existe.")
        return false

      }

      const cart = carts[cartIndex]
      const productIndex = cart.products.findIndex(

        (prod) => prod.id === productId

      )

      if (productIndex === -1) {

        console.log("Producto no encontrado.")
        return false

      }

      cart.products[productIndex].quantity = parseInt(newQuantity)
      await fs.writeFile(this.file, JSON.stringify(carts, null, 2))

      return true

    } catch (error) {

      console.error("Error al actualizar", error)
      return false

    }

  }

  async removeProduct(cartId, productId) {

    try {

      const carts = await this.getCarts()
      const cartIndex = carts.findIndex((cart) => cart.id === cartId)

      if (cartIndex === -1) {

        console.log("Error: No se ha encontrado")
        return false

      }

      const cart = carts[cartIndex]

      const productIndex = cart.products.findIndex(

        (prod) => prod.id === productId

      )

      if (productIndex === -1) {

        console.log("Producto no encontrado")
        return false

      }

      cart.products.splice(productIndex, 1)
      await fs.writeFile(this.file, JSON.stringify(carts, null, 2));
      return true

    } catch (error) {

      console.error("Error", error)
      return false

    }

  }

  async getProducts() {

    try {

      const content = await fs.readFile(productsJson, "utf-8")
      return JSON.parse(content)

    } catch (error) {

      console.error("Error en los productos.", error)
      return []

    }

  }
  
}

