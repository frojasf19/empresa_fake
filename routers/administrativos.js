const express = require('express')

const { administrativos } = require('../database/empleados').datosEmpleados

const routerAdministrativos = express.Router()

routerAdministrativos.use(express.json())

routerAdministrativos.get('/', (req, res)=>{
    if(req.query.orden === 'edad') res.status(200).res.json(administrativos.sort((a, b) => a.edad - b.edad))
    res.status(200).json(administrativos)
})

routerAdministrativos.get('/:sexo', (req, res)=>{
    const sexo = req.params.sexo
    const resp = administrativos.filter(e => e.sexo === sexo)
    if(resp.length === 0) return res.status(404).json('No se encontraron empleados de ese sexo')
    return res.status(200).json(resp)
})
routerAdministrativos.get('/:sexo/:edad', (req, res)=>{
    const sexo = req.params.sexo
    const edad = req.params.edad
    const resp = administrativos.filter(e => e.sexo === sexo && e.edad == edad)
    if(resp.length === 0) return res.status(404).json('No se encontraron empleados de ese sexo')
    return res.status(200).json(resp)
})

routerAdministrativos.post('/', (req, res)=>{
    const nE = req.body
    if(nE.id == undefined || nE.nombre == undefined || nE.edad == undefined || nE.sexo == undefined || nE.correo == undefined) return res.status(404).json('No se pudo registrar al nuevo empleado')
    administrativos.push(nE)
    return res.status(200).json('Empleado registrado con exito')
})
routerAdministrativos


module.exports = routerAdministrativos 