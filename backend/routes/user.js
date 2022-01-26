const router = require("express").Router();
const userCtrl = require("../controllers/user");

router.get("/all", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);

module.exports = router;
