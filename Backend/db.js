// require the mysql module
const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config();
// create a pool of connections to the database
const pool = mysql.createPool({
  // set the connection parameters
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db'
});

// console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);


// export the pool object
module.exports = pool;
