// Imports

const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
const userAuthRoutes = require("./routes/user.auth");

app.use(express.json());

app.use("/api/auth", userAuthRoutes);

// Serveur
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
