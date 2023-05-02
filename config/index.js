const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mouafek',
  database: 'foodini',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});


module.exports=connection;