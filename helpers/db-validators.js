const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no esta registado de la base de datos`);
  }
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`El email: ${email} ya esta registrado`);
  }
};

const userExistByID = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con ID:${id} no existe`);
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  userExistByID,
};
