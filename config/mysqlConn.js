const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

mysqlConnection.connect(() => console.log('DB Connected'))


module.exports = mysqlConnection;