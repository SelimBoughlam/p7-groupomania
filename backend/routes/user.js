const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/all", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, upload, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteAccount);

module.exports = router;
