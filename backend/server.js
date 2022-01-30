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

// Routers
app.use("/api/auth", userAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentRoutes);

// Serveur
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
