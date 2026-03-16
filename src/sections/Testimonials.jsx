import { testimonials } from '../constants/data'

export default function Testimonials() {
  return (
    <section id="stories" style={{ padding: '7rem 5vw', background: '#111' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#e8c97e', fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
          <span style={{ width: '20px', height: '1px', background: '#e8c97e', display: 'inline-block' }} />
          Creator stories
        </div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3.2rem)', lineHeight: 1.15, color: '#f0ede8', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
          Made for people who <em style={{ color: '#e8c97e' }}>see</em> differently
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
        {testimonials.map(t => (
          <div key={t.name} style={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '1.75rem' }}>
            <div style={{ color: '#e8c97e', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>★★★★★</div>
            <blockquote style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontStyle: 'italic', color: '#888', lineHeight: 1.65, fontWeight: 300, marginBottom: '1.5rem' }}>
              "{t.quote}"
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', fontSize: '12px',
                fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a',
                background: t.gradient, flexShrink: 0,
              }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#f0ede8' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#555' }}>{t.handle} · {t.followers} followers</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}