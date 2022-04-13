const { response } = require("express");
const { Category } = require("../models");

// Get categories - paginate - total - populate
const getCategories = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .limit(Number(limit))
      .skip(Number(skip)),
  ]);

  res.json({
    total,
    categories,
  });
};

// Get category - populate {}
const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

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

// Update category
const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(category);
};

//  Delete category - status:false
const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const categoryDB = await Category.findByIdAndUpdate(
    id,
    { status: false },
    {
      new: true,
    }
  );

  res.json(categoryDB);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
