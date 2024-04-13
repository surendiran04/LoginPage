const jwt = require("jsonwebtoken");

const role = "User";

function ProductShield(req, res, next) {
  if (req.headers.token) {
    try {
      const token = jwt.verify(
        req.headers.token,
        process.env.secretKey
      );
      if (token.roles && token.roles.indexOf(role) > -1) {
        next();
      } else {
        return res.status(401).json({
          message: "You are not authorized to access this resource",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Token Expired. Please login to continue",
      });
    }
  } else
    return res.status(401).json({
      message: "Please login to continue",
    });
}

module.exports = ProductShield;