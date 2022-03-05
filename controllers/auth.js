const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // check if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Usuario | Contraseña incorrectas - Email" });
    }

    // check if users exist
    if (!user.status) {
      return res.status(400).json({ msg: "Usuario inactivo" });
    }

    // check if password is correct
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario | Contraseña incorrectas - Password" });
    }

    // generate token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hubo un error, hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
