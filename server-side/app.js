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

/*
*
* Examples
*
* */

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

/*
*
* ADES supplementary
* REMINDER: UNCOMMENT BELOW ONLY IF YOU KNOW HOW TO USE IT
*
* */
/*
// pg elephantSQL init
const { Client } = require('pg');
const CONNECTION_STRING = "INSERT_YOUR_POSTGRES_URL_HERE" //Can be found in the ElephantSQL dashboard page as URL

function connect() {
    const client = new Client({
        connectionString: CONNECTION_STRING,
    });
    client.connect();
    return client;
}

function createTable() {
    const client = connect();
    const query = `
  CREATE TABLE meeting (
    id SERIAL PRIMARY KEY,
    availability_id VARCHAR(20),
    meeting_id VARCHAR(20),
    participant_id VARCHAR(20),
    start_time VARCHAR(20),
    end_time VARCHAR(20)
    );
    `;
    client.query(query, (err, res) => {
        console.log(err, res);
        client.end();
    });
}

// CRUD = CREATE
function createBasicData(meeting, callback) {
    let i = 1;
    const template = meeting.map(_info => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = meeting.reduce((reduced, _info) => [...reduced, _info['availabilityId'], _info['meetingId'], _info['participantId'], _info['startTime'], _info['endTime']], [])
    const query = `INSERT INTO meeting (availability_id, meeting_id, participant_id, start_time, end_time) VALUES ${template};`;

    const client = connect()
    client.query(query, values, (err, result) => {
        callback(err, result)
        client.end();
    });

}

// CRUD = READ
function readBasicData(meetingId, participantId, callback) {
    let query = `SELECT * FROM meeting`;
    if (meetingId && participantId) {
        query = `SELECT * FROM meeting WHERE meeting_id = '${meetingId}' AND participant_id ='${participantId}'`;
    } else if (meetingId) {
        query = `SELECT * FROM meeting WHERE meeting_id = '${meetingId}'`;
    } else if (participantId) {
        query = `SELECT * FROM meeting WHERE participant_id ='${participantId}'`;
    }

    const client = connect();
    client.query(query, (err, result) => {
        callback(err, result);
        client.end();
    });
}

// CRUD = READ
function readBasicResult(meetingId, callback) {
    let query = `SELECT * FROM meeting`;
    if (meetingId) {
        query = `SELECT * FROM meeting WHERE meeting_id = '${meetingId}'`;
    }

    const client = connect();
    client.query(query, (err, result) => {

        // Start of counting overlap interval algorithm
        if (result && result['rows']) {
            let intervals = result['rows'];

            console.log('Filtering by meeting_id', meetingId , intervals)


            // Create an array of array. Each array is time, start/end, and participantId
            const events = [];
            for (let i = 0; i < intervals.length; i++) {
                const interval = intervals[i];
                events.push([interval['start_time'], 1, interval['participant_id']]);
                events.push([interval['end_time'], -1, interval['participant_id']]);
            }
            console.log('unsorted', events)

            // Sort by asc time
            console.log('sorted', events.sort(([t1], [t2]) => t1 - t2));

            // Init
            let numberOfAvailableParticipants = 0;
            let bestStartTime = 0;
            let bestEndTime = 0;
            let bestCount = 0;

            // Count overlapping interval
            for (let i = 1; i < events.length; i++) {
                const e1 = events[i - 1]; // 1st val ['1234', 1], 2nd val ['1345', -1]
                const e2 = events[i]; // 1st val ['1345', -1], 2nd val ['2222', 1]
                numberOfAvailableParticipants += e1[1]; // 1st val 1, 2nd val -1
                console.log(`Number of available from ${e1[0]} to ${e2[0]}: ${numberOfAvailableParticipants} `)
                if (numberOfAvailableParticipants > bestCount) {
                    bestStartTime = e1[0]; bestEndTime = e2[0]; bestCount = numberOfAvailableParticipants;
                }
            }
            console.log('best time to meet', bestStartTime, bestEndTime);
            result = result['rows']; // todo return { startTime: bestStartTime, endTime: bestEndTime, participants: ['participant_id_xxx', 'participant_id_yyy', 'participant_id_zzz']}
        }
        // End of counting overlap interval algorithm

        callback(err, result);
        client.end();
    });
}

// REST GET
app.get('/supplement/basic/data', function (req, res, next) {
    const { meetingId, participantId } = req.query;
    readBasicData(meetingId, participantId, (error, result) => {
        if (error) {
            res.send('/supplement/basic/data Error')
            return next(error)
        } else {
            console.log('/supplement/basic/data - Result', result)
            res.json(result)
        }
    });
})

// REST GET
app.get('/supplement/basic/result', function (req, res, next) {
    const { meetingId } = req.query;
    readBasicResult(meetingId, (error, result) => {
        if (error) {
            res.send('/supplement/basic/result Error')
            return next(error)
        } else {
            console.log('/supplement/basic/result - Result', result)
            res.json(result)
        }
    });
})

// REST POST
app.post('/supplement/basic/insert', function (req, res, next) {
    const arrayJson = (req && req.body && req.body.data) ? req.body.data : [];
    if (arrayJson.length === 0) {
        res.send('/basic/insert - Unsuccessful - Bad Request 300')
    } else {
        arrayJson.forEach(element => console.log(element))
        createBasicData(arrayJson, (error, result) => {
            if (error) {
                res.send('/supplement/basic/insert - Error')
                return next(error)
            } else {
                console.log('/supplement/basic/insert - Result', result)
                res.send('/supplement/basic/insert - OK 200')
            }
        })
    }
})
 */

// listening...
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))