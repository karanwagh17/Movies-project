const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req, res, next) => {
  let token = req.cookies.verificationToken;
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "plese login first" });
    }
    if (err || !decoded || !decoded.user || !decoded.user._id) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded.user;
    next();

  });


  
};
module.exports = Auth;
