const models = require("../models");

exports.createComment = (req, res) => {
  const comment = {
    comment: req.body.comment,
    userId: req.auth.userId,
    messageId: req.params.messageId,
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
exports.getOneComment = (req, res) => {
  models.Comment.findOne({
    where: {
      id: req.params.id,
      messageId: req.params.messageId,
    },
  })
    .then((comment) => {
      if (!comment) {
        return res
          .status(404)
          .json({ message: "ce commentaire n'existe pas!" });
      } else {
        return res.status(200).json(comment);
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

exports.updateComment = (req, res) => {
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
        console.log(comment.userId);
        return res.status(403).json({ message: "requête non autorisée" });
      }
      const updatedComment = {
        comment: req.body.comment,
      };
      models.Comment.update(updatedComment, {
        where: { id: req.params.id, messageId: req.params.messageId },
      })
        .then(() => res.status(200).json({ message: "commentaire modifié!" }))
        .catch((error) =>
          res.status(500).json({ message: "une erreur est survenue!" })
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};

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
      if (req.auth.userId == comment.userId || req.auth.isAdmin === true) {
        models.Comment.destroy({
          where: { id: req.params.id, messageId: req.params.messageId },
        })

          .then(res.status(201).json({ message: "commentaire supprimé!" }))
          .catch((error) =>
            res.status(500).json({ message: "une erreur est survenue!" })
          );
      } else {
        return res.status(403).json({ message: "requête non autorisée!" });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "une erreur est survenue!" })
    );
};
