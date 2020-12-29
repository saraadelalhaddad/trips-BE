const bcrypt = require("bcrypt");
const { User, Profile } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      fname: newUser.firstName,
      lname: newUser.lastName,
      email: newUser.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    await Profile.create({ userId: newUser.id }); //Here creates empty profile
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

//fetch a user
exports.fetchUser = async (userId, next) => {
  try {
    const usera = await User.findByPk(userId);
    return usera;
  } catch (error) {
    next(error);
  }
};

/*get list of users*/
exports.usersList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    //  console.log("Users", users);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/* Update user*/
exports.userUpdate = async (req, res, next) => {
  try {
    const usera = await User.findByPk(req.user.id);
    // console.log("TCL: exports.userUpdate -> usera ", usera);

    await usera.update(req.body);
    console.log("TCL: exports.userUpdate -> req.body", req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
