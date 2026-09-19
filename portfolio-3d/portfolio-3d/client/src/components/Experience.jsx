import { useEffect, useState } from 'react';
import { apiGet } from '../api.js';

export default function Experience() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    apiGet('timeline').then(setTimeline).catch(() => setTimeline([]));
  }, []);

  return (
    <section id="experience">
      <div className="wrap">
        <div className="eyebrow">experience &amp; education</div>
        <h2>Timeline</h2>
        <div className="log">
          {timeline.map((t, i) => (
            <div className="log-item reveal show" key={i}>
              <div className="log-ts">{t.ts}</div>
              <h3>{t.title}</h3>
              <div className="org">{t.org}</div>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
