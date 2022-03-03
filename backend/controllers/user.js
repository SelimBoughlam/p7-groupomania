// Imports
const models = require("../models");
const fs = require("fs");

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
      } else if (req.auth.userId != req.params.id) {
        return res.status(403).json({ message: "requête non autorisée!" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue" })
    );
};

// Modify user profile
exports.updateUser = (req, res) => {
  const updateUser = {
    profileImage: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  };
  if (req.auth.userId != req.params.id) {
    return res.status(403).json({ message: "requête non autorisée!" });
  } else {
    models.User.update(updateUser, { where: { id: req.params.id } })
      .then((update) => {
        res
          .status(200)
          .json({ message: "votre profil à été mis à jour", update });
      })
      .catch((error) =>
        res.status(500).json({ message: "une erreur est survenue" })
      );
  }
};

// Account Deletion
exports.deleteAccount = (req, res) => {
  if (req.auth.userId != req.params.id) {
    return res.status(403).json({ message: "requête non autorisée!" });
  } else {
    models.User.destroy({ where: { id: req.params.id } })
      .then((user) =>
        res.status(200).json({ message: "utilisateur supprimé!" })
      )
      .catch((error) =>
        res.status(500).json({ message: "une erreur est survenue!" })
      );
  }
};
