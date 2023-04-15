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
    INSERT INTO orders (o_id, o_cust_id, o_product_id, o_date, o_ship_date, o_price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [order.o_id, order.o_cust_id, order.o_product_id, order.o_date, order.o_ship_date, order.o_price];
  console.log(values)
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

  const result = await query(updateSql, [updatedOrderData.o_cust_id,
    updatedOrderData.o_product_id,
    updatedOrderData.o_date,
    updatedOrderData.o_ship_date,
    updatedOrderData.o_price,
    orderId]);

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
