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

module.exports = {
  isRoleValid,
  emailExist,
};
