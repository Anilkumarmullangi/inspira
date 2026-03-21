import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { icon:'⌂', label:'Home', path:'/feed' },
  { icon:'⊙', label:'Explore', path:'/explore' },
  { icon:'⌕', label:'Search', path:'/search' },
  { icon:'▷', label:'Reels', path:'/reels' },
  { icon:'✉', label:'Messages', path:'/messages' },
  { icon:'⚬', label:'Notifications', path:'/notifications' },
  { icon:'⊕', label:'Create', path:'/create' },
  { icon:'◯', label:'Profile', path:'/profile' },
  { icon:'💰', label:'Monetize', path:'/monetization' },
   { icon:'🔴', label:'Live', path:'/live' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={{
      width:'220px', flexShrink:0, position:'sticky',
      top:0, height:'100vh', padding:'1.75rem 1.25rem',
      display:'flex', flexDirection:'column',
      borderRight:'1px solid #2a2a2a', background:'#0d0d0d',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'1.7rem', fontWeight:600, color:'#f0ede8',
        textDecoration:'none', marginBottom:'2rem', display:'block',
        letterSpacing:'-0.01em',
      }}>
        Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
      </Link>

      {/* Nav items */}
      <nav style={{ display:'flex', flexDirection:'column', gap:'0.15rem', flex:1 }}>
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <Link key={item.label} to={item.path} style={{
              display:'flex', alignItems:'center', gap:'0.85rem',
              padding:'0.7rem 0.9rem', borderRadius:'12px',
              textDecoration:'none', transition:'all 0.2s',
              background: active ? 'rgba(232,201,126,0.1)' : 'transparent',
              color: active ? '#f0ede8' : '#555',
              fontSize:'0.9rem', fontWeight: active ? 500 : 400,
              borderLeft: active ? '2px solid #e8c97e' : '2px solid transparent',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.color='#888' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#555' }}}
            >
              <span style={{ fontSize:'1rem', width:'20px', textAlign:'center' }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'Notifications' && (
                <span style={{
                  marginLeft:'auto', background:'#e8c97e', color:'#0a0a0a',
                  borderRadius:'100px', fontSize:'0.6rem', fontWeight:700,
                  padding:'0.15rem 0.45rem', lineHeight:1.4,
                }}>3</span>
              )}
              {item.label === 'Messages' && (
                <span style={{
                  marginLeft:'auto', background:'#c96f6f', color:'white',
                  borderRadius:'100px', fontSize:'0.6rem', fontWeight:700,
                  padding:'0.15rem 0.45rem', lineHeight:1.4,
                }}>2</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Screen time */}
      <div style={{
        background:'rgba(232,201,126,0.05)',
        border:'1px solid rgba(232,201,126,0.1)',
        borderRadius:'12px', padding:'0.85rem',
        marginBottom:'1rem',
      }}>
        <div style={{ fontSize:'0.65rem', color:'#e8c97e', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.4rem' }}>
          ✦ Screen time
        </div>
        <div style={{ fontSize:'0.75rem', color:'#555', marginBottom:'0.5rem' }}>
          24 min today
        </div>
        <div style={{ background:'#2a2a2a', borderRadius:'100px', height:'3px', overflow:'hidden' }}>
          <div style={{ background:'#e8c97e', width:'40%', height:'100%', borderRadius:'100px' }}/>
        </div>
      </div>

      {/* User — links to settings */}
      <Link to="/settings" style={{ textDecoration:'none' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'0.65rem',
          padding:'0.7rem 0.85rem', borderRadius:'12px',
          border:'1px solid #2a2a2a', cursor:'pointer',
          transition:'border-color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
          onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
        >
          <div style={{
            width:'32px', height:'32px', borderRadius:'50%',
            background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.65rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
          }}>You</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'0.8rem', fontWeight:500, color:'#f0ede8' }}>Your Name</div>
            <div style={{ fontSize:'0.68rem', color:'#555' }}>@your.handle</div>
          </div>
          <span style={{ color:'#555', fontSize:'0.75rem' }}>⚙</span>
        </div>
      </Link>
    </aside>
  )
}