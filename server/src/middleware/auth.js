const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // Store decoded user information
    req.user = decoded;

    // Make user ID directly available to controllers
    req.userId = decoded.id || decoded._id || decoded.userId;

    if (!req.userId) {
      return res.status(401).json({
        message: "Invalid token: user ID not found",
      });
    }

    next();
  });
};

module.exports = {
  protect,
};