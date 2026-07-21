export default function InspiraBadge({ text, style = {} }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:'0.4rem',
      background:'rgba(232,201,126,0.06)',
      border:'1px solid rgba(232,201,126,0.15)',
      borderRadius:'100px', padding:'0.3rem 0.85rem',
      fontSize:'0.72rem', color:'#e8c97e',
      ...style,
    }}>
      <span>✦</span>
      <span>{text}</span>
    </div>
  )
}