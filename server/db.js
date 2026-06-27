import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");

let writeLock = false;

async function acquireLock() {
  while (writeLock) {
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  writeLock = true;
}

function releaseLock() {
  writeLock = false;
}

const mongoUri = process.env.MONGODB_URI;
let mongoClient = null;
let mongoDb = null;

const COLLECTIONS = [
  "courses",
  "leads",
  "bookings",
  "users",
  "purchases",
  "services",
  "referrals",
  "testimonials",
  "settings",
  "logins"
];

async function getMongoClient() {
  if (!mongoUri) return null;
  if (mongoDb) return mongoDb;

  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(mongoUri);
      await mongoClient.connect();
      console.log("Connected to MongoDB successfully!");
    }
    mongoDb = mongoClient.db();
    return mongoDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB, falling back to local json storage.", error);
    return null;
  }
}

async function readLocalDB() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file, returning default structure", error);
    return {
      courses: [],
      leads: [],
      bookings: [],
      users: [],
      purchases: [],
      services: [],
      referrals: [],
      testimonials: [],
      settings: {},
      logins: []
    };
  }
}

async function writeLocalDB(data) {
  await acquireLock();
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
  } finally {
    releaseLock();
  }
}

export async function readDB() {
  const db = await getMongoClient();
  if (db) {
    try {
      const data = {};
      
      await Promise.all(
        COLLECTIONS.map(async (coll) => {
          if (coll === "settings") {
            const doc = await db.collection(coll).findOne({ id: "global" });
            data[coll] = doc ? doc.data : {};
          } else {
            const list = await db.collection(coll).find({}).toArray();
            data[coll] = list.map((item) => {
              const cleaned = { ...item };
              delete cleaned._id;
              return cleaned;
            });
          }
        })
      );

      // Check if MongoDB is empty (first run). If so, seed from db.json.
      const isEmpty = COLLECTIONS.every((coll) => {
        if (coll === "settings") {
          return Object.keys(data[coll]).length === 0;
        }
        return !data[coll] || data[coll].length === 0;
      });

      if (isEmpty) {
        console.log("MongoDB has no data. Seeding from local db.json...");
        const seedData = await readLocalDB();
        await writeDB(seedData);
        return seedData;
      }

      return data;
    } catch (error) {
      console.error("Error reading from MongoDB collections, falling back to db.json", error);
      return readLocalDB();
    }
  }

  return readLocalDB();
}

export async function writeDB(data) {
  const db = await getMongoClient();
  if (db) {
    try {
      await Promise.all(
        COLLECTIONS.map(async (coll) => {
          if (coll === "settings") {
            const settingsData = data[coll] || {};
            await db.collection(coll).replaceOne(
              { id: "global" },
              { id: "global", data: settingsData },
              { upsert: true }
            );
          } else {
            const list = data[coll] || [];
            await db.collection(coll).deleteMany({});
            if (list.length > 0) {
              const cleanList = list.map((item) => {
                const doc = { ...item };
                delete doc._id;
                return doc;
              });
              await db.collection(coll).insertMany(cleanList);
            }
          }
        })
      );
      // Keep local db.json updated as backup
      await writeLocalDB(data);
      return;
    } catch (error) {
      console.error("Error writing to MongoDB collections, falling back to db.json", error);
      await writeLocalDB(data);
      return;
    }
  }

  await writeLocalDB(data);
}
