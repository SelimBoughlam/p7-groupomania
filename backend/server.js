// Imports

const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
const userAuthRoutes = require("./routes/user.auth");
const userRoutes = require("./routes/user");

app.use(express.json());

app.use("/api/auth", userAuthRoutes);
app.use("/api/users", userRoutes);

// Serveur
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
