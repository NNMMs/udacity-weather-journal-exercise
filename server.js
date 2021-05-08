// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// Modules Dependencies
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log("Server listening on http://localhost:" + port);
});

//GET Route
app.get("/all", (req, res) => {
    res.send(projectData);
});

//Post Route
app.post("/store", (req, res) => {
    projectData["temperature"] = req.body.temperature;
    projectData["date"] = req.body.date;
    projectData["userResponse"] = req.body.feelings;
});