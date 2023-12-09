// require the mysql module
const mysql = require('mysql');

// create a pool of connections to the database
const pool = mysql.createPool({
  // set the connection parameters
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db'
});

// export the pool object
module.exports = pool;
