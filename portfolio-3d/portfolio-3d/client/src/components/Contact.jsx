import { useState } from 'react';
import { apiPost } from '../api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await apiPost('contact', form);
      setStatus({ ok: true, text: 'Message sent — thanks for reaching out!' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ ok: false, text: err.message || 'Could not reach the server. Is the backend running?' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ borderBottom: 'none' }}>
      <div className="wrap">
        <div className="eyebrow">contact</div>
        <h2>Let's talk data</h2>
        <div className="contact-panel">
          <div>
            <h3>Send a message</h3>
            <p>Messages are saved to the database and emailed to me directly.</p>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="fname">name</label>
                <input id="fname" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="femail">email</label>
                <input id="femail" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="fmsg">message</label>
                <textarea id="fmsg" name="message" placeholder="What would you like to talk about?" value={form.message} onChange={handleChange} required />
              </div>
              <button className="btn primary" type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send message'}
              </button>
              {status && (
                <p style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 12.5, color: status.ok ? 'var(--teal)' : '#e07a5f' }}>
                  {status.text}
                </p>
              )}
            </form>
          </div>
          <div>
            <h3>Find me</h3>
            <p>Swap these placeholder links for your real profiles.</p>
            <div className="linklist">
              <a href="mailto:sohammaiti770@gmail.com">✉ sohammaiti770@gmail.com</a>
              <a href="https://www.linkedin.com/in/soham-maiti-689540355" target="_blank" rel="noopener noreferrer">in — linkedin.com/in/soham-maiti</a>
              <a href="https://github.com/sohammaiti2005" target="_blank" rel="noopener noreferrer">gh — github.com/sohammaiti2005</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
