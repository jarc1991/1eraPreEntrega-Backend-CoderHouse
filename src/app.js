import express from "express";
import { routerProd } from "./routes/products.routes.js";

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProd)

const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))