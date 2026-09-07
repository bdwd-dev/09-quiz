const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');
function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
  catch { return {}; }
}
function writeDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); }

// CRUD helper
function createCRUD(route, key) {
  app.get(`/api/${key}`, (req, res) => {
    const db = readDB();
    res.json(db[key] || []);
  });
  app.get(`/api/${key}/:id`, (req, res) => {
    const db = readDB();
    const item = (db[key] || []).find(i => i.id === Number(req.params.id));
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  });
  app.post(`/api/${key}`, (req, res) => {
    const db = readDB();
    if (!db[key]) db[key] = [];
    const newItem = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
    db[key].push(newItem);
    writeDB(db);
    res.status(201).json(newItem);
  });
  app.put(`/api/${key}/:id`, (req, res) => {
    const db = readDB();
    const idx = (db[key] || []).findIndex(i => i.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    db[key][idx] = { ...db[key][idx], ...req.body };
    writeDB(db);
    res.json(db[key][idx]);
  });
  app.delete(`/api/${key}/:id`, (req, res) => {
    const db = readDB();
    if (!db[key]) return res.status(404).json({ error: 'Not found' });
    db[key] = db[key].filter(i => i.id !== Number(req.params.id));
    writeDB(db);
    res.json({ success: true });
  });
}

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: '09-quiz' }));
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const stats = {};
  for (const k of Object.keys(db)) {
    if (Array.isArray(db[k])) stats[k] = db[k].length;
  }
  res.json(stats);
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`🚀 Quiz Gamifié backend on ${PORT}`));
