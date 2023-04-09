const { query } = require('../config/db');

const User = {
	tableName: 'users',
	columns: {
		u_id: {
			type: 'INTEGER',
			primaryKey: true,
		},
		email: {
			type: 'VARCHAR(200)',
			unique: true,
		},
		password: {
			type: 'VARCHAR(32)',
		},
		first_name: {
			type: 'CHAR(50)',
		},
		last_name: {
			type: 'CHAR(50)',
		},
		job_title: {
			type: 'BIT',
		},
	},
};

const createUser = async (user) => {
	const sqlQuery = `
    INSERT INTO users (u_email, u_password, first_name, last_name, job_title)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
	const result = await query(sqlQuery, [
		user.email,
		user.password,
		user.first_name,
		user.last_name,
		user.job_title,
	]);
	return result.rows[0];
};

const getUser = async (identifier) => {
	const isEmail = identifier.includes('@');
	const sqlQuery = `
	  SELECT * FROM users
	  WHERE ${isEmail ? 'u_email' : 'u_id'} = $1;
	`;
	const result = await query(sqlQuery, [identifier]);
  
	return result.rows[0];
  };
  

const updateUser = async (id, user) => {
	const sqlQuery = `
    UPDATE Users
    SET u_email = $1, u_password = $2, first_name = $3, last_name = $4, job_title = $5
    WHERE u_id = $6
    RETURNING *;
  `;
	const result = await query(sqlQuery, [
		user.email,
		user.password,
		user.first_name,
		user.last_name,
		user.job_title,
		id,
	]);
	return result.rows[0];
};

const deleteUser = async (id) => {
	const sqlQuery = `
    DELETE FROM Users
    WHERE u_id = $1;
  `;
	await query(sqlQuery, [id]);
};

module.exports = {
	...User,
	createUser,
	getUser,
	updateUser,
	deleteUser,
};
