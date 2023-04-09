const { query } = require('../config/db');

const Product = {
  tableName: "Products",
  columns: {
    p_id: {
      type: "INTEGER",
      primaryKey: true,
    },
    p_name: {
      type: "CHAR(100)",
    },
    p_supp_id: {
      type: "INTEGER",
      foreignKey: {
        table: "Suppliers",
        column: "s_id",
      },
    },
    p_price: {
      type: "REAL",
    },
    p_quantity: {
      type: "INTEGER",
    },
  },
};

const createProduct = async (product) => {
  const sqlQuery = `
    INSERT INTO Products (p_name, p_supp_id, p_price, p_quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await query(sqlQuery, [
    product.p_name,
    product.p_supp_id,
    product.p_price,
    product.p_quantity,
  ]);
  return result.rows[0];
};

const getProduct = async (id) => {
  const sqlQuery = `
    SELECT * FROM Products
    WHERE p_id = $1;
  `;
  const result = await query(sqlQuery, [id]);
  return result.rows[0];
};

const updateProduct = async (id, product) => {
  const sqlQuery = `
    UPDATE Products
    SET p_name = $1, p_supp_id = $2, p_price = $3, p_quantity = $4
    WHERE p_id = $5
    RETURNING *;
  `;
  const result = await query(sqlQuery, [
    product.p_name,
    product.p_supp_id,
    product.p_price,
    product.p_quantity,
    id,
  ]);
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const sqlQuery = `
    DELETE FROM Products
    WHERE p_id = $1;
  `;
  await query(sqlQuery, [id]);
};

module.exports = {
  ...Product,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

