const { query } = require('../config/db');

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

const createSupplier = async (supplier) => {
  const sqlQuery = `
    INSERT INTO Suppliers (s_name, s_phone, s_email, s_address)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await query(sqlQuery, [
    supplier.s_name,
    supplier.s_phone,
    supplier.s_email,
    supplier.s_address,
  ]);
  return result.rows[0];
};

const getSupplier = async (id) => {
  const sqlQuery = `
    SELECT * FROM Suppliers
    WHERE s_id = $1;
  `;
  const result = await query(sqlQuery, [id]);
  return result.rows[0];
};

const updateSupplier = async (id, supplier) => {
  const sqlQuery = `
    UPDATE Suppliers
    SET s_name = $1, s_phone = $2, s_email = $3, s_address = $4
    WHERE s_id = $5
    RETURNING *;
  `;
  const result = await query(sqlQuery, [
    supplier.s_name,
    supplier.s_phone,
    supplier.s_email,
    supplier.s_address,
    id,
  ]);
  return result.rows[0];
};

const deleteSupplier = async (id) => {
  const sqlQuery = `
    DELETE FROM Suppliers
    WHERE s_id = $1;
  `;
  await query(sqlQuery, [id]);
};

module.exports = {
  ...Supplier,
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
