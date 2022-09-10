const express = require('express')
const passport = require('passport')
const router = express.Router()
// esta ruta es para renderizar el formulario
router.get('/signup', (req, res) => {
  res.render('auth/signup')
})
// esta ruta es para enviar los datos del form
router.post(
  '/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })
)

router.get('/profile', (req, res) => {
  res.send('LLEGASTE')
})
module.exports = router
