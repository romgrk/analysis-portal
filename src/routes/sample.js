const express = require('express')
const router = express.Router()

const { query, selectOne } = require('../helpers/database.js')
const { okHandler, dataHandler, errorHandler } = require('../helpers/hanlders.js')

router.get('/:id', (req, res, next) => {

  const id = req.params.id

  selectOne(req, `
    SELECT data FROM samples WHERE id = @id
  `, { id }, 'data')
  .then(dataHandler(res))
  .catch(errorHandler(res))
})

router.get('/', (req, res, next) => {
  selectAll(req, `
    SELECT data FROM samples
  `, { }, 'data')
  .then(dataHandler(res))
  .catch(errorHandler(res))
})

router.post('/', (req, res, next) => {

  const data = req.body
  const id   = req.body.sample_name

  query(req, `
    INSERT INTO samples (id, data)
         VALUES         (@id, @data)
    ON CONFLICT (id) DO
         UPDATE
            SET data = @data
          WHERE samples.id = @id;
  `, { id, data })
  .then(okHandler(res))
  .catch(errorHandler(res))
})

module.exports = router;
