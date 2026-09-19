import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'relative' }}>
        <div className="logo">soham<span>.</span>maiti</div>
        <ul className="navlinks" style={open ? { display: 'flex', flexDirection: 'column', position: 'absolute', top: 64, left: 0, right: 0, background: '#161c2c', padding: '16px 28px', borderBottom: '1px solid #2a3348', gap: 16, listStyle: 'none' } : {}}>
          <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
          <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
        </ul>
        <button className="navtoggle" onClick={() => setOpen((o) => !o)}>Menu</button>
      </nav>
    </header>
  );
}
