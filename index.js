const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const itemsApiRouter = require("./api/items");

const APP_PORT = 3005;

app.use(bodyParser.json());

itemsApiRouter(app, "incomeItems", "incomeItems");
itemsApiRouter(app, "expenseItems", "expenseItems");

app.listen(APP_PORT, () => {
  console.log(`app running on port ${APP_PORT}`);
});
