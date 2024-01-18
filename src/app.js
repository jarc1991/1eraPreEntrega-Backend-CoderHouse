import express from "express";
import { routerProd } from "./routes/products.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { __dirname }  from './path.js';
import path from "path";


const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProd)
app.use('/api/cart', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public'))) //Podemos hacer un console.log de path.join(__dirname, '/public') y nos traera la dirección de nuestra carpeta public
                                                                    //Luego con Multer se subirian las imagenes
const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))