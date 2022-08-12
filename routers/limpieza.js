const express = require('express')

const { limpieza } = require('../database/empleados').datosEmpleados

const routerLimpieza = express.Router()

routerLimpieza.use(express.json())

routerLimpieza.get('/', (req, res)=>{
    if(req.query.orden === 'edad') return res.status(200).json(limpieza.sort((a, b)=> b.edad - a.edad))
    return res.status(200).json(limpieza)
})

routerLimpieza.get('/:sexo', (req, res)=>{
    const sexo = req.params.sexo
    const resp = limpieza.filter(e => e.sexo === sexo)
    if(resp.length === 0) return res.status(404).json('No se pillaron empleados de sexo ' + sexo)
    return res.status(200).json(resp)
})

routerLimpieza.get('/:sexo/:edad', (req, res)=>{
    const sexo = req.params.sexo
    const edad = req.params.edad

    const resp = limpieza.filter(e => e.sexo === sexo && e.edad == edad)
    if(resp.length === 0) return res.status(404).json('No se pillaron empleados de sexo ' + sexo + ' y de edad ' + edad)
    return res.status(200).json(resp)
})

module.exports = routerLimpieza