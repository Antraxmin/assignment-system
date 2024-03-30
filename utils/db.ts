import { MongoClient } from "mongodb";

const URI: string | undefined = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    if (URI === undefined) {
      throw new Error("MONGODB_URI is undefined");
    }
    client = new MongoClient(URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  if (!global._mongoClientPromise) {
    if (URI === undefined) {
      throw new Error("MONGODB_URI is undefined");
    }
    client = new MongoClient(URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
