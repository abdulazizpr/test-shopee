const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.DATABASE_HOST || 'localhost',
  user: "root",
  password: "password",
  database: "test_shopee"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;