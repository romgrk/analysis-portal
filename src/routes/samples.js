const express = require('express')
const router = express.Router()

const Samples = require('../models/samples.js')
const { okHandler, dataHandler, errorHandler } = require('../helpers/handlers.js')

router.get('/:id', (req, res, next) => {

  const id = req.params.id

  Samples.get(id)
  .then(dataHandler(res))
  .catch(errorHandler(res))
})

router.get('/', (req, res, next) => {
  Samples.getAll()
  .then(dataHandler(res))
  .catch(errorHandler(res))
})

router.post('/', (req, res, next) => {

  const data = req.body
  const id   = req.body.sample_name

  Samples.insert(id, data)
  .then(okHandler(res))
  .catch(errorHandler(res))
})

module.exports = router;
