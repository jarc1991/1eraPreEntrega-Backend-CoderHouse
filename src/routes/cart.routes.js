import express from 'express';
import { CartManager } from "../models/cartManager.js";

const cartRouter = express.Router()

const cartManager = new CartManager()

//Metodo para crear cart

cartRouter.post("/", async (req, res) => {

  const create = await cartManager.createCart();

  if (create) {

    res.status(200).send("Se ha creado con éxito")

  } else {

    res.status(400).send("Error")

  }
});


//CartById

cartRouter.get("/:cid", async (req, res) => {

  const cid = req.params.id

  const cart = await cartManager.getCartById(cid)

  if (cart) {

    res.status(200).send(cart)

  } else {

    res.status(404).send("No se ha encontrado el ID")
  }

})

//Agregar

cartRouter.post("/:cid/product/:pid", async (req, res) => {

  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const add = await cartManager.addProduct(

    cid,
    pid,
    quantity

  )

  if (!add) {

    res.status(404).send("Error al adherir");

  } else {

    res.status(200).send(`Producto se ha agregado al carrito con id: ${cid}`);
  }

})


export { cartRouter };