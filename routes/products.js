const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  categoryExistByID,
  productExistByID,
} = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", getProducts);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo Valido").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  getProduct
);

// Crear producto - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un ID de mongo").isMongoId(),
    check("category").custom(categoryExistByID),
    validateFields,
  ],
  createProduct
);

// Actualizar producto - privado - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validateJWT,
    //check("category", "No es un ID de mongo").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  updateProduct
);

// Eliminar categoria - admin
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID de Mongo Valido").isMongoId(),
    check("id").custom(productExistByID),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
