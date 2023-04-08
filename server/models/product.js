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

// Add any additional functions related to the Product model here

module.exports = Product;
