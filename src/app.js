const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const db = require('./database.js')
const Samples = require('./models/samples.js')


const app = express()


db.query('SELECT * FROM samples').then(result => {
  console.log(result.rows)
})


/*
 * View engine
 */

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


/*
 * Logger & middlewares
 */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


/*
 * Routes
 */

app.use('/api/samples', require('./routes/samples'))


app.use('/', (req, res, next) => {
  Samples.getAll()
  .then(samples => {
    res.render('index', { title: 'Analysis Portal', samples: samples })
  })
})


/*
 * Finally, 404 and error handler
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
