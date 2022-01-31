const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

// Token verification Middleware
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "user Id non valable!";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "requête non authorisée!" });
  }
};
