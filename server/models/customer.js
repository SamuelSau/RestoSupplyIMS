const { query } = require('../config/db');

const Customer = {
	tableName: 'customers',
	columns: {
		c_id: {
			type: 'INTEGER',
			primaryKey: true,
		},
		c_name: {
			type: 'CHAR(100)',
		},
		c_phone: {
			type: 'BIGINT',
		},
		c_email: {
			type: 'VARCHAR(200)',
		},
		c_address: {
			type: 'VARCHAR(300)',
		},
	},
};

const createCustomer = async (customer) => {
	const sqlQuery = `
    INSERT INTO customers (c_name, c_phone, c_email, c_address)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
	const result = await query(sqlQuery, [
		customer.c_name,
		customer.c_phone,
		customer.c_email,
		customer.c_address,
	]);
	return result.rows[0];
};

const getCustomer = async (id) => {
	const sqlQuery = `
    SELECT * FROM customers
    WHERE c_id = $1;
  `;
	const result = await query(sqlQuery, [id]);
	return result.rows[0];
};

const getAllCustomers = async () => {
	const sqlQuery = `
    SELECT * FROM customers;
  `;
	const result = await query(sqlQuery);
	return result.rows;
};

const updateCustomer = async (id, customer) => {
	const sqlQuery = `
    UPDATE customers
    SET c_name = $1, c_phone = $2, c_email = $3, c_address = $4
    WHERE c_id = $5
    RETURNING *;
  `;
	const result = await query(sqlQuery, [
		customer.c_name,
		customer.c_phone,
		customer.c_email,
		customer.c_address,
		id,
	]);
	return result.rows[0];
};

const deleteCustomer = async (id) => {
	const sqlQuery = `
    DELETE FROM customers
    WHERE c_id = $1;
  `;
	await query(sqlQuery, [id]);
};

module.exports = {
	...Customer,
	createCustomer,
	getCustomer,
	getAllCustomers,
	updateCustomer,
	deleteCustomer,
};
