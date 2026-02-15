const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  // get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ errors: "Please Authenticate using valid token " });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();

  } catch (error) {
    res.status(401).json({ error: "Please Authenticate using valid token" });
  }
};

module.exports = fetchUser;
