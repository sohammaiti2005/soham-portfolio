// Database setup: creates tables (if they don't exist) and seeds them with
// starter/placeholder data the first time the server runs.
 
const path = require('path');
const Database = require('better-sqlite3');
 
const db = new Database(path.join(__dirname, 'portfolio.db'));
db.pragma('journal_mode = WAL');
 
db.exec(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    pct INTEGER NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
 
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL,
    metric TEXT,
    link TEXT DEFAULT '#',
    sort_order INTEGER NOT NULL DEFAULT 0
  );
 
  CREATE TABLE IF NOT EXISTS timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ts TEXT NOT NULL,
    title TEXT NOT NULL,
    org TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
 
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);
 
// Seed only if empty, so re-starting the server never duplicates or wipes your edits.
const seedIfEmpty = (table, rows, insertSql) => {
  const count = db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c;
  if (count === 0) {
    const insert = db.prepare(insertSql);
    const insertMany = db.transaction((items) => {
      for (const item of items) insert.run(...item);
    });
    insertMany(rows);
    console.log(`[db] Seeded ${table} with ${rows.length} rows.`);
  }
};
 
seedIfEmpty(
  'skills',
  [
    ['Python', 80, 1],
    ['SQL', 85, 2],
    ['Power BI', 75, 3],
    ['Excel', 88, 4],
    ['Statistics', 70, 5],
    ['Data Visualization', 78, 6],
  ],
  'INSERT INTO skills (name, pct, sort_order) VALUES (?, ?, ?)'
);
 
seedIfEmpty(
  'projects',
  [
    [
      '001',
      'HR Analytics Dashboard',
      'Power BI dashboard analyzing employee attrition drivers — built to help identify the factors behind employee turnover.',
      JSON.stringify(['Power BI']),
      'View the full breakdown on GitHub →',
      'https://github.com/sohammaiti2005/HR-ANALYTICS-DASHBOARD',
      1,
    ],
    // Add more real projects here in the same format:
    // ['002', 'Project Title', 'Description', JSON.stringify(['Tag1','Tag2']), 'Metric or note', 'https://github.com/...', 2],
  ],
  'INSERT INTO projects (row_id, title, description, tags, metric, link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
 
seedIfEmpty(
  'timeline',
  [
    [
      'Sep 2025 — Present',
      'Data Analyst Intern',
      'InternPe',
      'Working with real datasets on cleaning, analysis, and reporting tasks — placeholder text, replace with your actual responsibilities and outcomes.',
      1,
    ],
    [
      'Ongoing',
      'B.Tech, Computer Science (Data Science)',
      'Brainware University, Kolkata',
      'Coursework covering programming, databases, statistics, and data science fundamentals.',
      2,
    ],
  ],
  'INSERT INTO timeline (ts, title, org, description, sort_order) VALUES (?, ?, ?, ?, ?)'
);
 
module.exports = db;