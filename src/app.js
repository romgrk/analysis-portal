const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const pg = require('pg')

const { query } = require('./helpers/database.js')

const app = express()

/*
 * Setup SQL connection
 */

const client = new pg.Client('postgres://postgres@172.17.0.1:9000/postgres')

client.connect((err) => {
  if (err)
    throw err

  query(client, 'SELECT * FROM samples').then(result => {
    console.log(result.rows)
  })
})

app.set('client', client)


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

app.use('/api/sample', require('./routes/sample'))


app.use('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
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
