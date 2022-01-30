const models = require("../models");
const comment = require("../models/comment");

exports.createComment = (req, res) => {
  const comment = {
    comment: req.body.comment,
    userId: req.body.userId,
    messageId: req.params.id,
  };

  models.Comment.create(comment)

    .then(res.status(201).json({ message: "commentaire bien créé!" }))
    .catch((error) =>
      res.status(500).json({ message: "une erreur est surevenue!" })
    );
};
exports.getAllComments = (req, res) => {
  models.Comment.findAll({
    include: [
      { model: models.User, attributes: ["firstName", "lastName"] },
      { model: models.Message, attributes: ["content"] },
    ],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};
exports.getOneComment = (req, res) => {};

exports.deleteComment = (req, res) => {
  models.Comment.findOne({
    where: { id: req.params.id, messageId: req.params.messageId },
  })
    .then((comment) => {
      if (!comment) {
        return res
          .status(404)
          .json({ message: "ce commentaire n'existe pas!" });
      }
      if (req.auth.userId != comment.userId) {
        return res.status(403).json({ message: "non autorisé!" });
      }
      models.Comment.destroy({
        where: { id: req.params.id, messageId: req.params.messageId },
      })

        .then(res.status(201).json({ message: "commentaire supprimé!" }))
        .catch((error) =>
          res.status(500).json({ message: "une erreur est survenue!" })
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};
