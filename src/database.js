/*
 * database.js
 */

const pg = require('pg')

/*
 * Setup SQL connection
 */

const client = new pg.Client('postgres://postgres@172.17.0.1:9000/postgres')

client.connect((err) => {
  if (err)
    throw err
})


/**
 * Turns 'SELECT * FROM users WHERE id = @id', { id: 42 }
 * into  'SELECT * FROM users WHERE id = $1',  [ 42 ]
 * for usage with postgres module.
 */
function interpolate(query, params) {
  let index = 1
  const variables = {}

  const newQuery = query.replace(/@(\w+)/g, (m, name) => {
    if (!(params[name]))
      throw new Error(`Missing parameter "${name}"`)

    if (!(name in variables))
      variables[name] = { index: index++, value: params[name] }

    return '$' + variables[name].index
  })

  const newParams = Object.values(variables)
    .sort((a, b) => a.index - b.index)
    .map(v => v.value)

  return { query: newQuery, params: newParams }
}

/**
 * Perform a query using the client/request's app's client
 * @returns Promise
 */
function query(q, params) {
  return new Promise((resolve, reject) => {
    const interpolated = interpolate(q, params)

    client.query(interpolated.query, interpolated.params, (err, results) => {
      if (err)
        reject(err)
      else
        resolve(results)
    })
  })
}

function selectOne(q, params, field) {
  return query(q, params).then(result => field ? result.rows[0][field] : result.rows[0])
}

function selectAll(q, params, field) {
  return query(q, params).then(result => field ? result.rows.map(r => r[field]) : result.rows)
}


module.exports = { client, query, selectOne, selectAll }
