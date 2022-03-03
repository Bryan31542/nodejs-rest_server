const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, skip } = req.query;
  const users = await User.find().limit(Number(limit)).skip(Number(skip));

  res.json({
    users,
  });
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Save in db
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...info } = req.body;

  // Validate againt schema
  if (password) {
    const salt = bcrypt.genSaltSync();
    info.password = bcrypt.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, info);

  res.json(userDB);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
