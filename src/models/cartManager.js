import { promises as fs } from "fs";
import { join } from "path";
import { __dirname } from "../path.js";
import { v4 as uuidv4 } from 'uuid'

const cartFile = join(__dirname, "../carts.json")


const readCart = await fs.readFile(cartFile, "utf-8")

export class CartManager {

  // Get

  async getCarts() {

    try {

      return JSON.parse( readCart )

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

        products: [],

    }

    carts.id = uuidv4()
    carts.push(newCart)
    await fs.writeFile(cartFile, JSON.stringify(carts))
    return newCart;

  }


  async addProduct(cartId, productId, quantity) {

    try {

      const carts = await this.getCarts();

      const products = await this.getProducts();

      const cartIn = carts.findIndex(

        (cart) => parseInt(cart.id) === parseInt(cartId)

      );

      const product = products.find(

        (prod) => parseInt(prod.id) === parseInt(productId)

      );

      if (cartIn === -1 || !product) {

        console.log("No encontrado")

        return false;
      }

      const existProd = carts[cartIn].products.find(

        (prod) => prod.id === productId

      )

      if (existProd) {

        console.log("Existe el producto")

        existProd.quantity += parseInt(quantity)

      } else {

        console.log("Producto agregado")

        carts[cartIn].products.push({

          id: uuidv4(),
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          quantity: parseInt(quantity),

        })
      }

      await fs.writeFile(cartFile, JSON.stringify(carts, null, 2))

      return true

    } catch (error) {

      console.error("Error", error);

      return false;
    }
  }
  
}