import { categories } from '../constants/data'

export default function Marquee() {
  const items = [...categories, ...categories]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', padding: '1rem 0', background: '#111' }}>
      <div style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', animation: 'marqueeScroll 22s linear infinite' }}>
        {items.map((cat, i) => (
          <span key={i} style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontStyle: 'italic', color: '#555', fontWeight: 300, flexShrink: 0 }}>
            {cat} <span style={{ color: '#e8c97e', margin: '0 0.5rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}