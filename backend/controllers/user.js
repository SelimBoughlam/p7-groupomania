// Imports
const models = require("../models");

// Get all users from DB
exports.getAllUsers = (req, res) => {
  models.User.findAll({
    attributes: { exclude: ["password", "isAdmin", "id"] },
  })
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// get one user from DB
exports.getOneUser = (req, res) => {};
