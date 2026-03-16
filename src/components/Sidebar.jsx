import { Link } from 'react-router-dom'

const navItems = [
  { icon:'🏠', label:'Home', path:'/feed', active:true },
  { icon:'🔍', label:'Explore', path:'/explore' },
  { icon:'🎬', label:'Reels', path:'/reels' },
  { icon:'💬', label:'Messages', path:'/messages' },
  { icon:'🔔', label:'Notifications', path:'/notifications' },
  { icon:'➕', label:'Create', path:'/create' },
  { icon:'👤', label:'Profile', path:'/profile' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width:'240px', flexShrink:0, position:'sticky',
      top:'0', height:'100vh', padding:'2rem 1.5rem',
      display:'flex', flexDirection:'column',
      borderRight:'1px solid #2a2a2a',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:'1.8rem', fontWeight:600, color:'#f0ede8',
        textDecoration:'none', marginBottom:'2.5rem', display:'block',
      }}>
        Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
      </Link>

      {/* Nav */}
      <nav style={{ display:'flex', flexDirection:'column', gap:'0.25rem', flex:1 }}>
        {navItems.map(item => (
          <Link key={item.label} to={item.path} style={{
            display:'flex', alignItems:'center', gap:'0.9rem',
            padding:'0.75rem 1rem', borderRadius:'12px',
            textDecoration:'none', transition:'background 0.2s',
            background: item.active ? 'rgba(232,201,126,0.08)' : 'transparent',
            color: item.active ? '#f0ede8' : '#555',
            fontSize:'0.92rem', fontWeight: item.active ? 500 : 400,
          }}
            onMouseEnter={e => { if (!item.active) e.currentTarget.style.background = '#1a1a1a' }}
            onMouseLeave={e => { if (!item.active) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
            {item.label}
            {item.label === 'Notifications' && (
              <span style={{
                marginLeft:'auto', background:'#e8c97e', color:'#0a0a0a',
                borderRadius:'100px', fontSize:'0.65rem', fontWeight:700,
                padding:'0.1rem 0.5rem',
              }}>3</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User profile at bottom */}
      <div style={{
        display:'flex', alignItems:'center', gap:'0.75rem',
        padding:'0.75rem', borderRadius:'12px',
        border:'1px solid #2a2a2a', marginTop:'1rem',
        cursor:'pointer',
      }}>
        <div style={{
          width:'36px', height:'36px', borderRadius:'50%',
          background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'0.75rem', fontWeight:600, color:'#0a0a0a', flexShrink:0,
        }}>You</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>Your Name</div>
          <div style={{ fontSize:'0.72rem', color:'#555', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>@your.handle</div>
        </div>
        <span style={{ color:'#555', fontSize:'0.8rem' }}>⋯</span>
      </div>
    </aside>
  )
}