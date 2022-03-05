const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin previa validación del token",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${name} no es administrador`,
    });
  }

  next();
};

module.exports = {
  isAdminRole,
};
