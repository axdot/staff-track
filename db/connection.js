const mysql = require('mysql2');
require('dotenv').config()

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username (pulled from .env file)
    user: process.env.DB_USER,
    // Your MySQL password (pulled from .env file)
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log('Connected to the election database.')
);

module.exports = db;