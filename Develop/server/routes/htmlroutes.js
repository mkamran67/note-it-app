// DEPENDENCIES
const path = require('path');

//  GET /notes - Should return the notes.html file.     ✅
//  GET * - Should return the index.html file           ✅

// ROUTING
module.exports = function (app) {
  // Notes page
  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // Main page
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
