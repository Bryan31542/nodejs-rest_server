const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const usersGet = (req = request, res = response) => {
  const { q, name = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    message: "get API - Controller",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Check if email exist
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.status(400).json({ msg: "El correo ya existe" });
  }

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Save in db
  await user.save();

  res.json({
    user,
  });
};

const usersPut = (req, res) => {
  const { id } = req.params;

  res.json({
    message: "put API - Controller",
    id,
  });
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
