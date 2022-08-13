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

routerLimpieza.post('/', (req, res)=>{
    const nE = req.body
    if(nE.id == undefined || nE.nombre == undefined || nE.edad == undefined || nE.sexo == undefined || nE.correo == undefined) return res.status(404).json('No se pudo registrar al nuevo empleado')
    limpieza.push(nE)
    return res.status(200).json('Empleado registrado con exito')
})

routerLimpieza.put('/:id', (req, res)=>{
    const eA = req.body
    const id = req.params.id
    if(eA.nombre === undefined || eA.edad === undefined || eA.sexo === undefined || eA.correo === undefined) return res.status(404).json('No se pudo actualizar los datos')
    const empl = limpieza.findIndex(e => e.id == id)
    if(empl >= 0){
        limpieza[empl] = eA
    }
    res.status(200).json('Empleado actualizado con exito')
})

routerLimpieza.delete('/:id', (req, res)=>{
    const id = req.params.id
    const existe = limpieza.find(e => e.id == id)
    if(existe === undefined) return res.status(404).json('No se encontro al empleado')
    limpieza.splice(id - 1, 1)
    res.status(200).json(limpieza)
})

module.exports = routerLimpieza