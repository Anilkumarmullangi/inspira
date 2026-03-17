import Sidebar from '../components/Sidebar'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { feedPosts } from '../constants/data'










export default function Feed() {
  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      {/* Main feed — centered, full feel */}
      <main style={{
        flex:1, padding:'2rem 3vw',
        borderRight:'1px solid #2a2a2a',
      }}>
        <div style={{ maxWidth:'640px', margin:'0 auto' }}>
          {/* Feed header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'1.5rem',
          }}>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.6rem', fontWeight:600, color:'#f0ede8', margin:0,
            }}>Your Feed</h1>
            <div style={{
              display:'flex', background:'#111',
              border:'1px solid #2a2a2a', borderRadius:'100px', padding:'3px',
            }}>
              {[['✦','For You'],['🕐','Recent']].map(([icon, label], i) => (
                <button key={label} style={{
                  background: i === 0 ? '#e8c97e' : 'transparent',
                  color: i === 0 ? '#0a0a0a' : '#555',
                  border:'none', borderRadius:'100px',
                  padding:'0.3rem 0.85rem', fontSize:'0.72rem',
                  fontWeight: i === 0 ? 600 : 400,
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  display:'flex', alignItems:'center', gap:'0.3rem',
                }}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>

          <Stories />

          {feedPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* Right sidebar */}
      <aside style={{
        width:'280px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        position:'sticky', top:0, height:'100vh', overflowY:'auto',
      }}>
        {/* Inspira advantages */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.1rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#e8c97e', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem',
          }}>✦ Inspira vs Instagram</div>
          {[
            ['👁','Full reach stats on every post'],
            ['🔀','You control your feed order'],
            ['🚫','No shadowbanning, ever'],
            ['💰','Fair creator monetization'],
            ['🧠','Built-in screen time tools'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.55rem',
            }}>
              <span style={{ fontSize:'0.8rem', flexShrink:0, marginTop:'1px' }}>{icon}</span>
              <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Suggested creators */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.1rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#888', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem',
          }}>Suggested Creators</div>
          {[
            { name:'Rohan Travels', handle:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', followers:'41k' },
            { name:'Maya Art', handle:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', followers:'28k' },
            { name:'Priya Frames', handle:'priya.frames', avatar:'PF', gradient:'linear-gradient(135deg,#e8c97e,#b8945e)', followers:'84k' },
          ].map(user => (
            <div key={user.handle} style={{
              display:'flex', alignItems:'center',
              gap:'0.65rem', marginBottom:'0.9rem',
            }}>
              <div style={{
                width:'34px', height:'34px', borderRadius:'50%',
                background: user.gradient, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.68rem', fontWeight:700,
                color:'#0a0a0a', flexShrink:0,
              }}>{user.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.8rem', fontWeight:500, color:'#f0ede8' }}>{user.name}</div>
                <div style={{ fontSize:'0.68rem', color:'#555' }}>{user.followers} followers</div>
              </div>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.25rem 0.75rem',
                color:'#e8c97e', fontSize:'0.7rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", fontWeight:500,
              }}
                onMouseEnter={e => { e.target.style.background='rgba(232,201,126,0.1)'; e.target.style.borderColor='#e8c97e' }}
                onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='#2a2a2a' }}
              >Follow</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
          {['About','Privacy','Terms','Creators','Advertise'].map(l => (
            <a key={l} href="#" style={{ fontSize:'0.68rem', color:'#444', textDecoration:'none' }}>{l}</a>
          ))}
          <span style={{ fontSize:'0.68rem', color:'#333' }}>© 2026 Inspira</span>
        </div>
      </aside>
    </div>
  )
}