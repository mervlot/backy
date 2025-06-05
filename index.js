const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { dirname } = require("path");
const { fileURLToPath } = require("url");
dotenv.config;
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/auth.js");

const app = express();

const jsonData = () => {
  const files = ["Alert.json" /*, "Modal.json"*/];
  let combined = [];
  let content = fs.readFileSync(path.join(__dirname, "data", "Alert.json"));
  let data = JSON.parse(content);

  for (let file of files) {
  const content = fs.readFileSync(path.join(__dirname, "data", file));

    const data = JSON.parse(content);
    console.log(data);
    combined = data;

  }
  return combined;
};

//Middle ware
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(bodyParser.json());
// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`live at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/search", (req, res) => {
  const { q = "", category = "", page = 1 } = req.query;
  // const data = JSON.parse(fs.readFileSync('./data.json'));
  const data = jsonData();
  console.log(data);

  const filterd = data.filter((item) => {
    const matchQuery =
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.author.toLowerCase().includes(q.toLowerCase()) ||
      item.description.toLowerCase().includes(q.toLowerCase());

    const matchCategory = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchQuery && matchCategory;
  });

  const pageSize = 5;
  const paginated = filterd.slice((page - 1) * pageSize, page * pageSize);

  res.json({
    total: filterd.lenght,
    page: parseInt(page),
    perPage: pageSize,
    results: paginated,
  });
});
app.listen(3000, console.log("live"));
