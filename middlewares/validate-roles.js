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

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin previa validación del token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El usuario ${req.user.name} no tiene permisos para realizar esta acción, roles necesarios: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
