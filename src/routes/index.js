const express = require('express')
const router = express.Router()

// Get
router.get('/', (req, res) => {
  res.send('Hola')
})

module.exports = router
