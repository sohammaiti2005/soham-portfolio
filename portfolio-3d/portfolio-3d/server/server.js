// Backend API for the React portfolio.
// Serves: skills, projects, timeline (all from the database) + handles the
// contact form (saves to DB and emails a notification).

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- Email setup ----------
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
} else {
  console.warn(
    '[email] EMAIL_USER / EMAIL_PASS not set in .env — messages will still be saved, but no email will be sent.'
  );
}

async function sendNotificationEmail({ name, email, message }) {
  if (!transporter) return;
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  });
}

// ---------- Content routes (data-driven, from the database) ----------

app.get('/api/skills', (req, res) => {
  const rows = db.prepare('SELECT name, pct FROM skills ORDER BY sort_order ASC').all();
  res.json(rows);
});

app.get('/api/projects', (req, res) => {
  const rows = db
    .prepare('SELECT row_id, title, description, tags, metric, link FROM projects ORDER BY sort_order ASC')
    .all()
    .map((p) => ({ ...p, id: p.row_id, tags: JSON.parse(p.tags) }));
  res.json(rows);
});

app.get('/api/timeline', (req, res) => {
  const rows = db.prepare('SELECT ts, title, org, description FROM timeline ORDER BY sort_order ASC').all();
  res.json(rows);
});

// ---------- Contact form ----------

const insertMessage = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "That email address doesn't look valid." });
  }

  try {
    insertMessage.run(name.trim(), email.trim(), message.trim());
  } catch (err) {
    console.error('[db] Failed to save message:', err);
    return res.status(500).json({ error: 'Could not save your message. Please try again.' });
  }

  try {
    await sendNotificationEmail({ name: name.trim(), email: email.trim(), message: message.trim() });
  } catch (err) {
    console.error('[email] Failed to send notification email:', err.message);
  }

  res.status(200).json({ ok: true });
});

app.get('/api/messages', (req, res) => {
  const rows = db.prepare('SELECT id, name, email, message, created_at FROM messages ORDER BY id DESC').all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`Saved contact messages: http://localhost:${PORT}/api/messages`);
});
