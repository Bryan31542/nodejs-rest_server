const { response } = require("express");
const { Category } = require("../models");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  // Revisar si existe la categoria
  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  // Generate data to save
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  // Saving in db
  await category.save();

  res.status(201).json(category);
};

module.exports = {
  createCategory,
};
