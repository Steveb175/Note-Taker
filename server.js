// Packages
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Add middleware for JSON
app.use(express.json());

// GET route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
