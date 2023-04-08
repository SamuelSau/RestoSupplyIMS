const { query } = require('../config/db');

const User = {
	tableName: 'Users',
	columns: {
		u_id: {
			type: 'INTEGER',
			primaryKey: true,
		},
		email: {
			type: 'VARCHAR(30)',
			unique: true,
		},
		password: {
			type: 'VARCHAR(20)',
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

const findOne = async (email) => {
	const sqlQuery = `
      SELECT * FROM Users
      WHERE email = $1;
    `;

	const result = await query(sqlQuery, [email]);

	return result.rows[0];
};

module.exports = {
	...User,
	findOne,
};
