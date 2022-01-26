// Imports
const models = require("../models");

// Get all users from DB
exports.getAllUsers = (req, res) => {
  models.User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// get one user from DB
exports.getOneUser = (req, res) => {
  models.User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "utilisateur non trouvé!" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue" })
    );
};
