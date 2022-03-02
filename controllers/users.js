const { response, request } = require("express");

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

const usersPost = (req, res) => {
  const { name, age } = req.body;

  res.json({
    message: "post API - Controller",
    name,
    age,
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
