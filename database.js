const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRESQL_NAME,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_NAME,
  password: process.env.POSTGRESQL_PASSWORD,
  port: 5432,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Postgresql Connected");
});

module.exports = pool;
