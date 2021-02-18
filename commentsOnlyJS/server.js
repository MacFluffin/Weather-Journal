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
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
}

// Post
const data = [];

app.post('/addMovie', addMovie);

function addMovie(request, response) {
    data.push(request.body);

    // // The same as above!
    // const newEntry = {
    //     movie: request.body.movie,
    //     score: request.body.score
    // }
    // data.push(newEntry);

    console.log(`POST request received!`);
    response.send();
}

app.get('/getMovie', function (req, res) {
    res.send(data);
    console.log(data);
    console.log(`GET request received!`);
});