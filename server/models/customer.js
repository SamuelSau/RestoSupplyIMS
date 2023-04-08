const Customer = {
    tableName: "Customers",
    columns: {
      c_id: {
        type: "INTEGER",
        primaryKey: true,
      },
      c_name: {
        type: "CHAR(100)",
      },
      c_phone: {
        type: "INTEGER(10)",
      },
      c_email: {
        type: "VARCHAR(200)",
      },
      c_address: {
        type: "VARCHAR(300)",
      },
    },
  };
  
  module.exports = Customer;
  