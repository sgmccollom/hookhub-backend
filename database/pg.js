// PG connection and test query

const { Pool } = require('pg')

const pool = new Pool({
  database: '',
  user: '',
  password: '',
});

function checkPGConnection() {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error connecting to PG: ', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing PG query: ', err.stack)
      }
      console.log(`Connected to PG: ${result.rows[0].now}`)
    })
  })
}

async function query(text, params) {
  return pool.query(text, params);
}

const client = {
  query,
  checkPGConnection
};

module.exports = client;
