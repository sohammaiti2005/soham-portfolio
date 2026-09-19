import { useEffect, useState } from 'react';
import { apiGet } from '../api.js';
import TiltCard from './TiltCard.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiGet('projects').then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="eyebrow">projects</div>
        <h2>Selected work</h2>
        <p className="lede">Placeholder entries, served from the database — edit them via the API or a future admin view, no code changes needed.</p>
        <div className="projects-grid">
          {projects.map((p) => (
            <TiltCard key={p.id} maxTilt={6}>
              <div className="card">
                <div className="card-top">
                  <h3>{p.title}</h3>
                  <span className="rowid">#{p.id}</span>
                </div>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="metric">{p.metric}</div>
                <a className="card-link" href={p.link}>view case study →</a>
              </div>
            </TiltCard>
          ))}
        </div>
        <p className="placeholder-note">These project cards come from the database (see /api/projects) — replace the seed data in server/db.js with your real projects.</p>
      </div>
    </section>
  );
}
