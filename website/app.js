/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f5c2eb57685b927c5225b984209ba8f0";
const units = "metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById("generate").addEventListener("click", function (event) {
    const zipCode = document.getElementById("zip").value;
    if (!zipCode)
        alert("Please, insert a zip-code");
    else {
        getWeather(baseURL, zipCode, apiKey)
            .then((weatherFields) => {
                postWeather("/store", {
                    temperature: weatherFields.main.temp,
                    date: newDate,
                    feelings: document.getElementById("feelings").value
                })
            })
            .then(() => {
                updateUI();
            });
    }
});



const getWeather = async (baseURL, zipCode, apiKey) => {
    //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    const api = `${baseURL}?zip=${zipCode}&appid=${apiKey}&units=${units}`;
    const response = await fetch(api);
    try {
        const weatherData = await response.json();
        if (weatherData.cod !== 200) {
            throw new Error("Invalid Zip-code");
        }
        return weatherData;
    } catch (error) {
        console.log("error : " + error);
        alert("Please, Insert a valid USA ZipCode");
        return;
    }
};

const postWeather = async (url = "", data = {}) => {
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        return;
    } catch (error) {
        console.log("error : " + error);
    }
}

const updateUI = async () => {
    const response = await fetch("/all");
    try {
        const data = await response.json();
        document.getElementById("temp").innerHTML = `Temperature : ${data.temperature} °C`;
        document.getElementById("date").innerHTML = `Date : ${data.date}`;
        document.getElementById("content").innerHTML = `Feeling : ${data.userResponse !== "" ? data.userResponse : "N/A"}`;
  
    } catch (error) {
        console.log("error : " + error);
    }
};
