// Dependencies
const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  // GET
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  // POST
  app.post("/api/notes", (req, res) => {
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: Math.floor(Math.random() * 100000),
    };
    db.push(userNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
  });

  // DELETE
  app.delete("/api/notes/:id", (req, res) => {
    let db = JSON.parse(fs.readFileSync("db/db.json"));
    let deleteNotes = db.filter((item) => item.id !== parseInt(req.params.id));
    fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });
};
