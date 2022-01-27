const models = require("../models");

// Create message
exports.createMessage = (req, res) => {
  const messages = {
    userId: req.body.userId,
    content: req.body.content,
    profileImage: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  };

  models.Message.create(messages)
    .then((result) => res.status(201).json({ result }))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

// get all messages

exports.getAllMessages = (req, res) => {
  models.Message.findAll()
    .then((messages) => res.status(200).json(messages))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};
