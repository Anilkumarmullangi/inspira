import Button from '../components/Button'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'grid',
      gridTemplateColumns: '1fr 1fr', alignItems: 'center',
      gap: '4rem', padding: '8rem 5vw 4rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(232,201,126,0.07) 0%, transparent 70%)',
      }} />

      {/* Text side */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(232,201,126,0.1)', border: '1px solid rgba(232,201,126,0.25)',
          color: '#e8c97e', fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '2rem',
        }}>
          ✦ Your visual world awaits
        </div>

        <h1 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(3rem,5.5vw,5.8rem)',
          lineHeight: 1.02, letterSpacing: '-0.02em', color: '#f0ede8',
          fontWeight: 300, marginBottom: '1.5rem',
        }}>
          <strong style={{ fontWeight: 600 }}>Share</strong> what<br />
          <em style={{ color: '#e8c97e', fontStyle: 'italic' }}>moves</em> you.<br />
          <strong style={{ fontWeight: 600 }}>Inspire</strong> others.
        </h1>

        <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.8, maxWidth: '380px', marginBottom: '2.5rem', fontWeight: 300 }}>
          Inspira is the home for visual storytellers. Discover beauty, share your perspective, and connect with a community that lives for aesthetics.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" href="#">Create your profile</Button>
          <Button variant="ghost" href="#features">Explore feed</Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2rem', fontSize: '0.8rem', color: '#555' }}>
          <span style={{ color: '#e8c97e', letterSpacing: '3px' }}>★★★★★</span>
          <span>4.9 rating · 2M+ creators · 180 countries</span>
        </div>
      </div>

      {/* Phone side */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Float cards */}
        <div style={{
          position: 'absolute', left: '-20px', top: '25%',
          background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px',
          padding: '0.75rem 1rem', animation: 'floatCard 5s ease-in-out infinite', zIndex: 20,
        }}>
          <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>New followers</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, color: '#f0ede8' }}>+248</div>
          <div style={{ fontSize: '10px', color: '#6fcf97' }}>↑ 18% this week</div>
        </div>

        <div style={{
          position: 'absolute', right: '-20px', bottom: '20%',
          background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px',
          padding: '0.75rem 1rem', animation: 'floatCard 5s ease-in-out infinite 2s', zIndex: 20,
        }}>
          <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Post reach</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, color: '#f0ede8' }}>14.2k</div>
          <div style={{ fontSize: '10px', color: '#6fcf97' }}>↑ Going viral</div>
        </div>

        {/* Phone */}
        <div style={{
          width: '260px', background: '#111', borderRadius: '36px',
          border: '1px solid #2a2a2a', overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          animation: 'phoneFloat 7s ease-in-out infinite',
        }}>
          <div style={{ width: '90px', height: '26px', background: '#0a0a0a', borderRadius: '0 0 18px 18px', margin: '0 auto' }} />
          <div style={{ paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 600, color: '#f0ede8' }}>
                Insp<em style={{ color: '#e8c97e' }}>i</em>ra
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', color: '#888', fontSize: '0.9rem' }}>
                <span>♡</span><span>✉</span>
              </div>
            </div>

            {/* Stories */}
            <div style={{ display: 'flex', gap: '8px', padding: '0 0.75rem 0.75rem', overflow: 'hidden' }}>
              {[['🌿','yours'],['🏙','maya'],['🎨','studio'],['✈️','rohan']].map(([icon, name]) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    border: '2px solid transparent',
                    background: 'linear-gradient(#111,#111) padding-box, linear-gradient(135deg,#e8c97e,#c96f6f) border-box',
                  }}>{icon}</div>
                  <span style={{ fontSize: '10px', color: '#888' }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Post */}
            <div style={{ borderTop: '1px solid #2a2a2a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', fontSize: '10px',
                  fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a',
                  background: 'linear-gradient(135deg,#e8c97e,#c96f6f)',
                }}>NS</div>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#f0ede8' }}>nisha.creates</span>
              </div>
              <div style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', background: 'linear-gradient(135deg,#1a1208,#3d2b10)' }}>🌅</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', color: '#888', fontSize: '0.85rem' }}>
                <span>♡</span><span>💬</span><span>↗</span>
                <span style={{ marginLeft: 'auto' }}>🔖</span>
              </div>
              <div style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#f0ede8' }}>1,842 likes</div>
              <div style={{ padding: '4px 12px 12px', fontSize: '10px', color: '#888' }}>
                <strong style={{ color: '#f0ede8' }}>nisha.creates</strong> golden hour never gets old ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}