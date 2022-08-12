const express = require('express')

const { limpieza } = require('../database/empleados').datosEmpleados

const routerLimpieza = express.Router()

routerLimpieza.use(express.json())

routerLimpieza.get('/', (req, res)=>{
    res.status(200).json(limpieza)
})


module.exports = routerLimpieza