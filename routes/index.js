var express = require('express');
var trend = require('trend');
var moment = require("moment");
var router = express.Router();
var conn = require('../connection/connection');
const roundTo = require('round-to');

var GetDates = function (startDate, daysToAdd) {
  var aryDates = [];

  for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push(currentDate.getFullYear()+'-'+leftPad(currentDate.getMonth(),2)+'-'+leftPad(currentDate.getDate(),2));
  }

  return aryDates;
}

var leftPad = function (number, targetLength) {
  var output = number + '';
  while (output.length < targetLength) {
      output = '0' + output;
  }
  return output;
}

//get all data currency
router.get('/', function(req, res, next) {
  conn.query('SELECT * FROM currency', function (error, rows, fields){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "failed"  
      });
    } else{
      res.json({        
        data : rows, 
        status: 200,
        success : true,
        error : null,
        message: "success"  
      });
    }
  });
  
});

//add exchange rate
router.post('/add-exchange-rate', function(req, res, next) {
  var from = req.body.from_currency;
  var to = req.body.to_currency;
  
  //checking for there is/n't exchange rate
  conn.query('SELECT * FROM currency WHERE id='+from+' or id='+to, function (error, rows, fields){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "Internal Server Error"  
      });
    } else{       
      
      //if data <= 1
      if(rows.length <= 1){
        res.json({        
          data : null, 
          status: 404,
          success : false,
          error : null,
          message: "Data not found"  
        });
      }else{
        //insert data to exchange rate
        conn.query('INSERT INTO exchange_rate VALUES(null,'+from+','+to+')',function(error,rows,fields){
          if(error){
            res.json({        
              data : null, 
              status: 500,
              success : false,
              error : error,
              message: "Add data failed"  
            });
          }else{
            res.json({
              status: 200,
              success : true,
              error : null,
              message: "Add data success"  
            });
          }
        });
      }
    } 
  });
  
});

//add daily exchange-rate
router.post('/add-daily-exchange-rate', function(req, res, next) {
  var date = req.body.date;
  var from = req.body.from_currency;
  var to = req.body.to_currency;
  var rate = req.body.rate;

  //check for exchange rate
  conn.query('SELECT * FROM exchange_rate WHERE from_currency='+from+' and to_currency='+to, function (error, rows, fields){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "Internal Server Error"  
      });
    } else{       
      
      //check if data not found add exchange_rate
      if(rows.length <= 0){
        
        conn.query('SELECT * FROM currency WHERE id='+from+' or id='+to, function (error, rows, fields){
          if(error){
            res.json({        
              data : null, 
              status: 500,
              success : false,
              error : error,
              message: "Internal Server Error"  
            });
          } else{       
            
            if(rows.length <= 1){
              res.json({        
                data : null, 
                status: 404,
                success : false,
                error : null,
                message: "Data not found"  
              });
            }else{
              conn.query('INSERT INTO exchange_rate VALUES(null,'+from+','+to+')',function(error,rows,fields){
                if(error){
                  res.json({        
                    data : null, 
                    status: 500,
                    success : false,
                    error : error,
                    message: "Add data failed"  
                  });
                }else{

                  var id_daily = rows.insertId;
                  
                  conn.query('INSERT INTO daily_exchange_rate VALUES(null,"'+date+'",'+id_daily+','+rate+')',function(error,rows,fields){
                    if(error){
                      res.json({        
                        data : null, 
                        status: 500,
                        success : false,
                        error : error,
                        message: "Add data failed"  
                      });
                    }else{
                      res.json({
                        status: 200,
                        success : true,
                        error : null,
                        message: "Add data success"  
                      });
                    }
                  });

                }
              });
            }
          } 
        });

      }else{
          //insert data to daily exchange rate
          var id_daily = rows[0].id;
          conn.query('INSERT INTO daily_exchange_rate VALUES(null,"'+date+'",'+id_daily+','+rate+')',function(error,rows,fields){
            if(error){
              res.json({        
                data : null, 
                status: 500,
                success : false,
                error : error,
                message: "Add data failed"  
              });
            }else{
              res.json({
                status: 200,
                success : true,
                error : null,
                message: "Add data success"  
              });
            }
          });
      }
    }
  });
});

//get tracking exhcange rate
router.post('/get-exchange-rate-tracking', function(req, res, next) {
  var date = req.body.date;

  var query = 'select c1.name_currency as "from", c2.name_currency as "to",de.rate as daily_rate,round(avg(de.rate),10) as avg_rate_7_days '+
              'from exchange_rate er '+
              'INNER JOIN currency c1 on c1.id = er.from_currency ' +
              'INNER JOIN currency c2 on c2.id = er.to_currency '+
              'LEFT JOIN daily_exchange_rate de on de.id_exchange_rate = er.id '+
              'WHERE '+
              'de.date >= DATE("'+date+'") - INTERVAL 6 DAY '+
	            'AND de.date <  DATE("'+date+'") + INTERVAL 1 DAY '+
	            'or de.rate is null ' +
              'GROUP BY er.id '+
              'ORDER by er.id,de.date DESC ';

  conn.query(query, function (error, rows, fields){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "Internal Server Error"  
      });
    } else{    
      if(rows.length <= 0){
        res.json({        
          data : null, 
          status: 404,
          success : false,
          error : null,
          message: "Data not found"  
        });
      }else{
        //if data is null add insufficient data
        for(var i=0;i<rows.length;i++){
          rows[i].daily_rate = (rows[i].daily_rate>999) ? roundTo(rows[i].daily_rate,0) : (rows[i].daily_rate) ? rows[i].daily_rate : "insufficient data";
          rows[i].avg_rate_7_days =(rows[i].avg_rate_7_days>999) ? roundTo(rows[i].avg_rate_7_days,0) : (rows[i].avg_rate_7_days) ? rows[i].avg_rate_7_days : "insufficient data";
        }
        res.json({        
          data : rows, 
          status: 200,
          success : true,
          error : null,
          message: "success"  
        });
      }
    }
  });
});

//get exhcange rate trend
router.post('/get-exchange-rate-trend', function(req, res, next) {
  var date = req.body.date;
  var from = req.body.from_currency;
  var to = req.body.to_currency;

  var query = 'select c1.name_currency as "from", c2.name_currency as "to", de.date,de.rate as daily_rate '+
              'from exchange_rate er '+
              'INNER JOIN currency c1 on c1.id = er.from_currency ' +
              'INNER JOIN currency c2 on c2.id = er.to_currency '+
              'LEFT JOIN daily_exchange_rate de on de.id_exchange_rate = er.id '+
              'WHERE '+
              'de.date >= DATE("'+date+'") - INTERVAL 6 DAY '+
	            'AND de.date <  DATE("'+date+'") + INTERVAL 1 DAY '+
	            'and c1.name_currency = "'+from+'" and c2.name_currency = "'+to+'" ' +
              'GROUP BY er.id, de.date '+
              'ORDER by er.id,de.date ASC ';

  conn.query(query, function (error, rows, fields){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "Internal Server Error"  
      });
    } else{    
      if(rows.length <= 0){
        res.json({        
          data : null, 
          status: 404,
          success : false,
          error : null,
          message: "Data not found"  
        });
      }else{
        var data = [];
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        var dates7days = GetDates(new Date(date),7);
        

        //calculate to prediction trend
        for(var i=0;i<rows.length;i++){
          data[i] = rows[i].daily_rate;
        }

        var from = rows[0].from;
        var to = rows[0].to;
        var all_avg = average(data);

        var group1 = data.slice(0,4);
        var group2 = data.slice(3,7);
        
        var semi_avg_1 = average(group1);
        
        var semi_avg_2 = average(group2);

        var b = (semi_avg_2 - semi_avg_1) / (data.length - 1);

        var x = 4;
        var points = 7;
        var result = [];

        //create 7 points
        for(var i=0;i<points;i++){
          var Y = roundTo(semi_avg_1 + (b*x),6)
          result.push({
            date : dates7days[i],
            daily_rate : Y
          });

          x++;
        }

        result = result.sort(function(a,b){return a.date < b.date;});
        var min = result.reduce(function (prev, current) {
          return (prev.daily_rate < current.daily_rate) ? prev : current
        });

        var max = result.reduce(function (prev, current) {
          return (prev.daily_rate > current.daily_rate) ? prev : current
        });

        var variance = max.daily_rate - min.daily_rate;

        res.json({        
          data :{
            from : from,
            to : to,
            average : roundTo(all_avg,6),
            variance : roundTo(variance,6),
            entries : result
          }, 
          status: 200,
          success : true,
          error : null,
          message: "success"  
        });
      }
    }
  });
});

router.delete('/delete-daily-exchange-rate', function(req, res, next) {
  var id = req.body.id;
  
  var query = 'SELECT * from exchange_rate where id='+id;

  conn.query(query,function(error, rows, field){
    if(error){
      res.json({        
        data : null, 
        status: 500,
        success : false,
        error : error,
        message: "Internal Server Error"  
      });
    }else{
      if(rows.length <=0){
        res.json({        
          data : null, 
          status: 404,
          success : false,
          error : error,
          message: "Data Not Found"  
        });
      }else{
        var query = 'DELETE from exchange_rate where id='+id;
        
        conn.query(query,function(error, rows, field){
          if(error){
            res.json({        
              data : null, 
              status: 500,
              success : false,
              error : error,
              message: "Internal Server Error"  
            });
          }else{
            res.json({ 
              status: 200,
              success : true,
              error : null,
              message: "Delete Data Success"  
            });
          }
        });
      }
    }
  })
});

module.exports = router;
