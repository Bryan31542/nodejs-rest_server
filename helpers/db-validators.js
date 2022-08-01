const { User, Role, Category, Product } = require("../models");

const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no esta registado de la base de datos`);
  }
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`El email: ${email} ya esta registrado`);
  }
};

const userExistByID = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con ID:${id} no existe`);
  }
};

const categoryExistByID = async (id = "") => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`La categoria con ID:${id} no existe`);
  }
};

const productExistByID = async (id = "") => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`El producto con ID:${id} no existe`);
  }
};

// Validate collections
const allowedCollections = (collection = "", collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`La coleccion ${collection} no esta permitida`);
  }
  return true;
};

module.exports = {
  isRoleValid,
  emailExist,
  userExistByID,
  categoryExistByID,
  productExistByID,
  allowedCollections,
};
