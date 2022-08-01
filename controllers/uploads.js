const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send({ msg: "No files were uploaded." });
    return;
  }

  try {
    // Images only
    const name = await uploadFile(req.files, undefined, "images");
    // const name = await uploadFile(req.files, ["txt", "md"], "texts");
    res.json({ name });
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }
      break;
    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({ msg: "El producto no existe" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Collection not allowed" });
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.image = name;

  await model.save();

  res.json(model);
};

module.exports = {
  loadFile,
  updateImage,
};
