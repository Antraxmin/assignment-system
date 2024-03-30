import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export default async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = process.env.MONGODB_URI;

  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    const client = new MongoClient(uri);

    await client.connect();
    console.log("Connected to MongoDB");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
}
