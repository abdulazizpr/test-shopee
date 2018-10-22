# Foreign Currency BE Excercise

Name 				: `ABDUL AZIZ PRIATNA`
This is documentaion to how to use this API for Front End Development.

**Use Case**

**1.  User wants to input exchange rate data**
Endpoint url : `YOUR_URL/add-exchange-rate` 
Method : `POST`
Parameters : 
```json
{
	"date" : "2018-10-19",//date for transaction
	"from_currency" : 1, //this is id from id currency
	"to_currency" : 2, //this is id from id currency
	"rate" : 1.3081 //this is for value of rate
}
```
Response:
```json
{
    "status": 200,
    "success": true,
    "error": null,
    "message": "Add data success"
}
```
**2. User has a list of exchange rates to be tracked**
Endpoint url : `YOUR_URL/add-daily-exchange-rate` 
Method : `POST`
Parameters : 
```json
{
	"date" : "2018-10-19",//date for transaction
}
```
Response:
```json
{
    {
    "data": [
        {
            "from": "GBP",
            "to": "USD",
            "daily_rate": 1.3081,
            "avg_rate_7_days": 1.3112857143
        },
        {
            "from": "USD",
            "to": "GBP",
            "daily_rate": 0.765,
            "avg_rate_7_days": 0.7600857143
        },
        {
            "from": "USD",
            "to": "IDR",
            "daily_rate": 15187,
            "avg_rate_7_days": 15187
        },
        {
            "from": "JPY",
            "to": "IDR",
            "daily_rate": "insufficient data",
            "avg_rate_7_days": "insufficient data"
        }
    ],
    "status": 200,
    "success": true,
    "error": null,
    "message": "success"
}
```
**3. User wants to see the exchange rate trend from the most recent 7 data points**
Endpoint url : `YOUR_URL/get-exchange-rate-trend` 
Method : `POST`
Parameters : 
```json
{
	"date" : "2018-10-19",
	"from_currency" : "USD",
	"to_currency" : "GBP"
}
```
Response:
```json
{
    "data": {
        "from": "USD",
        "to": "GBP",
        "average": 0.760086,
        "variance": 0.007225,
        "entries": [
            {
                "date": "2018-09-25",
                "daily_rate": 0.768292
            },
            {
                "date": "2018-09-24",
                "daily_rate": 0.767087
            },
            {
                "date": "2018-09-23",
                "daily_rate": 0.765883
            },
            {
                "date": "2018-09-22",
                "daily_rate": 0.764679
            },
            {
                "date": "2018-09-21",
                "daily_rate": 0.763475
            },
            {
                "date": "2018-09-20",
                "daily_rate": 0.762271
            },
            {
                "date": "2018-09-19",
                "daily_rate": 0.761067
            }
        ]
    },
    "status": 200,
    "success": true,
    "error": null,
    "message": "success"
}
```

**4. User wants to add an exchange rate to the lists**
Endpoint url : `YOUR_URL/get-exchange-rate-trend` 
Method : `POST`
Parameters : 
```json
{
	//add id to exchange rate
	"from_currency" : 1,
	"to_currency" : 2
}
```
Response :
```json
{
    "status": 200,
    "success": true,
    "error": null,
    "message": "Add data success"
}
```