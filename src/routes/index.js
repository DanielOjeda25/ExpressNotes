const express = require('express')
const router = express.Router()

// Get
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
