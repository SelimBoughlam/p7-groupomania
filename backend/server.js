// Imports
const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
const userAuthRoutes = require("./routes/user.auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const path = require("path");

// body parser from express
app.use(express.json());

// static path for images folder
app.use("/images", express.static(path.join(__dirname, "images")));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routers
app.use("/api/auth", userAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/messages", commentRoutes);

// Serveur
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
