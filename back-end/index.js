const express = require("express");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dbClient = require("./db"); // Import the database connection

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(bodyParser.json());

// database connection at startup
dbClient.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
  } else {
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        console.error("Error executing query", err.stack);
      } else {
        console.log("Connected to DB, current time:", result.rows[0].now);
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
