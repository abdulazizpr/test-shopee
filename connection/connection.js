var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test_shopee"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;