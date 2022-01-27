const router = require("express").Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/new", upload, messageCtrl.createMessage);
router.get("/all", auth, messageCtrl.getAllMessages);

module.exports = router;
