import express from 'express'
import { CartManager } from "../models/cartManager.js"

const cartRouter = express.Router()

const cartManager = new CartManager()

// Crear carrito

cartRouter.post("/", async (req, res) => {

  const create = await cartManager.createCart();

  if (create) {

    res.status(200).send("Carrito creado.")
     
  } else {

    res.status(400).send("Error.")

  }

})

// Agregar

cartRouter.post("/:cid/product/:pid", async (req, res) => {

  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const product = await cartManager.addProduct(

    cid,
    pid,
    quantity

  )

console.log(product)

  if (!product) {

    res.status(404).send("El carrito no se pudo crear.")

  } else {

    res.status(200).send("Producto se ha agregado al carrito.")

  }

})

// Eliminar

cartRouter.delete("/:cid", async (req, res) => {

  const {cid} = req.params;
  const del = await cartManager.deleteCart(cid);

  if (del) {

    res.status(200).send("Carrito eliminado")

  } else {

    res.status(400).send("Error")

  }

})

// Cart by Id

cartRouter.get("/:cid", async (req, res) => {

  const cid = req.params.id;
  const cart = await cartManager.getCartById(cid)

  if (cart) {

    res.status(200).send(cart)

  } else {

    res.status(404).send("El carrito no se ha encontrado.")

  }

})

// Eliminar producto

cartRouter.delete("/:cid/product/:pid", async (req, res) => {

  const { cid, pid } = req.params

  const product = await cartManager.removeProduct(cid, pid)

  if (!product) {

    return res.status(404).send("No se pudo eliminar.")

  } else {

    res.status(200).send("Producto eliminado del carrito")

  }

})

// Actualizar cantidad

cartRouter.put("/:cid/product/:pid", async (req, res) => {

  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const quant = await cartManager.updateQuantity(cid, pid, quantity)

  if (!quant) {

    return res.status(404).send("No se pudo actualizar.")

  } else {

    res.status(200).send("Cantidad del producto actualizada.")
  }
});

export { cartRouter };