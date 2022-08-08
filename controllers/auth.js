const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email }); // check if user exist

    if (!user) {
      // create new user
      const data = {
        name,
        email,
        password: ":p",
        picture,
        role: "USER_ROLE",
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    // if user in db
    if (!user.status) {
      return res.status(401).json({ msg: "Usuario inactivo" });
    }

    // generate token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    json.status(400).json({
      ok: false,
      msg: "Hubo un error, hable con el administrador, el token no se pudo validar",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { user } = req;

  const token = await generateJWT(user.id);

  res.json({
    user,
    token,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
