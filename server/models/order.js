const { query } = require('../config/db');

const Order = {
  tableName: "orders",
  columns: {
    o_id: {
      type: "INTEGER",
      primaryKey: true,
    },
    o_cust_id: {
      type: "INTEGER",
      foreignKey: {
        table: "customers",
        column: "c_id",
      },
    },
    o_product_id: {
      type: "INTEGER",
      foreignKey: {
        table: "products",
        column: "p_id",
      },
    },
    o_date: {
      type: "DATE",
    },
    o_ship_date: {
      type: "DATE",
    },
    o_price: {
      type: "NUMERIC(10,2)",
    },
  },
};

const createOrder = async (order) => {
  const insertSql = `
    INSERT INTO orders (o_cust_id, o_product_id, o_date, o_ship_date, o_price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [order.cust_id, order.product_id, order.date, order.ship_date, order.price];
  const result = await query(insertSql, values);

  return result.rows[0];
};

const getOrder = async (orderId) => {
  const selectSql = `
    SELECT * FROM orders
    WHERE o_id = $1;
  `;

  const values = [orderId];
  const result = await query(selectSql, values);

  return result.rows[0];
};

const updateOrder = async (orderId, updatedOrderData) => {
  const updateSql = `
    UPDATE orders
    SET o_cust_id = $1, o_product_id = $2, o_date = $3, o_ship_date = $4, o_price = $5
    WHERE o_id = $6
    RETURNING *;
  `;

  const values = [
    updatedOrderData.cust_id,
    updatedOrderData.product_id,
    updatedOrderData.date,
    updatedOrderData.ship_date,
    updatedOrderData.price,
    orderId,
  ];

  const result = await query(updateSql, values);

  return result.rows[0];
};

const deleteOrder = async (orderId) => {
  const deleteSql = `
    DELETE FROM orders
    WHERE o_id = $1;
  `;

  const values = [orderId];
  await query(deleteSql, values);
};

//Retrieve all orders
const getOrders = async () => {
  const selectSql = `
    SELECT * FROM orders;
  `;

  const result = await query(selectSql);

  return result.rows;
};


module.exports = {
  ...Order,
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
