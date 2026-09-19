import { useEffect, useState } from 'react';
import Background3D from './Background3D.jsx';
import TiltCard from './TiltCard.jsx';
import photo from '../assets/soham.jpg';

const FULL_QUERY = "SELECT * FROM analysts WHERE name = 'Soham Maiti';";

function highlight(text) {
  return text
    .replace(/(SELECT|FROM|WHERE)/g, '<span class="kw">$1</span>')
    .replace(/('[^']*')/g, '<span class="str">$1</span>');
}

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [showResult, setShowResult] = useState(false);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) {
      setTyped(FULL_QUERY);
      setShowResult(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(FULL_QUERY.slice(0, i));
      if (i >= FULL_QUERY.length) {
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 200);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section className="hero">
      <Background3D />
      <div className="wrap hero-grid">
        <div>
          <div className="console">
            <div className="console-bar">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="label">query — profile.sql</span>
            </div>
            <div className="console-body">
              <div
                className="query-line"
                dangerouslySetInnerHTML={{
                  __html: highlight(typed) + (typed.length < FULL_QUERY.length ? '<span class="caret"></span>' : ''),
                }}
              />
              <div className={`result ${showResult ? 'show' : ''}`}>
                <div className="result-row"><div className="k">name</div><div className="v">Soham Maiti</div></div>
                <div className="result-row"><div className="k">role</div><div className="v">Aspiring Data Analyst</div></div>
                <div className="result-row"><div className="k">location</div><div className="v">Kolkata, India</div></div>
                <div className="result-row"><div className="k">status</div><div className="v status">available — open to opportunities</div></div>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn primary">View projects</a>
            <a href="#contact" className="btn ghost">Get in touch</a>
            <a href="Soham-Maiti.Resume.pdf" className="btn ghost">Download résumé</a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <TiltCard maxTilt={8}>
            <div className="photo-card">
              <img src={photo} alt="Soham Maiti" />
              <span className="photo-badge">available for opportunities</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
