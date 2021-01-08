const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/inex?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(
      MONGO_URI,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
    this.db_name = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          reject(error);
        }
        console.log("connected to mongodb");
        resolve(this.client.db(this.db_name));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  getOne(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, itemData) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(itemData);
      })
      .then((result) => result.insertedId);
  }

  update(collecion, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collecion(collecion)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collecion(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
