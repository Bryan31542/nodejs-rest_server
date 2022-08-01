const { Router } = require("express");
const { check } = require("express-validator");
const { loadFile, updateImage } = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post("/", loadFile);

router.put(
  "/:collection/:id",
  [
    check("id", "Must be a mongo id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

module.exports = router;
