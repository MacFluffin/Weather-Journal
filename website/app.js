// Personal API Key for OpenWeatherMap API
const APIkey = '691412ffca2559221d7f67b4822eb245';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeatherData);

/* Function called by event listener */
function generateWeatherData() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    data = getWeatherData(zip, APIkey)
    .then((data) => {
        data.feelings = feelings;
        postData('/addData', data)
    })
    .then(() => getData('/getData'))
}

/* Function to GET Web API Data*/
const getWeatherData = async (zip, key = '') => {
    if(zip.length != 5) {
        window.alert('Your zip code needs to be 5 digits');
        return
    }

    const APIcall = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${key}`;
    
    // fetching data from API, converting to string, posting data, getting data and then updating UI
    const response = await fetch(APIcall)
    const data = await response.json();
    return data;
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
    const data = await response.json();

    document.getElementById('country').innerText = 'Uniteds States';
    document.getElementById('city').innerText = data.city;
    document.getElementById('date').innerText = data.date;
    document.getElementById('temp').innerText = `${data.temperature} C`;
    document.getElementById('feelingsrecall').innerText = data.feelings;
}