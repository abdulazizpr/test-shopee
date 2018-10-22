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
Endpoint url : `YOUR_URL/get-exchange-rate-tracking` 
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
            "avg_rate_7_days": 15194
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
        "from": "GBP",
        "to": "USD",
        "average": 1.311286,
        "variance": 0.004375,
        "entries": [
            {
                "date": "2018-10-25",
                "daily_rate": 1.311483
            },
            {
                "date": "2018-10-24",
                "daily_rate": 1.310754
            },
            {
                "date": "2018-10-23",
                "daily_rate": 1.310025
            },
            {
                "date": "2018-10-22",
                "daily_rate": 1.309296
            },
            {
                "date": "2018-10-21",
                "daily_rate": 1.308567
            },
            {
                "date": "2018-10-20",
                "daily_rate": 1.307838
            },
            {
                "date": "2018-10-19",
                "daily_rate": 1.307108
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
Endpoint url : `YOUR_URL/add-exchange-rate` 
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
**5. User wants to remove an exchange rate from the list**
Endpoint url : `YOUR_URL/delete-exchange-rate` 
Method : `DELETE`
Parameters : 
```json
{
	//add id to delete exchange rate
	"id" : 1
}
```
Response :
```json
{
    "status": 200,
    "success": true,
    "error": null,
    "message": "Delete data success"
}
```
**To see all data of curreny use this endpoint**
Endpoint url : `YOUR_URL/get-currency` 
Method : `GET`
Response :
```json
{
    "data": [
        {
            "id": 1,
            "name_currency": "GBP"
        },
        {
            "id": 2,
            "name_currency": "USD"
        },
        {
            "id": 3,
            "name_currency": "IDR"
        },
        {
            "id": 4,
            "name_currency": "JPY"
        }
    ],
    "status": 200,
    "success": true,
    "error": null,
    "message": "success"
}
```
# Design Table
This is design table data for this program
![enter image description here](https://lh3.googleusercontent.com/OxRoAUg4rPCJFFP80qftdjsMPTSx1jjHPOruNAMQ4IufO6tSLSN29cJfUckyhaJnqvVxOe9Fu68H "Design Table")

However, table currency is parent for all table because base of all currency.
# How to use it
To use it this program, you can run it on docker and follow this command :
```docker
docker-compose up -d
docker restart NAME_OF_CONTAINER_APP //because error of connection to MYSQL
```

FYI : This data source from : [https://www.investing.com/] and data is available from 2018-10-01 - 2018-10-19