const models = require("../models");
const fs = require("fs");

// Create message
exports.createMessage = (req, res) => {
  const message = {
    userId: req.body.userId,
    content: req.body.content,
    image:
      req.body.content && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
  };

  models.Message.create(message)
    .then((result) => res.status(201).json({ result }))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// get all messages

exports.getAllMessages = (req, res) => {
  models.Message.findAll({
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: models.User,
        attributes: ["firstName", "lastName"],
      },
    ],
  })
    .then((messages) => res.status(200).json(messages))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// update a message
exports.updateMessage = (req, res) => {
  models.Message.findOne({ id: req.params.id })
    .then((message) => {
      if (!message) {
        res.status(400).json({ message: "ce message n'existe pas!" });
      }
      if (message.userId != req.auth.userId) {
        return res.status(403).json({ message: "requête non autorisée" });
      }
      const messageToUpadate = {
        content: req.body.content,
        image: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null,
      };
      const filename = message.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        models.Message.update(messageToUpadate, {
          where: { id: req.params.id, userId: req.auth.userId },
        })
          .then(res.status(200).json({ message: "message modifié!" }))
          .catch((error) => res.status(500).json("une erreur est survenue!"));
      });
    })

    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// delete a message
