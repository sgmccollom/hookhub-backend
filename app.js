const express = require('express');
const app = express();

// Connect to PG and Mongo
require("./database/mongo.js");
require("./database/pg.js").checkPGConnection();

const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.static('build'));

// Bins API
const binController = require("./controllers/bins.js");
app.use("/api/bins", binController);

// Requests API
const requestController = require("./controllers/requests.js");
app.use("/api/bins/:unique_string/requests", requestController);

// Gather API
const gatherRouter = require("./controllers/gather");
app.use("/gather", gatherRouter);

// Handle React Paths
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;