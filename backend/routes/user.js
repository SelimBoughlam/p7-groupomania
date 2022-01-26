const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/all", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);

module.exports = router;
