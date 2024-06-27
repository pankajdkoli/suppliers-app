const express = require("express");
const path = require("path");
const pool = require("../db");

const router = express.Router();

router.post("/supplierdoc", async (req, res) => {
  const { clientId } = req.body;

  // Debug logs to inspect incoming data
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  // Handle file upload
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  // Check if file is undefined or null
  if (!file) {
    console.error("File is undefined or null");
    return res.status(400).send("File is undefined or null.");
  }

  const fileName = `${clientId}_${file.name}`;
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Save file to server
  file.mv(filePath, async (err) => {
    if (err) {
      console.error("Error uploading file", err);
      return res.status(500).send(err);
    }

    // Insert file upload details into PostgreSQL
    const query =
      "INSERT INTO supplier_doc (user_id, file_name, file_path, uploaded_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *";
    const values = [clientId, file.name, filePath];

    try {
      const result = await pool.query(query, values);
      console.log("File upload details stored in database:", result.rows[0]);
      res.send("File uploaded successfully.");
    } catch (error) {
      console.error("Error storing file upload details in database", error);
      res.status(500).send("Error storing file upload details.");
    }
  });
});

module.exports = router;
