const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

// Configure the database connection
const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Check the database connection.
pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
