const express = require('express')
const { datosEmpleados } = require('./database/empleados.js')

const app = express()

app.get('/', (req, res)=>{
    res.json('Bienvenido a mi nueva pagina web')
})

app.get('/datos', (req, res)=>{
    res.json(datosEmpleados)
})

const routerAdministrativos = require('./routers/administrativos.js')
app.use('/datos/administrativos/', routerAdministrativos)

const routerLimpieza = require('./routers/limpieza.js')
app.use('/datos/limpieza/', routerLimpieza)


const PORT = 3000

app.listen(PORT,()=>{
    console.log('Api escuchando en el puerto ' + PORT)
})