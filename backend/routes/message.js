const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/new", upload, messageCtrl.createMessage);
router.get("/all", messageCtrl.getAllMessages);
router.put("/:id", auth, upload, messageCtrl.updateMessage);

module.exports = router;
