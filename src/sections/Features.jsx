import { features } from '../constants/data'

export default function Features() {
  return (
    <section id="features" style={{ padding: '7rem 5vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e8c97e', fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
        <span style={{ width: '20px', height: '1px', background: '#e8c97e', display: 'inline-block' }} />
        Everything you need
      </div>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3.2rem)', lineHeight: 1.15, color: '#f0ede8', fontWeight: 300, maxWidth: '520px', marginBottom: '3.5rem' }}>
        Built for creators who <em style={{ color: '#e8c97e' }}>refuse</em> to be ordinary
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#2a2a2a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
        {features.map((f, i) => (
          <div key={f.title} style={{
            background: '#111', padding: '2.25rem 2rem',
            gridColumn: (i === 0 || i === 4) ? 'span 2' : 'span 1',
            transition: 'background 0.2s', cursor: 'default',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.background = '#111'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, color: '#f0ede8', marginBottom: '0.5rem' }}>{f.title}</h3>
            <p style={{ fontSize: '0.88rem', color: '#888', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}