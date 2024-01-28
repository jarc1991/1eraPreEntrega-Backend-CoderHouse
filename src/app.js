import express from "express";
import { routerProd } from "./routes/products.routes.js";
import { routerView } from "./routes/views.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import handlebars from 'express-handlebars';

import { __dirname }  from './path.js';

const PORT = 8080
const app = express()

//Inicializamos el motor indicando con app.engine qué motor utilizaremos

app.engine('handlebars', handlebars.engine())

//Luego con app.set indicamos en qué parte del protecto estarán las vistas
//Se recomienda usar rutas absolutas

app.set('views', __dirname+'/views')

//Finalmente con app.set indicamos que el motor que ya inicializamos es el que queremos utilizar.
//Es importante ya que le decimos al servidor que cuando renderice sepa que debe hacerlo con el motor de handlebars

app.set('view engine', 'handlebars')

//seteamos de manera estatica la carpeta public

app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {

    let test = {
        name: "Gerson",
        last_name:"Serrano"
    }

    //res.render es nuestro nuevo metodo para renderizar plantillas y de compone de:
    //nombre de la platilla, objeto para reemplazar campos

    res.render('index',test)
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProd)
app.use('/products', routerView)
app.use('/api/cart', cartRouter)

const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))