const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.cookie) {
      return res
        .status(401)
        .json({ message: "Unauthorized access detected", auth: false });
    }
    const token = req.headers.cookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded && decoded.exp < Date.now()) {
      res.clearCookie("Authorization");
      return res.status(400).json({
        auth: false,
        message: "Session expired, please log in again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, auth: false });
  }
};

module.exports = checkAuth;
