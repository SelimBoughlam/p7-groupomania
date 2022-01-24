// Imports
const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });

// Serveur

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
