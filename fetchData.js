const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.URL || "mongodb://127.0.0.1:27017/CHAT/messages";

mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  const fetchData = async () => {
    try {
      const collections = await db.db.listCollections().toArray();
      const data = {};

      for (const collection of collections) {
        const collectionName = collection.name;
        const collectionData = await db
          .collection(collectionName)
          .find({})
          .toArray();
        data[collectionName] = collectionData;
      }
      fs.writeFileSync("dbChat.json", JSON.stringify(data, null, 2));

      console.log("Data written to dbChat.json");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      mongoose.connection.close();
    }
  };

  fetchData();
});
