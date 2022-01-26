// Imports
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

// signup function
exports.signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //  inputs verification
  if (
    email == null ||
    firstName == null ||
    lastName == null ||
    password == null
  ) {
    return res.status(400).json({ error: "il manque des paramètres!" });
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;

  if (!email.match(emailRegex)) {
    return res
      .status(400)
      .json({ message: "le format de votre email n'est pas valide!" });
  }

  //   Password REGEX: 8 char minimum,1 Digit,1 LC,1 UC
  if (!password.match(passwordRegex)) {
    return res
      .status(400)
      .json({ message: "le format du mot de passe n'est pas valable" });
  }

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
              return res.status(201).json({ newUser });
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

// Login function

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Inputs verification
  if (email == null || password == null) {
    return res.status(400).json({ error: "paramètres manquants!" });
  }

  models.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((valid) => {
          if (valid) {
            const token = jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.TOKEN,
              { expiresIn: "24h" }
            );
            res.status(200).json({ userId: user.id, token });
          } else {
            return res.status(401).json({ error: "mot de passe incorrect!" });
          }
        });
      } else {
        return res.status(401).json({ error: "cet utilisateur n'existe pas" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "impossible de vérifier cet utilisateur" })
    );
};
