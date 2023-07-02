const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const User = require("../db/models/user");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.ststus(401).json({
      message: "Not authorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      res.ststus(401).json({
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
