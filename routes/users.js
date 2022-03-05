const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-roles");

const {
  isRoleValid,
  emailExist,
  userExistByID,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(emailExist),
    check("password", "La contraseña debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExistByID),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExistByID),
    validateFields,
  ],
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
