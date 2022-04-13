const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");

const { createCategory } = require("../controllers/categories");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

// Obtener una categoria por id - publico
router.get("/:id", (req, res) => {
  res.json("get - id");
});

// Crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Eliminar categoria - admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
