const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", usersGet);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    check("role").custom(async (role = "") => {
      const roleExist = await Role.findOne({ role });
      if (!roleExist) {
        throw new Error(`El rol ${role} no esta registado de la base de datos`);
      }
    }),
    validateFields,
  ],
  usersPost
);
router.put("/:id", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
