# Soham Maiti — Portfolio (React + 3D + Node/SQLite backend)

A full-stack portfolio: React frontend with a Three.js 3D background and
tilt-on-hover cards, talking to a Node/Express backend backed by a real
SQLite database.

```
portfolio-3d/
  client/     ← React app (Vite + Three.js)
  server/     ← Express API + SQLite database
```

You need **two terminals running at the same time** — one for the backend,
one for the frontend. Full setup steps are in each folder's own README-style
instructions below.

## 1. Start the backend

```
cd server
npm install
cp .env.example .env      # then edit .env with your Gmail + app password
npm start
```

Runs at http://localhost:3000. It creates `portfolio.db` automatically the
first time, and seeds it with your current skills/projects/timeline as a
starting point.

- View saved contact messages any time: http://localhost:3000/api/messages
- Skills/projects/timeline data: http://localhost:3000/api/skills, /api/projects, /api/timeline
- To change what shows on the site, edit the seed data in `server/db.js`,
  delete `server/portfolio.db`, and restart the server so it re-seeds.

## 2. Start the frontend (in a second terminal)

```
cd client
npm install
npm run dev
```

Runs at http://localhost:5173 — open this in your browser. During
development, it automatically forwards API requests to your backend on port
3000 (see `client/vite.config.js`), so both need to be running.

## 3. Building for real deployment

When you're ready to put this online:

```
cd client
npm run build
```

This produces a `client/dist` folder of static files. You'd deploy `dist`
to something like Vercel/Netlify, and deploy the `server` folder to
somewhere that can run Node (Render, Railway, etc.), then update the
frontend's API calls to point at your live backend URL instead of relying
on the dev proxy. Ask me when you're ready for this step — it depends on
which hosting you pick.

## Editing your content

- **Skills, Projects, Timeline** — now live in the database (`server/db.js`
  seed data), not hardcoded in the frontend. Edit the seed arrays there.
- **Photo** — `client/src/assets/soham.jpg`. Replace the file (keep the same
  name) to swap it.
- **Colors/fonts/design** — `client/src/index.css`, same design tokens as
  before (`--gold`, `--teal`, `--bg`, etc. at the top).
- **3D background shapes** — `client/src/components/Background3D.jsx`.
- **Tilt strength** — the `maxTilt` prop passed to `<TiltCard>` in
  `Hero.jsx` and `Projects.jsx`.
