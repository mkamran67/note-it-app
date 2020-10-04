// DEPENDENCIES
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// GET /api/notes - Should read the db.json file and return all saved notes as JSON. ✅
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. ✅
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you’ll need to find a way to give each note a unique id when it’s saved. In order to delete a note, you’ll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file. ✅

// ROUTING
module.exports = function (app) {
  const file = '../db/db.json';

  // GET /api/notes
  app.get('/api/notes', (req, res) => {
    fs.readFile(file, (err, data) => {
      res.json(JSON.parse(data));
    });
  });

  // POST /api/notes
  app.post('/api/notes', (req, res) => {
    let notes = []; // Will hold previous data

    req.body.id = uniqid(); // Creates a unique ID

    // if file exists and/or empty/access
    fs.access(file, fs.constants.F_OK, (err) => {
      // If file doesn't exist ->
      if (err) {
        console.log(`${file} ${err} does not exist.`);
        fs.writeFile(file, req.body, (err) => {
          console.log(err);
        });
        res.send(`New File generated ${req.body}`);
      }
      // If file does exists ->
      else {
        // Get previous notes.
        fs.readFile(file, (err, data) => {
          // If file is empty
          if (data.length === 0) {
            let tempArr = [req.body];
            fs.writeFile(file, JSON.stringify(tempArr), (err) => {
              console.log('error', err);
            });
            res.send('Wrote to empty file.');
          }
          // If file has existing data
          else {
            // Read previous files
            notes = [...JSON.parse(data)];

            // Add new income note
            notes.push(req.body);

            // Write to file
            fs.writeFile(file, JSON.stringify(notes), (err) => {
              if (err) {
                console.log('error', err);
              }
            });

            res.send(notes);
          }
        });
      }
    });
  });
  // DELETE /api/notes/:id
  app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let wasDeleted = false;
    console.log(`Deleting -> `, req.params.id);

    // Check if file accessable
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
      } else {
        let notes = [];
        // Read Notes from DB
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            notes = [...JSON.parse(data)];

            // Filter out the given ID
            let newNoteSet = notes.filter((el) => {
              if (el.id === id) {
                wasDeleted = true;
                return;
              } else {
                return el;
              }
            });

            // Empty current file
            fs.writeFile(file, '', (err) =>
              err ? console.log(err) : console.log(`emptied file`)
            );

            // Write new notes
            fs.writeFile(file, JSON.stringify(newNoteSet), (err) => {
              if (err) {
                console.log('error', err);
              }
            });
          }
        });
      }
    });

    res.send(wasDeleted ? `Deleted ID: ${id}` : `Did not find ID: ${id}`);
  });
};
