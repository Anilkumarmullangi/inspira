import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { profileData, profilePosts } from '../constants/data'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [following, setFollowing] = useState(false)

  const tabs = [
    { id:'posts', label:'Posts', count: profileData.posts },
    { id:'saved', label:'Saved', count: 23 },
    { id:'tagged', label:'Tagged', count: 14 },
    { id:'analytics', label:'Analytics ✦', count: null },
  ]

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{ flex:1, overflowY:'auto' }}>

        {/* Cover / header area */}
        <div style={{
          height:'140px',
          background:'linear-gradient(135deg,#1a1208,#0f0f1a,#0a1520)',
          position:'relative',
        }}>
          {/* Edit cover button — Inspira lets you customize, Instagram doesn't */}
          <button style={{
            position:'absolute', top:'1rem', right:'1rem',
            background:'rgba(10,10,10,0.6)', border:'1px solid #2a2a2a',
            borderRadius:'8px', padding:'0.4rem 0.85rem',
            color:'#888', fontSize:'0.75rem', cursor:'pointer',
            fontFamily:"'Outfit',sans-serif", backdropFilter:'blur(8px)',
          }}>Edit cover</button>
        </div>

        <div style={{ padding:'0 3vw', maxWidth:'1000px', margin:'0 auto' }}>

          {/* Profile info row */}
          <div style={{
            display:'flex', alignItems:'flex-end',
            justifyContent:'space-between',
            marginTop:'-1px', marginBottom:'1.5rem',
          }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'1.25rem' }}>
              {/* Avatar */}
              <div style={{
                width:'100px', height:'100px', borderRadius:'50%',
                background: profileData.gradient,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.5rem', fontWeight:700, color:'#0a0a0a',
                border:'4px solid #0a0a0a', flexShrink:0,
              }}>
                {profileData.avatar}
              </div>
              <div style={{ paddingBottom:'0.5rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <h1 style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'1.6rem', fontWeight:600, color:'#f0ede8', margin:0,
                  }}>{profileData.name}</h1>
                  {profileData.verified && (
                    <span style={{
                      background:'#e8c97e', color:'#0a0a0a',
                      borderRadius:'50%', width:'18px', height:'18px',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.6rem', fontWeight:700, flexShrink:0,
                    }}>✓</span>
                  )}
                </div>
                <div style={{ fontSize:'0.82rem', color:'#555', marginTop:'2px' }}>
                  @{profileData.username}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:'flex', gap:'0.75rem', paddingBottom:'0.5rem' }}>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.5rem 1.25rem',
                color:'#888', fontSize:'0.82rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
                onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
              >Edit profile</button>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.5rem 1.25rem',
                color:'#888', fontSize:'0.82rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
                onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
              >Share profile</button>
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom:'1.5rem' }}>
            <p style={{ fontSize:'0.9rem', color:'#888', lineHeight:1.7, marginBottom:'0.4rem' }}>
              {profileData.bio}
            </p>
            <a href="#" style={{ fontSize:'0.85rem', color:'#e8c97e', textDecoration:'none' }}>
              🔗 {profileData.website}
            </a>
          </div>

          {/* Stats row — Inspira shows more stats than Instagram */}
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(4,1fr)',
            gap:'1px', background:'#2a2a2a', borderRadius:'14px',
            overflow:'hidden', marginBottom:'2rem',
            border:'1px solid #2a2a2a',
          }}>
            {[
              { label:'Posts', value: profileData.posts },
              { label:'Followers', value:'12.4k' },
              { label:'Following', value: profileData.following },
              { label:'Total reach ✦', value:'248k', inspira:true },
            ].map(stat => (
              <div key={stat.label} style={{
                background:'#111', padding:'1.1rem',
                textAlign:'center', cursor:'pointer',
                transition:'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.background='#111'}
              >
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'1.5rem', fontWeight:600,
                  color: stat.inspira ? '#e8c97e' : '#f0ede8',
                  lineHeight:1,
                }}>{stat.value}</div>
                <div style={{
                  fontSize:'0.7rem', color: stat.inspira ? '#e8c97e' : '#555',
                  marginTop:'0.35rem', fontWeight: stat.inspira ? 500 : 400,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights — like Instagram stories highlights */}
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ display:'flex', gap:'1.25rem', overflowX:'auto', paddingBottom:'0.5rem' }}>
              {['Travel','Food','Architecture','Nature','Add'].map((hl, i) => (
                <div key={hl} style={{
                  display:'flex', flexDirection:'column',
                  alignItems:'center', gap:'0.5rem', flexShrink:0, cursor:'pointer',
                }}>
                  <div style={{
                    width:'64px', height:'64px', borderRadius:'50%',
                    border: hl === 'Add' ? '2px dashed #2a2a2a' : '2px solid #2a2a2a',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.5rem',
                    background: hl === 'Add' ? 'transparent' : '#111',
                    transition:'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
                    onMouseLeave={e => e.currentTarget.style.borderColor= hl === 'Add' ? '#2a2a2a' : '#2a2a2a'}
                  >
                    {hl === 'Travel' ? '✈️' : hl === 'Food' ? '☕' : hl === 'Architecture' ? '🏛' : hl === 'Nature' ? '🌿' : '+'}
                  </div>
                  <span style={{ fontSize:'0.68rem', color:'#555' }}>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display:'flex', borderBottom:'1px solid #2a2a2a',
            marginBottom:'1.5rem', gap:'0',
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background:'transparent', border:'none',
                borderBottom: activeTab === tab.id ? '2px solid #e8c97e' : '2px solid transparent',
                padding:'0.75rem 1.5rem', cursor:'pointer',
                color: activeTab === tab.id ? '#f0ede8' : '#555',
                fontSize:'0.82rem', fontWeight: activeTab === tab.id ? 500 : 400,
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                marginBottom:'-1px',
              }}>
                {tab.label}
                {tab.count !== null && (
                  <span style={{ marginLeft:'0.4rem', color:'#555', fontSize:'0.72rem' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {activeTab === 'posts' && (
            <div style={{
              display:'grid', gridTemplateColumns:'repeat(3,1fr)',
              gap:'3px', borderRadius:'8px', overflow:'hidden',
              marginBottom:'3rem',
            }}>
              {profilePosts.map(post => (
                <div key={post.id}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  style={{
                    aspectRatio:'1', background: post.bg,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'2.5rem', cursor:'pointer', position:'relative',
                    transition:'transform 0.2s',
                    transform: hoveredPost === post.id ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {post.emoji}
                  {hoveredPost === post.id && (
                    <div style={{
                      position:'absolute', inset:0,
                      background:'rgba(10,10,10,0.7)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      gap:'1.5rem',
                    }}>
                      <span style={{ color:'white', fontSize:'0.85rem', fontWeight:600 }}>
                        ♥ {post.likes.toLocaleString()}
                      </span>
                      <span style={{ color:'white', fontSize:'0.85rem', fontWeight:600 }}>
                        💬 {post.comments}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Saved tab */}
          {activeTab === 'saved' && (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔖</div>
              <p style={{ fontSize:'0.9rem' }}>Only you can see your saved posts</p>
              <p style={{ fontSize:'0.78rem', marginTop:'0.5rem', color:'#444' }}>
                ✦ Inspira keeps your saves completely private — Instagram doesn't always.
              </p>
            </div>
          )}

          {/* Analytics tab — Inspira exclusive, Instagram locks this */}
          {activeTab === 'analytics' && (
            <div style={{ marginBottom:'3rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.25rem', marginBottom:'1.5rem',
              }}>
                <div style={{ fontSize:'0.72rem', color:'#e8c97e', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Free for all creators — unlike Instagram
                </div>
                <p style={{ fontSize:'0.82rem', color:'#666', lineHeight:1.6, margin:0 }}>
                  Instagram locks deep analytics behind business accounts and Meta Business Suite. On Inspira, every creator gets full analytics for free.
                </p>
              </div>

              <div style={{
                display:'grid', gridTemplateColumns:'repeat(2,1fr)',
                gap:'1rem', marginBottom:'1.5rem',
              }}>
                {[
                  { label:'Total impressions', value:'248,391', change:'+12%', up:true },
                  { label:'Profile visits', value:'18,204', change:'+8%', up:true },
                  { label:'Avg. reach per post', value:'5,174', change:'-3%', up:false },
                  { label:'Saves rate', value:'4.2%', change:'+1.1%', up:true },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                  }}>
                    <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.8rem', fontWeight:600, color:'#f0ede8',
                      lineHeight:1, marginBottom:'0.35rem',
                    }}>{stat.value}</div>
                    <div style={{ fontSize:'0.75rem', color: stat.up ? '#6fcf97' : '#c96f6f', fontWeight:500 }}>
                      {stat.change} this month
                    </div>
                  </div>
                ))}
              </div>

              {/* Top posts */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.72rem', color:'#888', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
                  Top performing posts
                </div>
                {profilePosts.slice(0,4).map((post, i) => (
                  <div key={post.id} style={{
                    display:'flex', alignItems:'center', gap:'0.75rem',
                    padding:'0.65rem 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'8px',
                      background: post.bg, display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'1.2rem', flexShrink:0,
                    }}>{post.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.78rem', color:'#888' }}>
                        ♥ {post.likes.toLocaleString()} · 💬 {post.comments}
                      </div>
                    </div>
                    <div style={{
                      fontSize:'0.72rem', color:'#e8c97e', fontWeight:500,
                    }}>
                      #{i + 1} top
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tagged tab */}
          {activeTab === 'tagged' && (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🏷</div>
              <p style={{ fontSize:'0.9rem' }}>Posts you've been tagged in</p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}