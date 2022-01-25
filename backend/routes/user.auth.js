// Imports

const router = require("express").Router();
const userAuthCtrl = require("../controllers/user.auth");

// routers

router.post("/signup", userAuthCtrl.signup);

module.exports = router;
