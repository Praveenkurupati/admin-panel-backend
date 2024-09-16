const mongoose = require("mongoose");

async function connectToDatabase(databaseName) {
  const uri = `mongodb+srv://test:test@cluster0.kcnp3.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
  // const uri = `mongodb://127.0.0.1:27017/${databaseName}`;

  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

module.exports = connectToDatabase;
