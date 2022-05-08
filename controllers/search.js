const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowedCollections = ["products", "categories", "users", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term); // true

  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  return res.json({ results: users });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "products":
      break;
    case "categories":
      break;

    default:
      res.status(500).json({
        msg: "Error al buscar",
      });
  }
};

module.exports = {
  search,
};
