// Imports

const router = require("express").Router();
const userAuthCtrl = require("../controllers/user.auth");

// routers

router.post("/signup", userAuthCtrl.signup);
router.post("/login", userAuthCtrl.login);

module.exports = router;
