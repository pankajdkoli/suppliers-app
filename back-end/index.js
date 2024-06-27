const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dbClient = require("./db"); // Import the database connection
const path = require("path");
const fs = require("fs");

// Load environment variables from .env file
dotenv.config();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware.
app.use(bodyParser.json());
app.use(fileUpload());

// database connection at startup
dbClient.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client..", err.stack);
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

// Import routes
const uploadRoutes = require("./routes/auth");
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("server test api");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
