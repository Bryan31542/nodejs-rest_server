const Role = require("../models/role");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no esta registado de la base de datos`);
  }
};

module.exports = {
  isRoleValid,
};
