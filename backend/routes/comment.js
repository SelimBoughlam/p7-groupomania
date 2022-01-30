const router = require("express").Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/:id", commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComments);
router.delete("/:messageId/:id", auth, commentCtrl.deleteComment);
module.exports = router;
