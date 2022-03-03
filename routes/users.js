const { Router } = require("express");
const { check } = require("express-validator");

const {
  isRoleValid,
  emailExist,
  userExistByID,
} = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

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
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
