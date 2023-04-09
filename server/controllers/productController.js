const Product = require('../models/product');

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await Product.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProductData = req.body;
    const updatedProduct = await Product.updateProduct(id, updatedProductData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
