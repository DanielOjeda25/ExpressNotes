const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')
// Aqui hare una autenticaion de manera local
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body
      const newUser = {
        username,
        password,
        fullname
      }
      newUser.password = await helpers.encryptPassword(password)
      const result = await pool.query('INSERT INTO users SET ? ', newUser)
      newUser.id = result.insertId
      return done(null, newUser)
    }
  )
)
// Cuando serializo, guardo el ID del usuario
passport.serializeUser((user, done) => {
  done(null, user.id)
})
// Cuando desserializo voy a utilizar esa informacion

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query(`SELECT * FROM users WHERE id = ${id}`)
  done(null, rows[0])
})