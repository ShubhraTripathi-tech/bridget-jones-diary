const fs = require('fs');
require("dotenv").config();

const db = require("./connect");


const path = require("path")
const sql = fs.readFileSync(path.join(__dirname, "diary.sql")).toString();

db.query(sql)
  .then(() => {
    console.log(" SQL executed successfully");
    db.end();
  })
  .catch(error => {
    console.error(" ERROR:", error);
  });