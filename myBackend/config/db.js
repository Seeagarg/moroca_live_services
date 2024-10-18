const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const pool2 = mysql.createPool({

    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME2,
});

const pool3 = mysql.createPool({

  host: process.env.DB_HOST2,
  user: process.env.DB_USER2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME3,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
  connection.release();
});

pool2.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to second database:', err);
    return;
  }
  console.log('Connected to second database!');
  connection.release();
});

pool3.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to third database:', err);
    return;
  }
  console.log('Connected to third database!');
  connection.release();
});

module.exports = {
  pool,
  pool2,
  pool3,
};