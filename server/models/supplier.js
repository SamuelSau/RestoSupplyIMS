const Supplier = {
    tableName: "Suppliers",
    columns: {
      s_id: {
        type: "INTEGER",
        primaryKey: true,
      },
      s_name: {
        type: "CHAR(100)",
      },
      s_phone: {
        type: "INTEGER(10)",
      },
      s_email: {
        type: "VARCHAR(200)",
      },
      s_address: {
        type: "VARCHAR(300)",
      },
    },
  };
  
  module.exports = Supplier;
  