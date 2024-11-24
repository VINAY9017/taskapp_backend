const jwt = require("jsonwebtoken");
const authModel = require("../Model/authModel");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        status: "failed",
        message: "Access Denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Access Denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    const user = await authModel.findById(decoded.user_id);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "failed",
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: "Token has expired.",
      });
    }

    return res.status(500).json({
      status: "failed",
      message: "Authentication failed.",
      error: error.message,
    });
  }
};

module.exports = authenticateUser;
