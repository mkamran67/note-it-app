const express = require('express');
const uniqid = require('uniqid'); // Generates random IDS

const app = express(); // ExpressJS declaration

// Port
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -> API Routes

// // GET /api/notes
// app.get('/api/notes', async function (req, res) {
//   let rawData = await fs.readFile('../db/db.json');
//   let list = await JSON.parse(rawData);
//   //   console.log(list);
//   res.send(list);
// });

// POST /api/notes
// app.post('/api', function (req, res) {
//   res.send('Welcome to the Star Wars Page!');
// });

// // DELETE /api/notes/:id
// app.delete('/api/notes/:id', function (req, res) {
//   res.send('Welcome to the Star Wars Page!');
// });

// function readDB() {}

// API Routes
require('./routes/apiroutes')(app);
// HTML Routes
require('./routes/htmlroutes')(app);

// Listening
app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});
