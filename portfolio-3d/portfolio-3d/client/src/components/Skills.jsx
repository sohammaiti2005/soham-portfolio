import { useEffect, useRef, useState } from 'react';
import { apiGet } from '../api.js';

function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`skill reveal ${show ? 'show' : ''}`} style={{ '--pct': `${pct}%` }}>
      <div className="skill-top"><span>{name}</span><span className="pct">{pct}%</span></div>
      <div className="bar-track"><div className="bar-fill"></div></div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    apiGet('skills').then(setSkills).catch(() => setSkills([]));
  }, []);

  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow">skills</div>
        <h2>What I work with</h2>
        <p className="lede">Core toolkit for pulling, cleaning, analyzing, and presenting data — pulled live from the database.</p>
        <div className="skills-grid">
          {skills.map((s) => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} />
          ))}
        </div>
      </div>
    </section>
  );
}
