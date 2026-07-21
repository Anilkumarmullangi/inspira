import { gridCells } from '../constants/data'
import Button from '../components/Button'

export default function GridPreview() {
  return (
    <section id="explore" style={{ padding: '7rem 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px', borderRadius: '12px', overflow: 'hidden' }}>
        {gridCells.map((cell, i) => (
          <div key={i} style={{
            aspectRatio: '1', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '2.5rem',
            background: cell.bg, cursor: 'pointer', position: 'relative',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {cell.emoji}
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e8c97e', fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
          <span style={{ width: '20px', height: '1px', background: '#e8c97e', display: 'inline-block' }} />
          Your profile
        </div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3.2rem)', lineHeight: 1.15, color: '#f0ede8', fontWeight: 300, marginBottom: '1.5rem' }}>
          A gallery that tells your <em style={{ color: '#e8c97e' }}>story</em>
        </h2>
        <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
          Your Inspira grid is your visual identity. Every post becomes part of a living portfolio — a curated window into how you see the world.
        </p>
        <Button variant="primary" href="#">Start sharing</Button>
      </div>
    </section>
  )
}