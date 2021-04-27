function getDummyData_ClientSide_WebAPI() {
    /* Fetch method */
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(function(response) {
            console.log('response', response)
            return response.json()
        })
        .then(function(json) {
            console.log('json', json)
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
    /* Axios method */
    // axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
    //     .then(function (response) {
    //         // handle success
    //         console.log(response);
    //         alert('success - see your web browser developer console');
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //         alert('error - see your web browser developer console');
    //     });
}

function getHelloWorld_ClientSide_ServerSide() {
    axios.get('http://localhost:3000/helloworld')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}

function getDummyData_ClientSide_ServerSide_WebAPI() {
    axios.get('http://localhost:3000/dummy')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}

function getBasicData_ClientSide_ServerSide() {
    axios.get('http://localhost:3000/basic/data')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}

function getAdvanceData_ClientSide_ServerSide() {
    axios.get('http://localhost:3000/advance/data')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}

function getBasicResult_ClientSide_ServerSide() {
    axios.get('http://localhost:3000/basic/result')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}

function getAdvanceResult_ClientSide_ServerSide() {
    axios.get('http://localhost:3000/advance/result')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('success - see your web browser developer console');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert('error - see your web browser developer console');
        });
}



