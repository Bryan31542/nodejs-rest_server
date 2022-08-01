const { Router } = require("express");
const { check } = require("express-validator");
const {
  loadFile,
  updateImage,
  showImage,
  updateImageCloudinary,
} = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");
const { validateFields, validateFileToUpload } = require("../middlewares");

const router = Router();

router.post("/", validateFileToUpload, loadFile);

router.put(
  "/:collection/:id",
  [
    validateFileToUpload,
    check("id", "Must be a mongo id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  // updateImage
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "Must be a mongo id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
