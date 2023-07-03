// Packages
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const dbNotes = require("./public/assets/js/dbnotes.js");

// Port
const PORT = process.env.PORT || 3001;

// Add middleware for JSON
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes for API and HTML
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
