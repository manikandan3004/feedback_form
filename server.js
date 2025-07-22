

const express = require("express");

const cors = require("cors");

const fs = require("fs");

const path = require("path");
 
const app = express();

const PORT = 3000;

const FILE_PATH = path.join(__dirname, "feedback.json");
 
app.use(cors());

app.use(express.json());
 
// Read existing feedback

app.get("/feedback", (req, res) => {

  const data = fs.existsSync(FILE_PATH) ? JSON.parse(fs.readFileSync(FILE_PATH)) : [];

  res.json(data);

});
 
// Add new feedback

app.post("/feedback", (req, res) => {

  const { name, message } = req.body;

  const newFeedback = { name, message };
 
  const data = fs.existsSync(FILE_PATH) ? JSON.parse(fs.readFileSync(FILE_PATH)) : [];

  data.push(newFeedback);

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
 
  res.status(201).json({ success: true });

});
 
app.listen(PORT, () => {

  console.log(`✅ Feedback backend running at http://localhost:${PORT}`);

});
 
 