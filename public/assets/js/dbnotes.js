// Packages
const dbnotes = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");

// JSON Parse
dbNotes.use(bodyParser.json());

// GET requests to /api/notes
dbNotes.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading");
    }
    res.json(JSON.parse(data));
  });
});

// POST requests to /api/notes
dbNotes.post("/api/notes", (req, res) => {
  if (!req.body) {
    res.status(400).send("Error - Invalid req");
    return;
  }
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error writing");
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing");
        } else {
          res.send("Success!");
        }
      }
    );
  });
});

module.exports = dbNotes;
