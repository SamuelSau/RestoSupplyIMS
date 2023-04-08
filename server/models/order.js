const { query } = require('../config/db');

const Order = {
  tableName: "Orders",
  columns: {
    o_id: {
      type: "INTEGER",
      primaryKey: true,
    },
    o_cust_id: {
      type: "INTEGER",
      foreignKey: {
        table: "Customers",
        column: "c_id",
      },
    },
    o_product_id: {
      type: "INTEGER",
      foreignKey: {
        table: "Products",
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
      type: "REAL",
    },
  },
};

const createOrder = async (order) => {
  const insertSql = `
    INSERT INTO Orders (o_cust_id, o_product_id, o_date, o_ship_date, o_price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [order.cust_id, order.product_id, order.date, order.ship_date, order.price];
  const result = await query(insertSql, values);

  return result.rows[0];
};

// Other query functions for the Orders table...

module.exports = {
  ...Order,
  createOrder,
  // Export other query functions...
};
