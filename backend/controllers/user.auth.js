// Imports
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// signup function
exports.signup = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    email == null ||
    firstName == null ||
    lastName == null ||
    password == null
  ) {
    return res.status(400).json({ error: "il manque des paramètres!" });
  }

  //   TODO vérifier la taille des pseudos et des regex

  models.User.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then((userFound) => {
      if (!userFound) {
        bcrypt.hash(password, 5, (err, bcryptedPassword) => {
          const newUser = models.User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: bcryptedPassword,
            isAdmin: 0,
          })
            .then((newUser) => {
              return res.status(201).json({ userId: newUser.id });
            })
            .catch((error) =>
              res.status(500).json({ message: "cannot add user!" })
            );
        });
      } else {
        return res.status(409).json({ message: "utilisateur existe déja" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
