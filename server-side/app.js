// express init
const express = require('express')
const app = express()
const port = 3000

// cors init
const cors = require('cors')
app.use(cors())

// axios init
const axios = require('axios').default

// elephantsql init
// const elephantsql = require('./elephantsql')

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

// placeholder for illustration
app.get('/basic/data', function (req, res) {
    res.send('/basic/data')
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
    res.send('/basic/insert')
})

// placeholder for illustration
app.post('/advance/insert', function (req, res) {
    res.send('/advance/insert')
})

// listening...
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))