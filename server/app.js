const express = require("express");
const app = express();
const cors = require("cors");
const diaryRouter = require("./routes/diaries");

app.use(cors());
app.use(express.json());
app.use("/api/diaries", diaryRouter);

module.exports = app;
