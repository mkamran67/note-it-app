const express = require('express');
// const uniqid = require('uniqid'); // Generates random IDS
// const fs = require('fs');

const app = express(); // ExpressJS declaration
// const file = '../db/db.json';

// app.use(express.static(__dirname + '../public')); //

// Port
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
require('./routes/apiroutes')(app);
// HTML Routes
require('./routes/htmlroutes')(app);

// Listening
app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});
