const express = require('express')
const router = express.Router()
// conesto hacemos la conexion a la base de datos
const pool = require('../database')

// esta ruta trare la vista para agregar links
router.get('/add', (req, res) => {
  res.render('links/add')
})
// esta ruta postea y guarda en la bases de datos
router.post('/add', async (req, res) => {
  const { title, url, description } = req.body
  const newLink = {
    title,
    url,
    description,
  }
  await pool.query('INSERT INTO links set ?', [newLink])
  res.redirect('/links')
})

// esta ruta trare redirecciona adonde estaran los links
router.get('/', async (req, res) => {
  const links = await pool.query('SELECT * FROM links')
  res.render('links/list', { links })
})
// esta ruta eliminara el link usando el id
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE ID = ?', [id])
  res.redirect('/links')
})

// esta ruta se usara para editar los links
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
  res.render('links/edit', { link: links[0] })
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, url } = req.body
  const newLink = {
    title,
    url,
    description
  }
  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])
  res.redirect('/links')
})
module.exports = router
