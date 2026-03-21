import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const weeklyData = [
  { day:'Mon', reach:1200, impressions:1800, engagement:4.2, followers:12 },
  { day:'Tue', reach:980, impressions:1450, engagement:3.8, followers:8 },
  { day:'Wed', reach:2400, impressions:3200, engagement:6.1, followers:24 },
  { day:'Thu', reach:1800, impressions:2600, engagement:5.2, followers:18 },
  { day:'Fri', reach:3200, impressions:4800, engagement:7.8, followers:41 },
  { day:'Sat', reach:4100, impressions:6200, engagement:8.9, followers:56 },
  { day:'Sun', reach:3600, impressions:5400, engagement:7.2, followers:38 },
]

const topPosts = [
  { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', reach:'14.2k', impressions:'22.8k', likes:1842, comments:47, saves:312, shares:89, engagementRate:'8.4%', bestTime:'6:00 PM Sat' },
  { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', reach:'28.5k', impressions:'45.2k', likes:3291, comments:89, saves:891, shares:234, engagementRate:'11.2%', bestTime:'9:00 PM Fri' },
  { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', reach:'41.8k', impressions:'68.4k', likes:5103, comments:124, saves:1204, shares:456, engagementRate:'12.8%', bestTime:'8:00 AM Sun' },
  { emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)', reach:'9.2k', impressions:'14.1k', likes:892, comments:34, saves:201, shares:67, engagementRate:'6.1%', bestTime:'7:00 PM Wed' },
]

const audienceData = {
  ageGroups: [
    { label:'18-24', pct:28 },
    { label:'25-34', pct:42 },
    { label:'35-44', pct:18 },
    { label:'45-54', pct:8 },
    { label:'55+', pct:4 },
  ],
  topCities: [
    { city:'Hyderabad', pct:34 },
    { city:'Bangalore', pct:22 },
    { city:'Mumbai', pct:18 },
    { city:'Delhi', pct:12 },
    { city:'Chennai', pct:8 },
  ],
  gender: { male:44, female:54, other:2 },
  activeHours: [
    { hour:'6AM', val:20 },
    { hour:'9AM', val:45 },
    { hour:'12PM', val:60 },
    { hour:'3PM', val:55 },
    { hour:'6PM', val:85 },
    { hour:'9PM', val:95 },
    { hour:'12AM', val:40 },
  ],
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activePeriod, setActivePeriod] = useState('7d')
  const [activeMetric, setActiveMetric] = useState('reach')

  const maxVal = Math.max(...weeklyData.map(d => d[activeMetric] || d.reach))

  const tabs = [
    { id:'overview', label:'Overview' },
    { id:'content', label:'Content' },
    { id:'audience', label:'Audience' },
    { id:'reach', label:'Reach & Impressions' },
    { id:'growth', label:'Growth' },
  ]

  const periods = ['7d', '28d', '90d', '1y']

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{
        flex:1, padding:'2rem 3vw',
        borderRight:'1px solid #2a2a2a', overflowY:'auto',
      }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'1.5rem',
          }}>
            <div>
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Analytics</h1>
              <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
                Full insights — free for every creator on Inspira
              </p>
            </div>
            <div style={{ display:'flex', gap:'0.4rem' }}>
              {periods.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  style={{
                    background: activePeriod === p ? '#e8c97e' : '#111',
                    color: activePeriod === p ? '#0a0a0a' : '#555',
                    border: activePeriod === p ? 'none' : '1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.35rem 0.85rem',
                    fontSize:'0.78rem', fontWeight: activePeriod === p ? 600 : 400,
                    cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                    transition:'all 0.2s',
                  }}
                >{p}</button>
              ))}
            </div>
          </div>

          {/* Inspira advantage */}
          <div style={{
            background:'rgba(232,201,126,0.04)',
            border:'1px solid rgba(232,201,126,0.1)',
            borderRadius:'12px', padding:'0.75rem 1rem',
            marginBottom:'1.5rem',
            display:'flex', alignItems:'center', gap:'0.75rem',
          }}>
            <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
            <p style={{ fontSize:'0.75rem', color:'#555', margin:0, lineHeight:1.6 }}>
              Instagram locks most of these metrics behind business accounts and Meta Business Suite. On Inspira, every creator gets full analytics — reach, impressions, audience insights, best posting times — completely free.
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display:'flex', borderBottom:'1px solid #2a2a2a',
            marginBottom:'2rem', overflowX:'auto',
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background:'transparent', border:'none',
                borderBottom: activeTab === tab.id ? '2px solid #e8c97e' : '2px solid transparent',
                padding:'0.65rem 1.25rem', fontSize:'0.82rem',
                color: activeTab === tab.id ? '#f0ede8' : '#555',
                fontWeight: activeTab === tab.id ? 500 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                marginBottom:'-1px', transition:'all 0.2s',
                whiteSpace:'nowrap', flexShrink:0,
              }}>{tab.label}</button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

              {/* Key metrics */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem',
              }}>
                {[
                  { label:'Total reach', value:'248.4k', change:'+18%', up:true, inspira:false },
                  { label:'Impressions', value:'412.8k', change:'+24%', up:true, inspira:false },
                  { label:'Profile visits', value:'18.2k', change:'+8%', up:true, inspira:false },
                  { label:'Saves rate ✦', value:'4.2%', change:'+1.1%', up:true, inspira:true },
                ].map(metric => (
                  <div key={metric.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.1rem',
                    borderTop: metric.inspira ? '2px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                  }}>
                    <div style={{ fontSize:'0.68rem', color: metric.inspira ? '#e8c97e' : '#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.7rem', fontWeight:600, color:'#f0ede8',
                      lineHeight:1, marginBottom:'0.3rem',
                    }}>{metric.value}</div>
                    <div style={{ fontSize:'0.72rem', color: metric.up ? '#6fcf97' : '#c96f6f', fontWeight:500 }}>
                      {metric.change} this {activePeriod}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>
                    Performance over time
                  </div>
                  <div style={{ display:'flex', gap:'0.4rem' }}>
                    {['reach','impressions','engagement','followers'].map(m => (
                      <button
                        key={m}
                        onClick={() => setActiveMetric(m)}
                        style={{
                          background: activeMetric === m ? 'rgba(232,201,126,0.15)' : 'transparent',
                          color: activeMetric === m ? '#e8c97e' : '#555',
                          border: activeMetric === m ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                          borderRadius:'100px', padding:'0.25rem 0.75rem',
                          fontSize:'0.72rem', cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                          textTransform:'capitalize',
                        }}
                      >{m}</button>
                    ))}
                  </div>
                </div>

                {/* Bar chart */}
                <div style={{
                  display:'flex', alignItems:'flex-end',
                  gap:'0.75rem', height:'160px', marginBottom:'0.5rem',
                }}>
                  {weeklyData.map((d, i) => {
                    const val = d[activeMetric] || d.reach
                    const height = (val / maxVal) * 100
                    return (
                      <div key={d.day} style={{
                        flex:1, display:'flex', flexDirection:'column',
                        alignItems:'center', gap:'0.35rem', height:'100%',
                        justifyContent:'flex-end',
                      }}>
                        <div style={{ fontSize:'0.6rem', color:'#e8c97e', opacity: i === 4 || i === 5 ? 1 : 0 }}>
                          {i === 5 ? 'Peak' : ''}
                        </div>
                        <div
                          title={`${d.day}: ${val}`}
                          style={{
                            width:'100%', borderRadius:'6px 6px 0 0',
                            background: i === 5 ? '#e8c97e' : i === 4 ? 'rgba(232,201,126,0.5)' : 'rgba(232,201,126,0.2)',
                            height:`${height}%`, minHeight:'4px',
                            transition:'height 0.4s, background 0.2s',
                            cursor:'pointer',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background='rgba(232,201,126,0.7)'}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = i === 5 ? '#e8c97e' : i === 4 ? 'rgba(232,201,126,0.5)' : 'rgba(232,201,126,0.2)'
                          }}
                        />
                        <div style={{ fontSize:'0.65rem', color:'#555' }}>{d.day}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick stats row */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem',
              }}>
                {[
                  { label:'Avg engagement rate', value:'6.8%', sub:'Industry avg: 3.2%', good:true },
                  { label:'Best posting day', value:'Saturday', sub:'2.4x avg reach', good:true },
                  { label:'Follower growth rate', value:'+197/week', sub:'+12% vs last period', good:true },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.1rem',
                  }}>
                    <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.5rem', fontWeight:600, color:'#f0ede8',
                      lineHeight:1, marginBottom:'0.3rem',
                    }}>{stat.value}</div>
                    <div style={{ fontSize:'0.72rem', color:'#6fcf97' }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Top performing posts
                </div>
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'auto 1fr 1fr 1fr 1fr 1fr 1fr',
                  gap:'0.5rem', alignItems:'center',
                  fontSize:'0.68rem', color:'#555',
                  textTransform:'uppercase', letterSpacing:'0.08em',
                  marginBottom:'0.75rem', paddingBottom:'0.75rem',
                  borderBottom:'1px solid #1a1a1a',
                }}>
                  <span>Post</span>
                  <span>Reach</span>
                  <span>Impressions</span>
                  <span>Likes</span>
                  <span>Comments</span>
                  <span>Saves</span>
                  <span>Rate</span>
                </div>
                {topPosts.map((post, i) => (
                  <div key={i} style={{
                    display:'grid',
                    gridTemplateColumns:'auto 1fr 1fr 1fr 1fr 1fr 1fr',
                    gap:'0.5rem', alignItems:'center',
                    padding:'0.65rem 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'8px',
                      background: post.bg, display:'flex',
                      alignItems:'center', justifyContent:'center',
                      fontSize:'1.2rem', flexShrink:0,
                    }}>{post.emoji}</div>
                    <span style={{ fontSize:'0.82rem', color:'#f0ede8', fontWeight:500 }}>{post.reach}</span>
                    <span style={{ fontSize:'0.82rem', color:'#888' }}>{post.impressions}</span>
                    <span style={{ fontSize:'0.82rem', color:'#888' }}>{post.likes.toLocaleString()}</span>
                    <span style={{ fontSize:'0.82rem', color:'#888' }}>{post.comments}</span>
                    <span style={{ fontSize:'0.82rem', color:'#888' }}>{post.saves}</span>
                    <span style={{
                      fontSize:'0.78rem', fontWeight:600,
                      color: parseFloat(post.engagementRate) > 8 ? '#6fcf97' : '#e8c97e',
                    }}>{post.engagementRate}</span>
                  </div>
                ))}
              </div>

              {/* Content type breakdown */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Performance by content type
                </div>
                {[
                  { type:'Reels', reach:'184k', engRate:'9.2%', posts:8, bar:85 },
                  { type:'Carousels', reach:'124k', engRate:'7.8%', posts:12, bar:65 },
                  { type:'Photos', reach:'89k', engRate:'5.4%', posts:22, bar:45 },
                  { type:'Stories', reach:'42k', engRate:'4.1%', posts:48, bar:30 },
                ].map((type, i) => (
                  <div key={type.type} style={{
                    display:'grid', gridTemplateColumns:'120px 1fr 80px 80px',
                    gap:'1rem', alignItems:'center',
                    padding:'0.65rem 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>
                      {type.type}
                    </div>
                    <div>
                      <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'6px', overflow:'hidden' }}>
                        <div style={{
                          width:`${type.bar}%`, height:'100%',
                          background: i === 0 ? '#e8c97e' : 'rgba(232,201,126,0.4)',
                          borderRadius:'100px',
                        }}/>
                      </div>
                    </div>
                    <div style={{ fontSize:'0.78rem', color:'#888', textAlign:'center' }}>{type.reach}</div>
                    <div style={{ fontSize:'0.78rem', color:'#6fcf97', fontWeight:500, textAlign:'right' }}>{type.engRate}</div>
                  </div>
                ))}
                <div style={{
                  marginTop:'1rem', padding:'0.75rem',
                  background:'rgba(232,201,126,0.05)',
                  border:'1px solid rgba(232,201,126,0.1)',
                  borderRadius:'10px', fontSize:'0.75rem', color:'#555',
                }}>
                  ✦ Reels get 2.1x more reach than photos for your audience. Consider posting more Reels.
                </div>
              </div>

              {/* Best times to post */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:'1.25rem',
                }}>
                  <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>
                    Best times to post
                  </div>
                  <div style={{ fontSize:'0.65rem', color:'#e8c97e' }}>
                    ✦ Inspira exclusive — Instagram never shows this
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'flex-end', gap:'0.5rem', height:'80px' }}>
                  {audienceData.activeHours.map((h, i) => (
                    <div key={h.hour} style={{
                      flex:1, display:'flex', flexDirection:'column',
                      alignItems:'center', gap:'0.3rem', height:'100%',
                      justifyContent:'flex-end',
                    }}>
                      <div style={{
                        width:'100%', borderRadius:'4px 4px 0 0',
                        background: h.val > 80 ? '#e8c97e' : h.val > 60 ? 'rgba(232,201,126,0.5)' : 'rgba(232,201,126,0.15)',
                        height:`${h.val}%`, minHeight:'3px',
                      }}/>
                      <span style={{ fontSize:'0.58rem', color:'#555' }}>{h.hour}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'0.75rem', fontSize:'0.72rem', color:'#555' }}>
                  Peak: <span style={{ color:'#e8c97e', fontWeight:500 }}>9:00 PM</span> · Your followers are most active on <span style={{ color:'#e8c97e', fontWeight:500 }}>Friday & Saturday evenings</span>
                </div>
              </div>
            </div>
          )}

          {/* AUDIENCE TAB */}
          {activeTab === 'audience' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

              {/* Summary */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem',
              }}>
                {[
                  { label:'Total followers', value:'12,441', change:'+197 this week' },
                  { label:'Accounts reached', value:'48.2k', change:'Unique accounts' },
                  { label:'Follower ratio', value:'13.9x', change:'Following 891' },
                ].map(s => (
                  <div key={s.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.1rem',
                  }}>
                    <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>{s.label}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:600, color:'#f0ede8', lineHeight:1, marginBottom:'0.3rem' }}>{s.value}</div>
                    <div style={{ fontSize:'0.72rem', color:'#6fcf97' }}>{s.change}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>

                {/* Age groups */}
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'14px', padding:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                    Age groups
                  </div>
                  {audienceData.ageGroups.map((ag, i) => (
                    <div key={ag.label} style={{ marginBottom:'0.75rem' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', color:'#888', marginBottom:'0.3rem' }}>
                        <span>{ag.label}</span>
                        <span style={{ color: i === 1 ? '#e8c97e' : '#555' }}>{ag.pct}%</span>
                      </div>
                      <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'6px', overflow:'hidden' }}>
                        <div style={{
                          width:`${ag.pct}%`, height:'100%',
                          background: i === 1 ? '#e8c97e' : 'rgba(232,201,126,0.25)',
                          borderRadius:'100px',
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gender */}
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'14px', padding:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                    Gender
                  </div>
                  <div style={{ display:'flex', gap:'1rem', marginBottom:'1.25rem' }}>
                    {[
                      { label:'Female', pct: audienceData.gender.female, color:'#9b8ede' },
                      { label:'Male', pct: audienceData.gender.male, color:'#7eb8e8' },
                      { label:'Other', pct: audienceData.gender.other, color:'#6fcf97' },
                    ].map(g => (
                      <div key={g.label} style={{ flex:1, textAlign:'center' }}>
                        <div style={{
                          fontFamily:"'Cormorant Garamond',serif",
                          fontSize:'2rem', fontWeight:600,
                          color: g.color, lineHeight:1, marginBottom:'0.35rem',
                        }}>{g.pct}%</div>
                        <div style={{ fontSize:'0.72rem', color:'#555' }}>{g.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'8px', overflow:'hidden', display:'flex' }}>
                    <div style={{ width:`${audienceData.gender.female}%`, background:'#9b8ede', height:'100%' }}/>
                    <div style={{ width:`${audienceData.gender.male}%`, background:'#7eb8e8', height:'100%' }}/>
                    <div style={{ width:`${audienceData.gender.other}%`, background:'#6fcf97', height:'100%' }}/>
                  </div>

                  {/* Top cities */}
                  <div style={{ marginTop:'1.5rem' }}>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>
                      Top cities
                    </div>
                    {audienceData.topCities.map((city, i) => (
                      <div key={city.city} style={{
                        display:'flex', alignItems:'center',
                        justifyContent:'space-between', marginBottom:'0.4rem',
                      }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                          <span style={{ fontSize:'0.72rem', color:'#444', width:'16px' }}>{i + 1}</span>
                          <span style={{ fontSize:'0.78rem', color:'#888' }}>{city.city}</span>
                        </div>
                        <span style={{ fontSize:'0.75rem', color: i === 0 ? '#e8c97e' : '#555', fontWeight: i === 0 ? 500 : 400 }}>
                          {city.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Follower quality — Inspira exclusive */}
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                  ✦ Follower quality score — Inspira exclusive
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
                  {[
                    { label:'Real accounts', value:'94%', desc:'Not bots' },
                    { label:'Active followers', value:'78%', desc:'Engaged in 30d' },
                    { label:'Engaged followers', value:'8.4%', desc:'Interact with posts' },
                    { label:'Quality score', value:'A+', desc:'Top 5% of creators' },
                  ].map(score => (
                    <div key={score.label} style={{
                      background:'rgba(10,10,10,0.5)', borderRadius:'12px',
                      padding:'1rem', textAlign:'center',
                    }}>
                      <div style={{
                        fontFamily:"'Cormorant Garamond',serif",
                        fontSize:'1.6rem', fontWeight:600, color:'#e8c97e',
                        lineHeight:1, marginBottom:'0.25rem',
                      }}>{score.value}</div>
                      <div style={{ fontSize:'0.72rem', color:'#888', marginBottom:'0.2rem' }}>{score.label}</div>
                      <div style={{ fontSize:'0.65rem', color:'#555' }}>{score.desc}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:'0.72rem', color:'#444', marginTop:'0.85rem', lineHeight:1.6 }}>
                  Instagram never tells you if your followers are real or bots. Inspira analyzes your follower quality so you know your true audience.
                </p>
              </div>
            </div>
          )}

          {/* REACH & IMPRESSIONS TAB */}
          {activeTab === 'reach' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'0.85rem 1rem',
                fontSize:'0.75rem', color:'#555', lineHeight:1.6,
              }}>
                ✦ <strong style={{ color:'#e8c97e' }}>Reach</strong> = unique accounts that saw your content. <strong style={{ color:'#e8c97e' }}>Impressions</strong> = total times your content was shown (including repeats). Instagram shows reach only in aggregate. Inspira shows per-post reach for every post, free.
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                {[
                  { label:'Total reach', value:'248.4k', breakdown:[
                    { source:'From feed', pct:45, val:'111.8k' },
                    { source:'From explore', pct:28, val:'69.6k' },
                    { source:'From hashtags', pct:18, val:'44.7k' },
                    { source:'From profile', pct:9, val:'22.3k' },
                  ]},
                  { label:'Total impressions', value:'412.8k', breakdown:[
                    { source:'From feed', pct:50, val:'206.4k' },
                    { source:'From explore', pct:24, val:'99.1k' },
                    { source:'From hashtags', pct:16, val:'66k' },
                    { source:'From profile', pct:10, val:'41.3k' },
                  ]},
                ].map(card => (
                  <div key={card.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.5rem',
                  }}>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.35rem' }}>
                      {card.label}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'2rem', fontWeight:600, color:'#f0ede8',
                      lineHeight:1, marginBottom:'1.25rem',
                    }}>{card.value}</div>
                    {card.breakdown.map((b, i) => (
                      <div key={b.source} style={{ marginBottom:'0.65rem' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'#888', marginBottom:'0.3rem' }}>
                          <span>{b.source}</span>
                          <span style={{ color:'#555' }}>{b.val} ({b.pct}%)</span>
                        </div>
                        <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'5px', overflow:'hidden' }}>
                          <div style={{
                            width:`${b.pct}%`, height:'100%',
                            background: i === 0 ? '#e8c97e' : `rgba(232,201,126,${0.6 - i * 0.15})`,
                            borderRadius:'100px',
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GROWTH TAB */}
          {activeTab === 'growth' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem',
              }}>
                {[
                  { label:'New followers', value:'+197', period:'this week', color:'#6fcf97' },
                  { label:'Lost followers', value:'-23', period:'this week', color:'#c96f6f' },
                  { label:'Net growth', value:'+174', period:'this week', color:'#e8c97e' },
                  { label:'Growth rate', value:'+1.4%', period:'this week', color:'#6fcf97' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.1rem',
                  }}>
                    <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>{stat.label}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:600, color: stat.color, lineHeight:1, marginBottom:'0.3rem' }}>{stat.value}</div>
                    <div style={{ fontSize:'0.72rem', color:'#555' }}>{stat.period}</div>
                  </div>
                ))}
              </div>

              {/* Growth milestones — Inspira exclusive */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Growth milestones ✦
                </div>
                {[
                  { milestone:'100 followers', date:'Jan 2025', days:null, reached:true },
                  { milestone:'1,000 followers', date:'Apr 2025', days:null, reached:true },
                  { milestone:'5,000 followers', date:'Aug 2025', days:null, reached:true },
                  { milestone:'10,000 followers', date:'Nov 2025', days:null, reached:true },
                  { milestone:'12,441 followers', date:'Today', days:null, reached:true, current:true },
                  { milestone:'15,000 followers', date:'Est. Apr 2026', days:18, reached:false },
                  { milestone:'25,000 followers', date:'Est. Jul 2026', days:95, reached:false },
                  { milestone:'50,000 followers', date:'Est. Dec 2026', days:195, reached:false },
                ].map((m, i) => (
                  <div key={m.milestone} style={{
                    display:'flex', alignItems:'center', gap:'1rem',
                    padding:'0.6rem 0',
                    borderBottom: i < 7 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{
                      width:'10px', height:'10px', borderRadius:'50%',
                      background: m.current ? '#e8c97e' : m.reached ? '#6fcf97' : '#2a2a2a',
                      flexShrink:0,
                      boxShadow: m.current ? '0 0 8px rgba(232,201,126,0.5)' : 'none',
                    }}/>
                    <div style={{ flex:1 }}>
                      <span style={{
                        fontSize:'0.82rem',
                        color: m.current ? '#e8c97e' : m.reached ? '#f0ede8' : '#555',
                        fontWeight: m.current ? 600 : 400,
                      }}>{m.milestone}</span>
                    </div>
                    <span style={{
                      fontSize:'0.72rem',
                      color: m.current ? '#e8c97e' : m.reached ? '#555' : '#444',
                    }}>{m.date}</span>
                    {m.days && (
                      <span style={{
                        background:'rgba(232,201,126,0.08)',
                        border:'1px solid rgba(232,201,126,0.15)',
                        borderRadius:'100px', padding:'0.15rem 0.6rem',
                        fontSize:'0.65rem', color:'#e8c97e',
                      }}>~{m.days} days</span>
                    )}
                  </div>
                ))}
              </div>

              {/* What's driving growth */}
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                  ✦ What's driving your growth
                </div>
                {[
                  { factor:'Reels performance', impact:'High', desc:'Your Reels are getting 3.2x more reach than avg — keep posting them', color:'#6fcf97' },
                  { factor:'Posting consistency', impact:'Medium', desc:'You post 4.2x/week — the algorithm rewards this', color:'#e8c97e' },
                  { factor:'Engagement rate', impact:'High', desc:'8.4% is excellent — Instagram average is 3.2%', color:'#6fcf97' },
                  { factor:'Hashtag strategy', impact:'Low', desc:'Your hashtags drive only 18% of reach — consider diversifying', color:'#c96f6f' },
                ].map(item => (
                  <div key={item.factor} style={{
                    display:'flex', gap:'0.85rem', alignItems:'flex-start',
                    padding:'0.65rem 0', borderBottom:'1px solid #1a1a1a',
                  }}>
                    <div style={{
                      width:'8px', height:'8px', borderRadius:'50%',
                      background: item.color, flexShrink:0, marginTop:'5px',
                    }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem' }}>
                        <span style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>{item.factor}</span>
                        <span style={{
                          fontSize:'0.62rem', color: item.color,
                          background: `rgba(${item.color === '#6fcf97' ? '111,207,151' : item.color === '#e8c97e' ? '232,201,126' : '201,111,111'},0.1)`,
                          padding:'0.1rem 0.45rem', borderRadius:'100px',
                        }}>{item.impact}</span>
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', lineHeight:1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width:'260px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        {/* Account health */}
        <div style={{
          background:'rgba(111,207,151,0.05)',
          border:'1px solid rgba(111,207,151,0.15)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#6fcf97', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            Account health
          </div>
          {[
            { label:'Shadowban status', value:'None ✓', color:'#6fcf97' },
            { label:'Content violations', value:'0', color:'#6fcf97' },
            { label:'Reach suppression', value:'None', color:'#6fcf97' },
            { label:'Algorithm standing', value:'Good', color:'#6fcf97' },
          ].map((item, i) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', padding:'0.45rem 0',
              borderBottom: i < 3 ? '1px solid rgba(111,207,151,0.08)' : 'none',
            }}>
              <span style={{ fontSize:'0.75rem', color:'#666' }}>{item.label}</span>
              <span style={{ fontSize:'0.75rem', color: item.color, fontWeight:500 }}>{item.value}</span>
            </div>
          ))}
          <div style={{
            marginTop:'0.85rem', fontSize:'0.65rem', color:'#555', lineHeight:1.5,
          }}>
            ✦ Instagram never tells you your shadowban status. Inspira always does.
          </div>
        </div>

        {/* Smart recommendations */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            ✦ Smart recommendations
          </div>
          {[
            { icon:'📹', tip:'Post a Reel today — you haven\'t in 3 days and your reach drops 40% when you skip' },
            { icon:'⏰', tip:'Post at 9 PM tonight — your audience is 2.1x more active' },
            { icon:'🏷', tip:'Try #streetphotography — 91k posts, high engagement in your niche' },
            { icon:'💬', tip:'Reply to 3 comments you\'ve missed — boosts algorithmic reach' },
          ].map(rec => (
            <div key={rec.tip} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.65rem', padding:'0.5rem',
              background:'#1a1a1a', borderRadius:'8px',
            }}>
              <span style={{ fontSize:'0.85rem', flexShrink:0 }}>{rec.icon}</span>
              <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{rec.tip}</span>
            </div>
          ))}
        </div>

        {/* vs Instagram */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            ✦ Analytics fixes
          </div>
          {[
            ['📊', 'Full analytics — free for all'],
            ['👁', 'Per-post reach shown always'],
            ['🤖', 'Follower quality / bot detection'],
            ['🚫', 'Shadowban status visible'],
            ['⏰', 'Best time to post — your data'],
            ['📈', 'Growth milestone predictions'],
            ['🧠', 'Smart posting recommendations'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display:'flex', gap:'0.6rem', marginBottom:'0.45rem' }}>
              <span style={{ fontSize:'0.75rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}