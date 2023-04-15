const { query } = require('../config/db');

const Product = {
  tableName: "products",
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
        table: "suppliers",
        column: "s_id",
      },
    },
    p_price: {
      type: "NUMERIC(10,2)",
    },
    p_quantity: {
      type: "INTEGER",
    },
  },
};

const createProduct = async (product) => {
  const sqlQuery = `
    INSERT INTO products (p_name, p_supp_id, p_price, p_quantity)
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
    SELECT * FROM products
    WHERE p_id = $1;
  `;
  const result = await query(sqlQuery, [id]);
  return result.rows[0];
};

const getProducts = async () => {
  const sqlQuery = `
    SELECT * FROM products;
  `;
  const result = await query(sqlQuery);
  return result.rows;
};

const updateProduct = async (id, product) => {
  const sqlQuery = `
    UPDATE products
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
  // Delete all related records from the orders table
  const deleteOrdersSql = `
    DELETE FROM orders
    WHERE o_product_id = $1;
  `;
  await query(deleteOrdersSql, [id]);

  // Then, delete the product itself
  const deleteProductSql = `
    DELETE FROM products
    WHERE p_id = $1;
  `;
  await query(deleteProductSql, [id]);
};


module.exports = {
  ...Product,
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

