import { footerLinks } from '../constants/data'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #2a2a2a', padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 600, color: '#f0ede8' }}>
        Insp<em style={{ color: '#e8c97e', fontStyle: 'italic' }}>i</em>ra
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {footerLinks.map(link => (
          <a key={link} href="#" style={{ fontSize: '0.8rem', color: '#555', textDecoration: 'none' }}>{link}</a>
        ))}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#555' }}>© 2026 Inspira, Inc.</div>
    </footer>
  )
}