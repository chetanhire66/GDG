console.log("🔥 BACKEND SERVER.JS LOADED 🔥");

import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.resolve(__dirname, "urban_intelligence.db");

app.use(cors());
app.use(express.json());

/* ===========================
   DATABASE
=========================== */
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error("❌ DB error:", err.message);
  else console.log("✅ SQLite connected");
});

/* ===========================
   SCHEMA (AUTO)
=========================== */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ai_zones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      zone_name TEXT NOT NULL,
      ai_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(city, zone_name)
    )
  `);

  console.log("✅ DB schema verified");
});

/* ===========================
   HEALTH
=========================== */
app.get("/", (_, res) => {
  res.send("🚀 UrbanAI Backend running");
});

/* ===========================
   AUTH
=========================== */
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE"))
          return res.status(400).json({ error: "User exists" });
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, email });
    }
  );
});

app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;
  db.get(
    `SELECT id, name, email FROM users WHERE email=? AND password=?`,
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      res.json(user);
    }
  );
});

/* ===========================
   AI → ANALYZE → SAVE (ONCE)
=========================== */
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const aiRes = await fetch("http://localhost:5001/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    if (!aiRes.ok) throw new Error("AI engine offline");

    const aiData = await aiRes.json();
    const city = aiData.data.city;
    const zone = aiData.data.zones[0];

    db.run(
      `
      INSERT OR IGNORE INTO ai_zones (city, zone_name, ai_json)
      VALUES (?, ?, ?)
      `,
      [city, zone.zoneName, JSON.stringify(zone)],
      () => console.log(`✅ Stored: ${city} → ${zone.zoneName}`)
    );

    res.json({ success: true, data: aiData.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ===========================
   FETCH CITIES (FOR DROPDOWN)
=========================== */
app.get("/api/cities", (req, res) => {
  db.all(
    `SELECT DISTINCT city FROM ai_zones ORDER BY city`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(r => r.city));
    }
  );
});

/* ===========================
   FETCH ZONES (FOR UI CARDS)
=========================== */
app.get("/api/zones/:city", (req, res) => {
  const { city } = req.params;

  db.all(
    `
    SELECT zone_name, ai_json
    FROM ai_zones
    WHERE city=?
    ORDER BY created_at DESC
    `,
    [city],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length)
        return res.status(404).json({ error: "No zones found" });

      const zones = rows.map((row, i) => {
        const parsed = JSON.parse(row.ai_json);
        return {
          zoneId: i + 1,
          zoneName: row.zone_name,
          score: parsed.ai_analysis.development_potential.score,
          category: parsed.ai_analysis.zone_classification,
          tags: [parsed.ai_analysis.development_potential.builder_tag],
          sub_zones: [],
          investment_plans: [],
          ai_analysis: parsed.ai_analysis
        };
      });

      res.json({ city, zones });
    }
  );
});

/* ===========================
   START SERVER
=========================== */
app.listen(PORT, () => {
  console.log(`🚀 Backend running → http://localhost:${PORT}`);
});
