// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder (in this case the folder is 'website')
app.use(express.static('website'));

// Creating a local server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on localhost: ${port}`);
}

// Setup Server
app.post('/addData', (request, response) => {
    const dayOptions = { year: 'numeric', month: 'short', day: 'numeric'};

    const city = request.body.name;
    const temperature = request.body.main.temp;
    const date = new Date(request.body.dt*1000).toLocaleDateString('dk-DK', dayOptions);
    const feelings = request.body.feelings;
    projectData = {city, date, temperature, feelings};

    console.log('POST received');
    response.send();
});

app.get('/getData', (request, response) => {
    console.log('GET received');
    response.send(projectData);
});