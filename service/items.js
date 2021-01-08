const MongoLib = require("../mongo/mongoLib");

class ItemsService {
  constructor() {
    this.mongoDB = new MongoLib();
  }

  async getItems(collection, { tags }) {
    const query = tags && { tags: { $in: tags } };

    const incomeItems = await this.mongoDB.getAll(collection, query);
    return incomeItems || [];
  }

  async getOneItem(collection, { itemId }) {
    const incomeItem = await this.mongoDB.getOne(collection, itemId);
    return incomeItem || {};
  }

  async createItem(collection, { itemData }) {
    const createItem = await this.mongoDB.create(collection, itemData);
    return createItem;
  }

  async updateItem(collection, { itemId, data }) {
    const updatedItem = await this.mongoDB.update(collection, itemId, data);
    return updatedItem;
  }

  async deleteItem(collection, { itemId }) {
    const deletedItem = await this.mongoDB.delete(collection, itemId);
    return deletedItem;
  }
}

module.exports = ItemsService;
