import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
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

let pool = null;

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

function getMySQLConfig() {
  const uri = process.env.MYSQL_URL || process.env.MYSQL_URI || process.env.DATABASE_URL;
  if (uri && (uri.startsWith("mysql://") || uri.startsWith("mysqls://"))) {
    return { uri };
  }
  
  const host = process.env.MYSQL_HOST || process.env.DB_HOST;
  const user = process.env.MYSQL_USER || process.env.DB_USER;
  const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD;
  const database = process.env.MYSQL_DATABASE || process.env.DB_DATABASE || process.env.DB_NAME;
  const port = process.env.MYSQL_PORT || process.env.DB_PORT || 3306;
  
  if (host && user && database) {
    const ssl = process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined;
    return {
      host,
      user,
      password,
      database,
      port: parseInt(port, 10),
      ssl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
  }
  
  return null;
}

const TABLE_SCHEMAS = {
  courses: `
    CREATE TABLE IF NOT EXISTS courses (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      institution VARCHAR(255),
      category VARCHAR(255),
      mode VARCHAR(255),
      duration VARCHAR(255),
      fees VARCHAR(255),
      budget VARCHAR(255),
      level VARCHAR(255),
      image VARCHAR(2048),
      overview TEXT,
      eligibility TEXT,
      highlights TEXT,
      students INT DEFAULT 0,
      instructor VARCHAR(255),
      status VARCHAR(255)
    )
  `,
  leads: `
    CREATE TABLE IF NOT EXISTS leads (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      email VARCHAR(255),
      service VARCHAR(255),
      date VARCHAR(255),
      status VARCHAR(255),
      notes TEXT
    )
  `,
  bookings: `
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(255) PRIMARY KEY,
      student VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      date VARCHAR(255),
      time VARCHAR(255),
      counsellor VARCHAR(255),
      status VARCHAR(255),
      notes TEXT
    )
  `,
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      role VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      password VARCHAR(255),
      goals TEXT,
      created_at VARCHAR(255),
      name VARCHAR(255),
      location VARCHAR(255),
      avatar VARCHAR(2048)
    )
  `,
  purchases: `
    CREATE TABLE IF NOT EXISTS purchases (
      id VARCHAR(255) PRIMARY KEY,
      student_name VARCHAR(255),
      student_email VARCHAR(255),
      course_id VARCHAR(255),
      course_title VARCHAR(255),
      amount INT,
      status VARCHAR(255),
      upi_txn_id VARCHAR(255),
      created_at VARCHAR(255)
    )
  `,
  services: `
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      status VARCHAR(255),
      icon VARCHAR(255)
    )
  `,
  referrals: `
    CREATE TABLE IF NOT EXISTS referrals (
      id VARCHAR(255) PRIMARY KEY,
      referrer VARCHAR(255),
      referred VARCHAR(255),
      reward INT,
      status VARCHAR(255),
      date VARCHAR(255)
    )
  `,
  testimonials: `
    CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      course VARCHAR(255),
      photo VARCHAR(2048),
      review TEXT,
      rating INT
    )
  `,
  settings: `
    CREATE TABLE IF NOT EXISTS settings (
      id VARCHAR(255) PRIMARY KEY,
      company TEXT,
      contact TEXT,
      social TEXT
    )
  `,
  logins: `
    CREATE TABLE IF NOT EXISTS logins (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255),
      name VARCHAR(255),
      date VARCHAR(255),
      timestamp BIGINT
    )
  `
};

const COLUMN_MAPPINGS = {
  courses: {
    columns: ["id", "title", "institution", "category", "mode", "duration", "fees", "budget", "level", "image", "overview", "eligibility", "highlights", "students", "instructor", "status"],
    mapItem: (item) => [
      item.id,
      item.title || "",
      item.institution || null,
      item.category || null,
      item.mode || null,
      item.duration || null,
      item.fees || null,
      item.budget || null,
      item.level || null,
      item.image || null,
      item.overview || null,
      item.eligibility || null,
      Array.isArray(item.highlights) ? JSON.stringify(item.highlights) : "[]",
      item.students !== undefined ? Number(item.students) : 0,
      item.instructor || null,
      item.status || null
    ],
    mapRow: (row) => {
      let highlights = [];
      if (Array.isArray(row.highlights)) {
        highlights = row.highlights;
      } else if (typeof row.highlights === "string") {
        try {
          highlights = JSON.parse(row.highlights);
        } catch (e) {
          highlights = [];
        }
      }
      return { ...row, highlights };
    }
  },
  leads: {
    columns: ["id", "name", "phone", "email", "service", "date", "status", "notes"],
    mapItem: (item) => [
      item.id,
      item.name || "",
      item.phone || null,
      item.email || null,
      item.service || null,
      item.date || null,
      item.status || null,
      item.notes || null
    ],
    mapRow: (row) => row
  },
  bookings: {
    columns: ["id", "student", "phone", "date", "time", "counsellor", "status", "notes"],
    mapItem: (item) => [
      item.id,
      item.student || "",
      item.phone || null,
      item.date || null,
      item.time || null,
      item.counsellor || null,
      item.status || null,
      item.notes || null
    ],
    mapRow: (row) => row
  },
  users: {
    columns: ["id", "role", "email", "phone", "password", "goals", "created_at", "name", "location", "avatar"],
    mapItem: (item) => [
      item.id,
      item.role || null,
      item.email || null,
      item.phone || null,
      item.password || null,
      item.goals || null,
      item.created_at || null,
      item.name || null,
      item.location || null,
      item.avatar || null
    ],
    mapRow: (row) => row
  },
  purchases: {
    columns: ["id", "student_name", "student_email", "course_id", "course_title", "amount", "status", "upi_txn_id", "created_at"],
    mapItem: (item) => [
      item.id,
      item.student_name || null,
      item.student_email || null,
      item.course_id || null,
      item.course_title || null,
      item.amount !== undefined ? Number(item.amount) : 0,
      item.status || null,
      item.upi_txn_id || null,
      item.created_at || null
    ],
    mapRow: (row) => row
  },
  services: {
    columns: ["id", "name", "description", "status", "icon"],
    mapItem: (item) => [
      item.id,
      item.name || null,
      item.description || null,
      item.status || null,
      item.icon || null
    ],
    mapRow: (row) => row
  },
  referrals: {
    columns: ["id", "referrer", "referred", "reward", "status", "date"],
    mapItem: (item) => [
      item.id,
      item.referrer || null,
      item.referred || null,
      item.reward !== undefined ? Number(item.reward) : 0,
      item.status || null,
      item.date || null
    ],
    mapRow: (row) => row
  },
  testimonials: {
    columns: ["id", "name", "course", "photo", "review", "rating"],
    mapItem: (item) => [
      item.id,
      item.name || null,
      item.course || null,
      item.photo || null,
      item.review || null,
      item.rating !== undefined ? Number(item.rating) : 5
    ],
    mapRow: (row) => row
  },
  logins: {
    columns: ["id", "email", "name", "date", "timestamp"],
    mapItem: (item) => [
      item.id,
      item.email || null,
      item.name || null,
      item.date || null,
      item.timestamp !== undefined ? Number(item.timestamp) : Date.now()
    ],
    mapRow: (row) => row
  }
};

async function initializeTables(dbPool) {
  try {
    for (const [table, query] of Object.entries(TABLE_SCHEMAS)) {
      await dbPool.query(query);
    }
    
    // Ensure new columns exist on users table
    try { await dbPool.query("ALTER TABLE users ADD COLUMN name VARCHAR(255)"); } catch (e) {}
    try { await dbPool.query("ALTER TABLE users ADD COLUMN location VARCHAR(255)"); } catch (e) {}
    try { await dbPool.query("ALTER TABLE users ADD COLUMN avatar VARCHAR(2048)"); } catch (e) {}
    
    // Check if the tables are empty. Seed from db.json if so.
    const [[{ count: courseCount }]] = await dbPool.query("SELECT COUNT(*) as count FROM courses");
    const [[{ count: userCount }]] = await dbPool.query("SELECT COUNT(*) as count FROM users");
    
    if (courseCount === 0 && userCount === 0) {
      console.log("MySQL tables are empty. Seeding from local db.json...");
      const seedData = await readLocalDB();
      await writeSQLDB(dbPool, seedData);
    }
  } catch (error) {
    console.error("Failed to initialize MySQL database tables:", error);
  }
}

async function getSQLPool() {
  if (pool) return pool;
  
  const config = getMySQLConfig();
  if (!config) return null;

  try {
    if (config.uri) {
      pool = mysql.createPool(config.uri);
    } else {
      pool = mysql.createPool(config);
    }
    // Test connection
    const conn = await pool.getConnection();
    conn.release();
    console.log("Connected to MySQL successfully!");
    
    await initializeTables(pool);
    return pool;
  } catch (error) {
    console.error("Failed to connect to MySQL, falling back to local json storage.", error);
    pool = null;
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
  if (process.env.VERCEL) {
    console.log("Running on Vercel: skipping local db.json write backup.");
    return;
  }
  await acquireLock();
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Local db.json write failed:", error);
  } finally {
    releaseLock();
  }
}

async function writeSQLDB(dbPool, data) {
  const conn = await dbPool.getConnection();
  try {
    await conn.beginTransaction();
    
    for (const coll of COLLECTIONS) {
      if (coll === "settings") {
        const settings = data[coll] || {};
        const companyStr = JSON.stringify(settings.company || {});
        const contactStr = JSON.stringify(settings.contact || {});
        const socialStr = JSON.stringify(settings.social || {});
        await conn.query(
          "REPLACE INTO settings (id, company, contact, social) VALUES ('global', ?, ?, ?)",
          [companyStr, contactStr, socialStr]
        );
      } else {
        const list = data[coll] || [];
        const mapping = COLUMN_MAPPINGS[coll];
        
        await conn.query(`DELETE FROM ${coll}`);
        
        if (list.length > 0 && mapping) {
          const values = list.map(mapping.mapItem);
          const query = `INSERT INTO ${coll} (${mapping.columns.join(", ")}) VALUES ?`;
          await conn.query(query, [values]);
        }
      }
    }
    
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    console.error("Failed transaction writing to MySQL:", error);
    throw error;
  } finally {
    conn.release();
  }
}

export async function readDB() {
  const dbPool = await getSQLPool();
  if (dbPool) {
    try {
      const data = {};
      
      await Promise.all(
        COLLECTIONS.map(async (coll) => {
          if (coll === "settings") {
            const [rows] = await dbPool.query("SELECT * FROM settings WHERE id = 'global'");
            if (rows && rows.length > 0) {
              const row = rows[0];
              data[coll] = {
                company: typeof row.company === "string" ? JSON.parse(row.company) : (row.company || {}),
                contact: typeof row.contact === "string" ? JSON.parse(row.contact) : (row.contact || {}),
                social: typeof row.social === "string" ? JSON.parse(row.social) : (row.social || {})
              };
            } else {
              data[coll] = {};
            }
          } else {
            const [rows] = await dbPool.query(`SELECT * FROM ${coll}`);
            const mapping = COLUMN_MAPPINGS[coll];
            data[coll] = rows.map(mapping.mapRow);
          }
        })
      );

      return data;
    } catch (error) {
      console.error("Error reading from MySQL, falling back to db.json", error);
      return readLocalDB();
    }
  }

  return readLocalDB();
}

export async function writeDB(data) {
  const dbPool = await getSQLPool();
  if (dbPool) {
    try {
      await writeSQLDB(dbPool, data);
      await writeLocalDB(data);
      return;
    } catch (error) {
      console.error("Error writing to MySQL, falling back to db.json", error);
      await writeLocalDB(data);
      return;
    }
  }

  await writeLocalDB(data);
}
