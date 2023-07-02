const User = require("../db/models/user");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "This email already exists",
      });
      return;
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, avatarURL, password });
    await newUser.hashPassword(password);
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, { token });
    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Your email or password is wrong",
      });
      return;
    }
    const comparePassword = await user.comparePassword(password);
    console.log(comparePassword);
    if (!comparePassword) {
      res.status(401).json({
        message: "Your email or password is wrong",
      });
      return;
    }
    const payload = {
      id: user._id,
    };
    const { name, avatarURL } = user;
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const current = async (req, res, next) => {
  const { name, email, avatarURL } = req.user;
  res.status(200).json({
    name,
    email,
    avatarURL,
  });
};

module.exports = {
  signup,
  login,
  logout,
  current,
};
