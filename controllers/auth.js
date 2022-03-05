const { response } = require("express");

const login = (req, res = response) => {
  res.json({
    msg: "Login OK",
  });
};

module.exports = {
  login,
};
