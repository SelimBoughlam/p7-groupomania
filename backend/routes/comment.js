const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/new", auth, commentCtrl.createComment);
router.get("/all", auth, commentCtrl.getAllComments);
router.get("/:id/messages/:messageId", auth, commentCtrl.getOneComment);
router.delete("/:id/messages/:messageId", auth, commentCtrl.deleteComment);
module.exports = router;
