import { routerProd } from "./routes/products.routes.js";
import express from "express";

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProd)

const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))