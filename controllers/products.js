const { response } = require("express");
const { body } = require("express-validator");
const { Product } = require("../models");

// Get products - paginate - total - populate
const getProducts = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .limit(Number(limit))
      .skip(Number(skip)),
  ]);

  res.json({
    total,
    products,
  });
};

// Get product - populate {}
const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { status, user, ...info } = req.body;

  // Revisar si existe la categoria
  const productDB = await Product.findOne({ name: info.name });

  if (productDB) {
    return res.status(400).json({
      msg: `La el producto ${productDB.name}, ya existe`,
    });
  }

  // Generate data to save
  const data = {
    ...info,
    name: info.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  // Saving in db
  await product.save();

  res.status(201).json(product);
};

// Update category
const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(product);
};

//  Delete category - status:false
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { status: false },
    {
      new: true,
    }
  );

  res.json(productDeleted);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
