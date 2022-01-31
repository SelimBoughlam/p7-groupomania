const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/new", auth, upload, messageCtrl.createMessage);
router.get("/all", auth, messageCtrl.getAllMessages);
router.put("/:id", auth, upload, messageCtrl.updateMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
