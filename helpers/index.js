const dbValidators = require("./db-validators");
const generateJWT = require("./generate-jwt");
const googleVerify = require("./google-verify");
const uploadeFile = require("./upload-file");

module.exports = {
  // se expanden los contenidos
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...uploadeFile,
};
