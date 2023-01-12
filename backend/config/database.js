const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "scheduler",
  connectionLimit: 10
});

module.exports = pool;
