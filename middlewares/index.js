const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateFileToUpload = require("../middlewares/validate-file");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
  ...validateFileToUpload,
};
