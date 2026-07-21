export default function StatCard({ label, value, change, up, inspira, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background:'#111', border:'1px solid #2a2a2a',
        borderRadius:'14px', padding:'1.1rem',
        borderTop: inspira ? '2px solid rgba(232,201,126,0.3)' : undefined,
        cursor: onClick ? 'pointer' : 'default',
        transition:'all 0.2s',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.borderColor='#3a3a3a' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.borderColor='#2a2a2a' }}
    >
      <div style={{
        fontSize:'0.68rem', color: inspira ? '#e8c97e' : '#555',
        textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem',
      }}>{label}</div>
      <div style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'1.7rem', fontWeight:600,
        color:'#f0ede8', lineHeight:1, marginBottom:'0.3rem',
      }}>{value}</div>
      {change && (
        <div style={{
          fontSize:'0.72rem', fontWeight:500,
          color: up ? '#6fcf97' : '#c96f6f',
        }}>{change}</div>
      )}
    </div>
  )
}