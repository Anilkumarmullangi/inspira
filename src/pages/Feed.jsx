import Sidebar from '../components/Sidebar'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { feedPosts } from '../constants/data'

export default function Feed() {
  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit', sans-serif",
    }}>
      <Sidebar />

      {/* Main feed */}
      <main style={{
        flex:1, maxWidth:'630px', margin:'0 auto',
        padding:'2rem 1.5rem',
      }}>
        {/* Feed header — Inspira feature: feed mode switcher */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:'1.5rem',
        }}>
          <h1 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'1.5rem', fontWeight:600, color:'#f0ede8',
          }}>
            Your Feed
          </h1>
          {/* Instagram doesn't let you switch feed modes — Inspira does */}
          <div style={{
            display:'flex', background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'100px', padding:'3px',
          }}>
            {['✦ For You', '🕐 Recent'].map((mode, i) => (
              <button key={mode} style={{
                background: i === 0 ? '#e8c97e' : 'transparent',
                color: i === 0 ? '#0a0a0a' : '#555',
                border:'none', borderRadius:'100px',
                padding:'0.35rem 0.9rem', fontSize:'0.75rem',
                fontWeight: i === 0 ? 600 : 400,
                cursor:'pointer', fontFamily:"'Outfit', sans-serif",
                transition:'all 0.2s',
              }}>{mode}</button>
            ))}
          </div>
        </div>

        <Stories />

        {feedPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>

      {/* Right panel */}
      <aside style={{
        width:'300px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.5rem',
      }}>
        {/* Inspira advantage callout */}
        <div style={{
          background:'rgba(232,201,126,0.05)',
          border:'1px solid rgba(232,201,126,0.12)',
          borderRadius:'16px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.72rem', color:'#e8c97e', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
            ✦ Inspira vs Instagram
          </div>
          {[
            ['👁', 'Full reach stats on every post'],
            ['🔀', 'You control your feed order'],
            ['🚫', 'No shadowbanning ever'],
            ['💰', 'Fair creator monetization'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.6rem',
            }}>
              <span style={{ fontSize:'0.85rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.78rem', color:'#888', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Suggested creators */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'16px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.78rem', color:'#888', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
            Suggested Creators
          </div>
          {[
            { name:'Rohan Travels', handle:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', followers:'41k' },
            { name:'Maya Art', handle:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', followers:'28k' },
            { name:'Priya Frames', handle:'priya.frames', avatar:'PF', gradient:'linear-gradient(135deg,#e8c97e,#b8945e)', followers:'84k' },
          ].map(user => (
            <div key={user.handle} style={{
              display:'flex', alignItems:'center', gap:'0.75rem',
              marginBottom:'1rem',
            }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'50%',
                background: user.gradient, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.72rem', fontWeight:600,
                color:'#0a0a0a', flexShrink:0,
              }}>{user.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>{user.name}</div>
                <div style={{ fontSize:'0.72rem', color:'#555' }}>{user.followers} followers</div>
              </div>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.3rem 0.8rem',
                color:'#e8c97e', fontSize:'0.72rem', cursor:'pointer',
                fontFamily:"'Outfit', sans-serif", fontWeight:500,
              }}>Follow</button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}