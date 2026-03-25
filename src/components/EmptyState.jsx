export default function EmptyState({ icon, title, subtitle, action, onAction }) {
  return (
    <div style={{
      textAlign:'center', padding:'4rem 2rem',
      display:'flex', flexDirection:'column',
      alignItems:'center', gap:'0.75rem',
      animation:'fadeIn 0.3s ease forwards',
    }}>
      <div style={{ fontSize:'3rem', marginBottom:'0.25rem' }}>{icon}</div>
      <div style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'1.4rem', fontWeight:600, color:'#f0ede8',
      }}>{title}</div>
      {subtitle && (
        <p style={{ fontSize:'0.82rem', color:'#555', maxWidth:'320px', lineHeight:1.6 }}>
          {subtitle}
        </p>
      )}
      {action && (
        <button
          onClick={onAction}
          style={{
            background:'transparent', border:'1px solid #2a2a2a',
            borderRadius:'100px', padding:'0.6rem 1.5rem',
            color:'#888', fontSize:'0.82rem', cursor:'pointer',
            fontFamily:"'Outfit',sans-serif", marginTop:'0.5rem',
            transition:'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor='#e8c97e'; e.target.style.color='#e8c97e' }}
          onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
        >{action}</button>
      )}
    </div>
  )
}