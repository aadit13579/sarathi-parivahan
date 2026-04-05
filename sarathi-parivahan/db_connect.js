require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI environment variable is not defined in .env");
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const db = client.db("SarathiParivahan");
    const users = db.collection("User");

    await users.insertOne({
    username: "aadit",
    passwordHash: "temp", // replace with bcrypt later
    applications: []
    });

    console.log("User inserted");
}
run().catch(console.dir);
