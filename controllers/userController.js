const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Remove these console logs once you test and know everything works
    // before merging to main
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      fname: newUser.fname,
      lname: newUser.lname,
      email: newUser.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  // this console log too
  console.log("exports.signin -> req", req);
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
