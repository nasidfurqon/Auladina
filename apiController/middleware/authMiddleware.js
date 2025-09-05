const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({
        success: false,
        message: "authorization failed: token not found",
      });
  }

  const token = bearerHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!(decoded.is_verified == 1 && decoded.is_verified_nip == 1)) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please verify first.",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
}

function verifyTokenNIP(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "authorization failed: token not found",
    });
  }

  const token = bearerHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.is_verified == 0) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please verify first.",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
}

module.exports = { verifyToken, verifyTokenNIP };
