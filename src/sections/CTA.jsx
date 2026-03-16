import Button from '../components/Button'

export default function CTA() {
  return (
    <section style={{ padding: '9rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(232,201,126,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#e8c97e', fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <span style={{ width: '20px', height: '1px', background: '#e8c97e', display: 'inline-block' }} />
        Join the community
      </div>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 1.1, color: '#f0ede8', fontWeight: 300, maxWidth: '650px', margin: '0 auto 1.5rem', position: 'relative', zIndex: 1 }}>
        Your audience is <em style={{ color: '#e8c97e' }}>waiting.</em>
      </h2>

      <p style={{ color: '#888', fontSize: '1rem', maxWidth: '400px', margin: '0 auto 2.5rem', fontWeight: 300, position: 'relative', zIndex: 1 }}>
        2 million creators are already sharing what moves them. It's your turn.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <Button variant="primary" href="#">Create free account</Button>
        <Button variant="ghost" href="#">Browse without signing up</Button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {[['', 'Download on the', 'App Store'], ['▶', 'Get it on', 'Google Play']].map(([icon, sub, name]) => (
          <a key={name} href="#" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            padding: '0.6rem 1.25rem', borderRadius: '10px', textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}>
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555' }}>{sub}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#f0ede8' }}>{name}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}