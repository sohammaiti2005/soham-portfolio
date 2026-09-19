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
      'Sales Performance Dashboard',
      'Placeholder — describe the dataset, the business question, and what the dashboard let stakeholders decide.',
      JSON.stringify(['Power BI', 'SQL']),
      "→ replace with a result, e.g. 'cut reporting time by 40%'",
      '#',
      1,
    ],
    [
      '002',
      'Customer Churn Analysis',
      'Placeholder — outline the data cleaning steps, model or method used, and the key insight uncovered.',
      JSON.stringify(['Python', 'Pandas']),
      "→ replace with a result, e.g. 'flagged top 3 churn drivers'",
      '#',
      2,
    ],
    [
      '003',
      'Retail Inventory SQL Queries',
      'Placeholder — describe the schema, the queries you wrote, and the problem they solved.',
      JSON.stringify(['SQL', 'PostgreSQL']),
      "→ replace with a result, e.g. 'reduced stockouts by 15%'",
      '#',
      3,
    ],
    [
      '004',
      'Survey Data Visualization',
      'Placeholder — describe the survey, your cleaning process, and the charts you built to summarize it.',
      JSON.stringify(['Python', 'Matplotlib']),
      "→ replace with a result, e.g. 'presented to 50+ respondents'",
      '#',
      4,
    ],
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
