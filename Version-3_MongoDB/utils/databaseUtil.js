require("dotenv").config();
const { MongoClient } = require("mongodb");

const databaseName = process.env.MONGO_DB_NAME || "airbnb";

let client;
let db;
let connectionPromise;

const mongoConnect = async () => {
  if (db) {
    return db;
  }

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error(
      "MONGO_URL is missing. Please define your MongoDB connection string in the .env file."
    );
  }

  if (!connectionPromise) {
    client = new MongoClient(mongoUrl);
    connectionPromise = client
      .connect()
      .then(async () => {
        db = client.db(databaseName);
        try {
          await db.collection("favourite").createIndex({ houseId: 1 }, { unique: true });
        } catch (idxError) {
          console.warn("Notice: favourite index creation:", idxError.message);
        }
        console.log(`Connected to MongoDB database: ${databaseName}`);
        return db;
      })
      .catch(async (error) => {
        connectionPromise = null;
        if (client) {
          await client.close().catch(() => {});
          client = undefined;
        }
        throw error;
      });
  }

  return connectionPromise;
};

const getDB = () => {
  if (!db) {
    throw new Error("Database is not connected. Call mongoConnect() first.");
  }
  return db;
};

const closeDB = async () => {
  db = undefined;
  connectionPromise = null;
  if (client) {
    await client.close().catch(() => {});
    client = undefined;
  }
};

module.exports = { mongoConnect, getDB, closeDB };
