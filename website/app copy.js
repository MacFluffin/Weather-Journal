// Personal API Key for OpenWeatherMap API
const APIkey = '691412ffca2559221d7f67b4822eb245';
const zip1 = '90210';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeatherData);

/* Function called by event listener */
function generateWeatherData() {
    const zip = document.getElementById('zip').value;
    const T2 = document.getElementById('feelings').value;
    getWeatherData(zip1, APIkey);
}

/* Function to GET Web API Data*/
const getWeatherData = async (zip, key = '') => {
    if(zip.length != 5) {
        window.alert('Your zip code needs to be 5 digits');
        return
    }

    const APIcall = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${key}`;
    
    // fetching data from API, converting to string, posting data, getting data and then updating UI
    await fetch(APIcall)
    .then((response) => {
        const data = response.json()
        return data;
    })
    .then((data) => {
        console.log(data);
        postData('/addData', data)
        .then(getData('/getData'));
    });
}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {
    await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data)
    });
}

/* Function to GET Project Data */
const getData = async (url = '') => { 

    const response = await fetch(url)
    
    try {
        const allData = await response.json();
        console.log(allData);
        // allData.forEach(element => {
        //     let movieToInsert = `<p>${element.movie}</p>`;
        //     document.getElementById('information').insertAdjacentHTML("beforeend", movieToInsert);
        // });
    }
    catch(error) {
        console.log('TEST');
        console.log(error);
    }

    // const response = await fetch(url)
    // .then(await response.json());
    // try {
    //     // Transform into JSON
    //     const allData = await response.json();
    //     console.log(allData);
    // }
    // catch(error) {
    //     console.log("error", error);
    //     // appropriately handle the error
    // }
}

/*
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data)
    })

    try {
        // const newData = await response.json();
        //console.log(newData);
        const newData = await response.text();
        console.log(response);
        //console.log(newData);
    } 
    catch(error) {
        console.log("error", error);
    }
}

const getData = async (url = '') => { 
    const response = await fetch(url);
    try {
        // Transform into JSON
        const allData = await response.json();
        console.log(allData);
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const updateUI = async () => {
    const response = await fetch('/getMovie')
    
    try {
        const allData = await response.json();
        allData.forEach(element => {
            let movieToInsert = `<p>${element.movie}</p>`;
            document.getElementById('information').insertAdjacentHTML("beforeend", movieToInsert);
        });
    }
    catch(error) {
        console.log('TEST');
        console.log(error);
    }
}

*/