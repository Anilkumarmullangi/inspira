



import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const userData = {
  'nisha.creates': {
    name:'Nisha Kapoor', username:'nisha.creates',
    avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)',
    verified:true, bio:'Visual storyteller capturing golden hours ✨ Sony A7IV · Hyderabad 🇮🇳\nWorkshops · Presets · Collabs open',
    website:'nisha.creates/presets', location:'Hyderabad, India',
    posts:48, followers:84200, following:891,
    totalReach:'1.2M', avgEngagement:'8.4%',
    coverBg:'linear-gradient(135deg,#1a1208,#3d2b10,#1a0a05)',
    isFollowing:false, mutualFollowers:['arjun.lens','maya.art','ananya.studio'],
    category:'Photography',
    posts_data:[
      { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', likes:1842, comments:47 },
      { emoji:'☕', bg:'linear-gradient(135deg,#1a1210,#3a2218)', likes:2156, comments:55 },
      { emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)', likes:3891, comments:98 },
      { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', likes:5103, comments:124 },
      { emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', likes:1923, comments:41 },
      { emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', likes:4201, comments:98 },
      { emoji:'🌺', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', likes:2847, comments:63 },
      { emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', likes:3847, comments:77 },
      { emoji:'🏙', bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', likes:1654, comments:38 },
    ]
  },
  'arjun.lens': {
    name:'Arjun Lens', username:'arjun.lens',
    avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)',
    verified:false, bio:'Street & night photography 🌃 Fujifilm X-T5\nMumbai → everywhere',
    website:'arjunlens.com', location:'Mumbai, India',
    posts:124, followers:41000, following:543,
    totalReach:'480k', avgEngagement:'6.2%',
    coverBg:'linear-gradient(135deg,#0a1520,#1e3a5f,#0a0a20)',
    isFollowing:true, mutualFollowers:['nisha.creates','maya.art'],
    category:'Street Photography',
    posts_data:[
      { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', likes:3291, comments:89 },
      { emoji:'🏙', bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', likes:1654, comments:38 },
      { emoji:'🌉', bg:'linear-gradient(135deg,#0a0a20,#1e1e4a)', likes:2140, comments:54 },
      { emoji:'🌆', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', likes:1892, comments:42 },
      { emoji:'🌇', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', likes:2341, comments:61 },
      { emoji:'🌁', bg:'linear-gradient(135deg,#0f0f1a,#2a2a3a)', likes:1203, comments:29 },
    ]
  },
}

const defaultUser = {
  name:'Creator', username:'creator',
  avatar:'CR', gradient:'linear-gradient(135deg,#888,#555)',
  verified:false, bio:'Visual creator on Inspira',
  website:'', location:'',
  posts:12, followers:1240, following:234,
  totalReach:'48k', avgEngagement:'4.1%',
  coverBg:'linear-gradient(135deg,#1a1a1a,#2a2a2a)',
  isFollowing:false, mutualFollowers:[],
  category:'Creator',
  posts_data:[
    { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', likes:241, comments:12 },
    { emoji:'☕', bg:'linear-gradient(135deg,#1a1210,#3a2218)', likes:189, comments:8 },
    { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', likes:312, comments:18 },
  ]
}

export default function UserProfile() {
  const { username } = useParams()
  const navigate = useNavigate()
  const user = userData[username] || { ...defaultUser, username: username || 'creator' }

  const [following, setFollowing] = useState(user.isFollowing)
  const [followersCount, setFollowersCount] = useState(user.followers)
  const [activeTab, setActiveTab] = useState('posts')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const toggleFollow = () => {
    setFollowing(!following)
    setFollowersCount(following ? followersCount - 1 : followersCount + 1)
  }

  const formatNum = n => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
    return n
  }

  const tabs = [
    { id:'posts', label:'Posts', count: user.posts },
    { id:'reels', label:'Reels' },
    { id:'tagged', label:'Tagged' },
  ]

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{ flex:1, overflowY:'auto' }}>

        {/* Back */}
        <div style={{
          padding:'1rem 2rem', borderBottom:'1px solid #2a2a2a',
          display:'flex', alignItems:'center', gap:'0.75rem',
          position:'sticky', top:0, background:'rgba(10,10,10,0.92)',
          backdropFilter:'blur(12px)', zIndex:10,
        }}>
          <button onClick={() => navigate(-1)} style={{
            background:'transparent', border:'none',
            color:'#555', cursor:'pointer', fontSize:'1.1rem', padding:0,
          }}>←</button>
          <div>
            <span style={{ fontSize:'0.9rem', fontWeight:600, color:'#f0ede8' }}>
              {user.name}
            </span>
            <div style={{ fontSize:'0.7rem', color:'#555' }}>
              {formatNum(user.posts)} posts
            </div>
          </div>
        </div>

        {/* Cover */}
        <div style={{
          height:'200px', background: user.coverBg,
          position:'relative',
        }}>
          {/* Options button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            style={{
              position:'absolute', top:'1rem', right:'1rem',
              background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
              width:'36px', height:'36px', color:'white',
              cursor:'pointer', fontSize:'1rem',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >⋯</button>

          {/* Options dropdown */}
          {showOptions && (
            <div style={{
              position:'absolute', top:'3.5rem', right:'1rem',
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'12px', overflow:'hidden', zIndex:20, minWidth:'180px',
            }}>
              {[
                { label: muted ? 'Unmute' : 'Mute', action: () => { setMuted(!muted); setShowOptions(false) } },
                { label:'Restrict', action: () => setShowOptions(false) },
                { label:'Block', action: () => setShowOptions(false), red:true },
                { label:'Report', action: () => setShowOptions(false), red:true },
              ].map(opt => (
                <button key={opt.label} onClick={opt.action} style={{
                  width:'100%', background:'transparent',
                  border:'none', borderBottom:'1px solid #1a1a1a',
                  padding:'0.75rem 1rem', color: opt.red ? '#c96f6f' : '#888',
                  fontSize:'0.82rem', cursor:'pointer', textAlign:'left',
                  fontFamily:"'Outfit',sans-serif", transition:'background 0.15s',
                }}
                  onMouseEnter={e => e.target.style.background='#1a1a1a'}
                  onMouseLeave={e => e.target.style.background='transparent'}
                >{opt.label}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding:'0 2rem', maxWidth:'900px', margin:'0 auto' }}>

          {/* Profile header */}
          <div style={{
            display:'flex', alignItems:'flex-end',
            justifyContent:'space-between',
            marginTop:'-1px', marginBottom:'1.25rem',
          }}>
            {/* Avatar */}
            <div style={{
              width:'96px', height:'96px', borderRadius:'50%',
              background: user.gradient, display:'flex',
              alignItems:'center', justifyContent:'center',
              fontSize:'1.4rem', fontWeight:700, color:'#0a0a0a',
              border:'4px solid #0a0a0a', flexShrink:0,
            }}>{user.avatar}</div>

            {/* Action buttons */}
            <div style={{ display:'flex', gap:'0.6rem', paddingBottom:'0.5rem', flexWrap:'wrap' }}>
              <button
                onClick={toggleFollow}
                style={{
                  background: following ? 'transparent' : '#e8c97e',
                  color: following ? '#888' : '#0a0a0a',
                  border: following ? '1px solid #2a2a2a' : 'none',
                  borderRadius:'100px', padding:'0.55rem 1.5rem',
                  fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                }}
                onMouseEnter={e => {
                  if (following) { e.target.style.borderColor='#c96f6f'; e.target.style.color='#c96f6f' }
                  else e.target.style.background='#f0d88a'
                }}
                onMouseLeave={e => {
                  if (following) { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }
                  else e.target.style.background='#e8c97e'
                }}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => navigate('/messages')}
                style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.55rem 1.25rem',
                  color:'#888', fontSize:'0.85rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
                onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
              >Message</button>
              {following && (
                <button style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.55rem 1rem',
                  color:'#888', fontSize:'0.85rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}>Collab ✦</button>
              )}
            </div>
          </div>

          {/* Name + bio */}
          <div style={{ marginBottom:'1.25rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem' }}>
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.4rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>{user.name}</h1>
              {user.verified && (
                <span style={{
                  background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                  width:'18px', height:'18px', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'0.6rem', fontWeight:700,
                }}>✓</span>
              )}
              <span style={{
                background:'#1a1a1a', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.15rem 0.6rem',
                fontSize:'0.65rem', color:'#555',
              }}>{user.category}</span>
            </div>
            <div style={{ fontSize:'0.78rem', color:'#555', marginBottom:'0.6rem' }}>
              @{user.username}
              {user.location && ` · ${user.location}`}
            </div>
            <p style={{ fontSize:'0.88rem', color:'#888', lineHeight:1.65, margin:0 }}>
              {user.bio.split('\n').map((line, i) => (
                <span key={i}>{line}{i < user.bio.split('\n').length - 1 && <br/>}</span>
              ))}
            </p>
            {user.website && (
              <a href="#" style={{ fontSize:'0.82rem', color:'#e8c97e', textDecoration:'none', marginTop:'0.4rem', display:'inline-block' }}>
                🔗 {user.website}
              </a>
            )}
          </div>

          {/* Mutual followers — Inspira shows this clearly */}
          {user.mutualFollowers.length > 0 && (
            <div style={{
              display:'flex', alignItems:'center', gap:'0.6rem',
              marginBottom:'1.25rem', fontSize:'0.78rem', color:'#555',
            }}>
              <div style={{ display:'flex' }}>
                {user.mutualFollowers.slice(0,3).map((mf, i) => (
                  <div key={mf} style={{
                    width:'22px', height:'22px', borderRadius:'50%',
                    background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                    border:'2px solid #0a0a0a', marginLeft: i > 0 ? '-6px' : 0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a',
                  }}>{mf[0].toUpperCase()}</div>
                ))}
              </div>
              <span>
                Followed by <strong style={{ color:'#888' }}>{user.mutualFollowers[0]}</strong>
                {user.mutualFollowers.length > 1 && ` and ${user.mutualFollowers.length - 1} others you follow`}
              </span>
            </div>
          )}

          {/* Stats */}
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(5,1fr)',
            gap:'1px', background:'#2a2a2a', borderRadius:'14px',
            overflow:'hidden', border:'1px solid #2a2a2a',
            marginBottom:'1.5rem',
          }}>
            {[
              { label:'Posts', value: formatNum(user.posts) },
              { label:'Followers', value: formatNum(followersCount) },
              { label:'Following', value: formatNum(user.following) },
              { label:'Avg reach ✦', value: user.totalReach, inspira:true },
              { label:'Engagement ✦', value: user.avgEngagement, inspira:true },
            ].map(stat => (
              <div key={stat.label} style={{
                background:'#111', padding:'1rem 0.5rem',
                textAlign:'center', cursor:'pointer',
                transition:'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.background='#111'}
              >
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'1.3rem', fontWeight:600,
                  color: stat.inspira ? '#e8c97e' : '#f0ede8',
                  lineHeight:1,
                }}>{stat.value}</div>
                <div style={{
                  fontSize:'0.6rem', color: stat.inspira ? '#e8c97e' : '#555',
                  marginTop:'0.3rem', fontWeight: stat.inspira ? 500 : 400,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Inspira transparency note */}
          <div style={{
            background:'rgba(232,201,126,0.04)',
            border:'1px solid rgba(232,201,126,0.1)',
            borderRadius:'10px', padding:'0.65rem 1rem',
            marginBottom:'1.5rem',
            display:'flex', alignItems:'center', gap:'0.6rem',
            fontSize:'0.72rem', color:'#555',
          }}>
            <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
            Inspira shows you avg reach and engagement for all creators — Instagram hides this completely.
          </div>

          {/* Highlights */}
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ display:'flex', gap:'1.25rem', overflowX:'auto', paddingBottom:'0.5rem' }}>
              {['Travel', 'Food', 'Architecture', 'Nature', '+'].map((hl, i) => (
                <div key={hl} style={{
                  display:'flex', flexDirection:'column',
                  alignItems:'center', gap:'0.4rem', flexShrink:0, cursor:'pointer',
                }}>
                  <div style={{
                    width:'60px', height:'60px', borderRadius:'50%',
                    border: hl === '+' ? '2px dashed #2a2a2a' : '2px solid #2a2a2a',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.4rem', background: hl === '+' ? 'transparent' : '#111',
                    transition:'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
                    onMouseLeave={e => e.currentTarget.style.borderColor= hl === '+' ? '#2a2a2a' : '#2a2a2a'}
                  >
                    {hl === 'Travel' ? '✈️' : hl === 'Food' ? '☕' : hl === 'Architecture' ? '🏛' : hl === 'Nature' ? '🌿' : hl}
                  </div>
                  <span style={{ fontSize:'0.65rem', color:'#555' }}>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display:'flex', borderBottom:'1px solid #2a2a2a',
            marginBottom:'1.25rem',
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background:'transparent', border:'none',
                borderBottom: activeTab === tab.id ? '2px solid #e8c97e' : '2px solid transparent',
                padding:'0.65rem 1.5rem', fontSize:'0.82rem',
                color: activeTab === tab.id ? '#f0ede8' : '#555',
                fontWeight: activeTab === tab.id ? 500 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                marginBottom:'-1px', transition:'all 0.2s',
              }}>
                {tab.label}
                {tab.count && (
                  <span style={{ marginLeft:'0.35rem', fontSize:'0.72rem', color:'#555' }}>
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
              {user.posts_data.map((post, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/post/1')}
                  onMouseEnter={() => setHoveredPost(i)}
                  onMouseLeave={() => setHoveredPost(null)}
                  style={{
                    aspectRatio:'1', background: post.bg,
                    display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'2.5rem',
                    cursor:'pointer', position:'relative',
                    transition:'transform 0.15s',
                    transform: hoveredPost === i ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {post.emoji}
                  {hoveredPost === i && (
                    <div style={{
                      position:'absolute', inset:0,
                      background:'rgba(10,10,10,0.7)',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', gap:'1.5rem',
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

          {activeTab === 'reels' && (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>▷</div>
              <p style={{ fontSize:'0.9rem' }}>No reels yet</p>
            </div>
          )}

          {activeTab === 'tagged' && (
            <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🏷</div>
              <p style={{ fontSize:'0.9rem' }}>No tagged posts</p>
            </div>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width:'260px', flexShrink:0, padding:'2rem 1.5rem',
        borderLeft:'1px solid #2a2a2a',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        {/* Creator insights — Inspira shows this, Instagram doesn't */}
        <div style={{
          background:'rgba(232,201,126,0.05)',
          border:'1px solid rgba(232,201,126,0.15)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
            ✦ Creator insights
          </div>
          {[
            { label:'Avg reach/post', value: user.totalReach },
            { label:'Engagement rate', value: user.avgEngagement },
            { label:'Posts/week', value:'4.2/wk' },
            { label:'Response rate', value:'94%' },
            { label:'Creator score', value:'A+' },
          ].map((item, i) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', padding:'0.45rem 0',
              borderBottom: i < 4 ? '1px solid rgba(232,201,126,0.08)' : 'none',
            }}>
              <span style={{ fontSize:'0.75rem', color:'#666' }}>{item.label}</span>
              <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#e8c97e' }}>{item.value}</span>
            </div>
          ))}
          <p style={{ fontSize:'0.68rem', color:'#444', marginTop:'0.75rem', lineHeight:1.5 }}>
            Instagram never shows you this. Inspira believes you should know who you're following.
          </p>
        </div>

        {/* Similar creators */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
            Similar creators
          </div>
          {[
            { name:'Arjun Lens', handle:'arjun.lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', followers:'41k' },
            { name:'Cosmos Lens', handle:'cosmos.lens', avatar:'CL', gradient:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', followers:'124k' },
            { name:'Urban Frames', handle:'urban.frames', avatar:'UF', gradient:'linear-gradient(135deg,#12120a,#2a2a10)', followers:'67k' },
          ].map(creator => (
            <div key={creator.handle} style={{
              display:'flex', alignItems:'center', gap:'0.65rem',
              padding:'0.5rem 0', borderBottom:'1px solid #1a1a1a',
              cursor:'pointer',
            }}
              onClick={() => navigate(`/user/${creator.handle}`)}
            >
              <div style={{
                width:'32px', height:'32px', borderRadius:'50%',
                background: creator.gradient, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'0.62rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
              }}>{creator.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.78rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {creator.name}
                </div>
                <div style={{ fontSize:'0.68rem', color:'#555' }}>{creator.followers} followers</div>
              </div>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.2rem 0.6rem',
                color:'#e8c97e', fontSize:'0.68rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>Follow</button>
            </div>
          ))}
        </div>

        {/* Collab request — Inspira exclusive */}
        {following && (
          <div style={{
            background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'14px', padding:'1.25rem',
          }}>
            <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              ✦ Collab tools
            </div>
            <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, marginBottom:'0.85rem' }}>
              You follow {user.name}. You can send a collab invite to co-create a post together.
            </p>
            <button style={{
              width:'100%', background:'rgba(232,201,126,0.1)',
              border:'1px solid rgba(232,201,126,0.25)',
              borderRadius:'100px', padding:'0.55rem',
              color:'#e8c97e', fontSize:'0.78rem', fontWeight:500,
              cursor:'pointer', fontFamily:"'Outfit',sans-serif",
              transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(232,201,126,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(232,201,126,0.1)'}
            >Send collab invite ✦</button>
          </div>
        )}
      </aside>
    </div>
  )
}