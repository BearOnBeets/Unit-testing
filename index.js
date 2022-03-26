const express = require("express");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

app.use(authMiddleware);

app.get("/private", (req, res) => {
  res.status(200).json({ status: 200, message: "Successful authentication" });
});

app.get("/public", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: "This is a Public API.No AUTH needed" });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

module.exports = app;
