import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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

export async function readDB() {
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
      settings: {}
    };
  }
}

export async function writeDB(data) {
  await acquireLock();
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
  } finally {
    releaseLock();
  }
}
