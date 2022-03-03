const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);
router.post("/", [
  check("email", "El email no es válido").isEmail(),
],usersPost);
router.put("/:id", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
