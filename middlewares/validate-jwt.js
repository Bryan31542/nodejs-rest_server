const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // read user from db
    const user = await User.findById(uid);

    // check if user exist
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Token no válido - Usuario no encontrado" });
    }

    // check if uid has status true
    if (!user.status) {
      res.status(401).json({ msg: "Token no válido - Usuario inactivo" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = {
  validateJWT,
};
