const express = require("express");
const ItemsService = require("../service/items");

const itemsApi = (app, route, collection) => {
  const router = express.Router();
  app.use(`/api/${route}`, router);
  const itemsService = new ItemsService();

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    let message = "";

    try {
      const items = await itemsService.getItems(collection, { tags });
      collection === "incomeItems"
        ? (message = "Income items retreived")
        : (message = "Expense items retreived");

      res.status(200).json({
        data: items,
        message: message,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:itemName", async (req, res, next) => {
    // const {tags} = req.query;
    const { itemName } = req.params;

    try {
      const item = await itemsService.getOneItem(collection, { itemName });
      res.status(200).json({
        data: item,
        message: "Item retreived",
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/newItem', async (req, res, next) => {
    const { body: itemData } = req
    console.log(req.body)
    try {
      const newItem = await itemsService.createItem(collection, { itemData })
      res.status(201).json({
        data: newItem,
        message: 'Item added'
      })
    } catch (error) {
      next(error)
    }
  })
};



module.exports = itemsApi;
