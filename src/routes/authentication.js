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
router.get('/signin', (req, res) => {
  res.render('auth/signin')
})
router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
})
router.get('/profile', (req, res) => {
  res.send('LLEGASTE')
})
module.exports = router
