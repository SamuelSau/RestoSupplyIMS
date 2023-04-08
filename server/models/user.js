const User = {
    tableName: "Users",
    columns: {
      u_id: {
        type: "INTEGER",
        primaryKey: true,
      },
      username: {
        type: "VARCHAR(30)",
        unique: true,
      },
      password: {
        type: "VARCHAR(20)",
      },
      first_name: {
        type: "CHAR(50)",
      },
      last_name: {
        type: "CHAR(50)",
      },
      job_title: {
        type: "BIT",
      },
    },
  };
  
  module.exports = User;
  
