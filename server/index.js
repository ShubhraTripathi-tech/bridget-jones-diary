require("dotenv").config();
const app = require("./app");

const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
