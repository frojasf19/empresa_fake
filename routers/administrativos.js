const express = require('express')

const { administrativos } = require('../database/empleados').datosEmpleados

const routerAdministrativos = express.Router()

routerAdministrativos.use(express.json())

routerAdministrativos.get('/', (req, res)=>{
    res.status(200).json(administrativos)
})


module.exports = routerAdministrativos 