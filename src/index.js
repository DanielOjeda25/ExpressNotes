const exphbs = require('express-handlebars')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
// init
const app = express()

// settings
app.set('port', process.env.PORT || 3001)
app.set('views', path.join(__dirname, 'views'))
app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  })
)
app.set('view engine', '.hbs')

// Middlewares
// con morgan mostraremos las peticiones por consola
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global Variables
app.use((req, res, next) => {
  next()
})
// Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

// Public
app.use(express.static(path.join(__dirname, 'public')))
// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
