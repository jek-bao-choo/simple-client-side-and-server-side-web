// express init
const express = require('express')
const app = express()
const port = 3000

// cors init
const cors = require('cors')
app.use(cors())

// parse application/json
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// axios init
const axios = require('axios').default

// pg elephantsql init
/*const pg = require('pg')
const conString = "INSERT_YOUR_POSTGRES_URL_HERE" //Can be found in the Details page
const client = new pg.Client(conString);
client.connect()*/

// get hello world endpoint
app.get('/helloworld', (req, res) => res.send('Hello World!'))

// get dummy endpoint
app.get('/dummy', (req, res) => {
    return axios.get('http://dummy.restapiexample.com/api/v1/employees')
        .then(function (response) {
            // handle success
            return res.send(response['data']);
        })
        .catch(function (error) {
            // handle error
            return res.send(error);
        });
})

/*
*
*
* ADES
*
*
* */

// placeholder for illustration
app.get('/basic/data', function (req, res) {
    // return client.query('SELECT NOW() AS "theTime"', (err, result) => {
    //     if(err) {
    //         return console.error('error running query', err);
    //     }
    //     console.log(result);
        res.send('/basic/data')
        // client.end();
    // })
})

// placeholder for illustration
app.get('/advance/data', function (req, res) {
    res.send('/advance/data')
})

// placeholder for illustration
app.get('/basic/result', function (req, res) {
    res.send('/basic/result')
})

// placeholder for illustration
app.get('/advance/result', function (req, res) {
    res.send('/advance/result')
})

// placeholder for illustration
app.post('/basic/insert', function (req, res) {
    const arrayJson = (req && req.body && req.body.data) ? req.body.data : [];
    const insertStatement = 'INSERT INTO films (performanceId, festivalId, startTime, endTime) VALUES';
    const insertValue = '';
    arrayJson.forEach(element => console.log(element))
    res.send('/basic/insert')
})

// placeholder for illustration
app.post('/advance/insert', function (req, res) {
    res.send('/advance/insert')
})

// listening...
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))