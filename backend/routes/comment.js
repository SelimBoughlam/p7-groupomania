const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/:messageId/comment/", auth, commentCtrl.createComment);
router.get("/comments", auth, commentCtrl.getAllComments);
router.get("/:messageId/comments/:id", auth, commentCtrl.getOneComment);
router.put("/:messageId/comments/:id", auth, commentCtrl.updateComment);
router.delete("/:messageId/comments/:id", auth, commentCtrl.deleteComment);
module.exports = router;
