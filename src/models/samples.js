/*
 * samples.js
 */


const { query, selectOne, selectAll } = require('../database.js')

module.exports = { insert, get, getAll }

function insert(id, user, data) {
  return query(`
    INSERT INTO samples (id, "user", data, created, modified)
         VALUES         (@id, @user, @data, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO
         UPDATE
            SET data = @data
              , "user" = @user
              , modified = CURRENT_TIMESTAMP
          WHERE samples.id = @id;
  `, { id, user, data })
}

function get(id) {
  return selectOne(`
    SELECT * FROM samples WHERE id = @id
  `, { id })
}

function getAll() {
  return selectAll(`
    SELECT * FROM samples ORDER BY modified DESC
  `)
}

