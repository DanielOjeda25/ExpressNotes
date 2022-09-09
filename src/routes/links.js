const express = require('express')
const router = express.Router()
// conesto hacemos la conexion a la base de datos
const pool = require('../database')

router.get('/add', (req, res) => {
  res.render('links/add')
})
router.post('/add', (req, res) => {
  res.send('recibido')
})

module.exports = router
