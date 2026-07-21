import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const earningsData = [
  { month:'Oct', amount:0 },
  { month:'Nov', amount:0 },
  { month:'Dec', amount:120 },
  { month:'Jan', amount:340 },
  { month:'Feb', amount:280 },
  { month:'Mar', amount:520 },
]

export default function Monetization() {
  const [activeTab, setActiveTab] = useState('overview')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [showWithdraw, setShowWithdraw] = useState(false)

  const tabs = [
    { id:'overview', label:'Overview' },
    { id:'fund', label:'Creator Fund' },
    { id:'subscriptions', label:'Subscriptions' },
    { id:'tips', label:'Tips' },
    { id:'collabs', label:'Brand Collabs' },
    { id:'payouts', label:'Payouts' },
  ]

  const maxEarning = Math.max(...earningsData.map(d => d.amount))

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
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{
            display:'flex', alignItems:'flex-start',
            justifyContent:'space-between', marginBottom:'2rem',
          }}>
            <div>
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Monetization</h1>
              <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
                Earn fairly from your creativity
              </p>
            </div>
            <div style={{
              background:'rgba(232,201,126,0.08)',
              border:'1px solid rgba(232,201,126,0.2)',
              borderRadius:'12px', padding:'0.75rem 1.25rem',
              textAlign:'right',
            }}>
              <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.25rem' }}>
                Total balance
              </div>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'2rem', fontWeight:600, color:'#e8c97e', lineHeight:1,
              }}>₹1,260</div>
              <button
                onClick={() => setShowWithdraw(true)}
                style={{
                  background:'#e8c97e', color:'#0a0a0a', border:'none',
                  borderRadius:'100px', padding:'0.35rem 1rem',
                  fontSize:'0.72rem', fontWeight:600, cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", marginTop:'0.5rem',
                }}
              >Withdraw →</button>
            </div>
          </div>

          {/* Inspira vs Instagram comparison */}
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr',
            gap:'1rem', marginBottom:'2rem',
          }}>
            <div style={{
              background:'rgba(201,111,111,0.05)',
              border:'1px solid rgba(201,111,111,0.15)',
              borderRadius:'14px', padding:'1.25rem',
            }}>
              <div style={{ fontSize:'0.65rem', color:'#c96f6f', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
                📸 Instagram
              </div>
              {[
                ['Takes up to 55% cut on subscriptions'],
                ['Reels bonus program — closed/unpredictable'],
                ['Minimum 10k followers to monetize'],
                ['Payments delayed 30-60 days'],
                ['No transparency on how earnings are calculated'],
              ].map(([text]) => (
                <div key={text} style={{ display:'flex', gap:'0.5rem', marginBottom:'0.4rem' }}>
                  <span style={{ color:'#c96f6f', flexShrink:0, fontSize:'0.75rem' }}>✗</span>
                  <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{
              background:'rgba(232,201,126,0.05)',
              border:'1px solid rgba(232,201,126,0.15)',
              borderRadius:'14px', padding:'1.25rem',
            }}>
              <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
                ✦ Inspira
              </div>
              {[
                ['Only 15% cut — you keep 85%'],
                ['Creator Fund — open to all, always on'],
                ['Start earning from day 1 — no follower minimum'],
                ['Weekly payouts, no delays'],
                ['Full earnings breakdown — every rupee explained'],
              ].map(([text]) => (
                <div key={text} style={{ display:'flex', gap:'0.5rem', marginBottom:'0.4rem' }}>
                  <span style={{ color:'#6fcf97', flexShrink:0, fontSize:'0.75rem' }}>✓</span>
                  <span style={{ fontSize:'0.75rem', color:'#888', lineHeight:1.5 }}>{text}</span>
                </div>
              ))}
            </div>
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

              {/* Stats grid */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(4,1fr)',
                gap:'1rem',
              }}>
                {[
                  { label:'This month', value:'₹520', change:'+86%', up:true },
                  { label:'Total earned', value:'₹1,260', change:'All time', up:true },
                  { label:'Pending', value:'₹340', change:'Pays Friday', up:true },
                  { label:'Avg per post', value:'₹108', change:'+12%', up:true },
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
                      fontSize:'1.6rem', fontWeight:600, color:'#f0ede8',
                      lineHeight:1, marginBottom:'0.3rem',
                    }}>{stat.value}</div>
                    <div style={{ fontSize:'0.72rem', color: stat.up ? '#6fcf97' : '#c96f6f', fontWeight:500 }}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Earnings chart */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>
                    Earnings over time
                  </div>
                  <div style={{ fontSize:'0.65rem', color:'#e8c97e', background:'rgba(232,201,126,0.1)', padding:'0.2rem 0.6rem', borderRadius:'100px' }}>
                    ✦ Full breakdown — Instagram never shows this
                  </div>
                </div>

                {/* Bar chart */}
                <div style={{
                  display:'flex', alignItems:'flex-end',
                  gap:'0.75rem', height:'140px',
                  paddingBottom:'0.5rem',
                }}>
                  {earningsData.map((d, i) => (
                    <div key={d.month} style={{
                      flex:1, display:'flex', flexDirection:'column',
                      alignItems:'center', gap:'0.4rem', height:'100%',
                      justifyContent:'flex-end',
                    }}>
                      <div style={{
                        fontSize:'0.65rem', color:'#e8c97e', fontWeight:500,
                        opacity: d.amount > 0 ? 1 : 0,
                      }}>₹{d.amount}</div>
                      <div style={{
                        width:'100%', borderRadius:'6px 6px 0 0',
                        background: i === earningsData.length - 1
                          ? '#e8c97e'
                          : 'rgba(232,201,126,0.2)',
                        height: d.amount > 0
                          ? `${(d.amount / maxEarning) * 100}%`
                          : '4px',
                        minHeight:'4px',
                        transition:'height 0.3s',
                      }}/>
                      <div style={{ fontSize:'0.65rem', color:'#555' }}>{d.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue breakdown */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Revenue breakdown
                </div>
                {[
                  { source:'Creator Fund', amount:'₹680', pct:54, color:'#e8c97e' },
                  { source:'Tips received', amount:'₹320', pct:25, color:'#6fcf97' },
                  { source:'Brand collabs', amount:'₹260', pct:21, color:'#7eb8e8' },
                ].map(item => (
                  <div key={item.source} style={{ marginBottom:'0.85rem' }}>
                    <div style={{
                      display:'flex', justifyContent:'space-between',
                      fontSize:'0.78rem', marginBottom:'0.35rem',
                    }}>
                      <span style={{ color:'#888' }}>{item.source}</span>
                      <span style={{ color:'#f0ede8', fontWeight:500 }}>{item.amount}</span>
                    </div>
                    <div style={{
                      background:'#1a1a1a', borderRadius:'100px',
                      height:'6px', overflow:'hidden',
                    }}>
                      <div style={{
                        width:`${item.pct}%`, height:'100%',
                        background: item.color, borderRadius:'100px',
                        transition:'width 0.5s',
                      }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top earning posts */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Top earning posts
                </div>
                {[
                  { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', earned:'₹180', reach:'14.2k', likes:'1,842' },
                  { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', earned:'₹156', reach:'28.5k', likes:'3,291' },
                  { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', earned:'₹120', reach:'41.8k', likes:'5,103' },
                  { emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', earned:'₹98', reach:'9.2k', likes:'892' },
                ].map((post, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:'0.85rem',
                    padding:'0.65rem 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{
                      width:'44px', height:'44px', borderRadius:'8px',
                      background: post.bg, display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'1.3rem', flexShrink:0,
                    }}>{post.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.78rem', color:'#888' }}>
                        👁 {post.reach} reach · ♥ {post.likes} likes
                      </div>
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.1rem', fontWeight:600, color:'#e8c97e',
                    }}>{post.earned}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CREATOR FUND TAB */}
          {activeTab === 'fund' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.06)',
                border:'1px solid rgba(232,201,126,0.2)',
                borderRadius:'16px', padding:'2rem', textAlign:'center',
              }}>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'2.5rem', fontWeight:600, color:'#e8c97e', marginBottom:'0.5rem',
                }}>✦ Creator Fund</div>
                <p style={{ fontSize:'0.88rem', color:'#888', lineHeight:1.7, maxWidth:'480px', margin:'0 auto 1.5rem' }}>
                  Inspira pays creators directly based on reach, engagement, and time spent on your content. No follower minimums, no application required. If you post, you earn.
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', maxWidth:'480px', margin:'0 auto' }}>
                  {[
                    { label:'Fund size', value:'₹10Cr+' },
                    { label:'Creators paid', value:'48,000+' },
                    { label:'Avg monthly', value:'₹2,400' },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background:'rgba(10,10,10,0.5)', borderRadius:'12px', padding:'1rem',
                    }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, color:'#e8c97e' }}>{stat.value}</div>
                      <div style={{ fontSize:'0.68rem', color:'#555', marginTop:'2px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How earnings are calculated — Inspira exclusive transparency */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.5rem' }}>
                  How your earnings are calculated
                </div>
                <div style={{ fontSize:'0.72rem', color:'#e8c97e', marginBottom:'1.25rem' }}>
                  ✦ Full formula shown — Instagram never tells you this
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                  {[
                    { factor:'Reach', weight:'35%', desc:'How many unique people saw your post', value:'14,200 views', earning:'₹63' },
                    { factor:'Watch time', weight:'25%', desc:'How long people spent on your content', value:'4.2 min avg', earning:'₹45' },
                    { factor:'Engagement', weight:'25%', desc:'Likes, comments, saves, shares', value:'8.4% rate', earning:'₹45' },
                    { factor:'Originality', weight:'15%', desc:'Original content bonus', value:'Verified', earning:'₹27' },
                  ].map((item, i) => (
                    <div key={item.factor} style={{
                      background:'#1a1a1a', borderRadius:'12px',
                      padding:'1rem',
                    }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
                          <span style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>{item.factor}</span>
                          <span style={{
                            background:'rgba(232,201,126,0.1)', color:'#e8c97e',
                            fontSize:'0.65rem', padding:'0.1rem 0.45rem',
                            borderRadius:'100px', fontWeight:500,
                          }}>{item.weight}</span>
                        </div>
                        <span style={{
                          fontFamily:"'Cormorant Garamond',serif",
                          fontSize:'1.1rem', fontWeight:600, color:'#e8c97e',
                        }}>{item.earning}</span>
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555' }}>{item.desc} · {item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS TAB */}
          {activeTab === 'subscriptions' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Inspira subscriptions
                </div>
                <p style={{ fontSize:'0.78rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  Charge subscribers for exclusive content. You keep 85% — Instagram takes 30% on iOS and up to 55% on other platforms.
                </p>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
                {[
                  { tier:'Basic', price:'₹99/mo', perks:['Exclusive posts','Early access','Subscriber badge'], active:false },
                  { tier:'Pro', price:'₹299/mo', perks:['Everything in Basic','Live Q&A access','DM priority','Behind the scenes'], active:true },
                  { tier:'Premium', price:'₹999/mo', perks:['Everything in Pro','1:1 video call/month','Custom content requests','Co-create opportunity'], active:false },
                ].map(tier => (
                  <div key={tier.tier} style={{
                    background: tier.active ? 'rgba(232,201,126,0.06)' : '#111',
                    border: tier.active ? '1px solid rgba(232,201,126,0.25)' : '1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                  }}>
                    <div style={{ fontSize:'0.88rem', fontWeight:600, color: tier.active ? '#e8c97e' : '#f0ede8', marginBottom:'0.35rem' }}>
                      {tier.tier} {tier.active && '✦'}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.5rem', fontWeight:600, color:'#f0ede8',
                      marginBottom:'1rem',
                    }}>{tier.price}</div>
                    {tier.perks.map(perk => (
                      <div key={perk} style={{
                        display:'flex', gap:'0.5rem', alignItems:'flex-start',
                        marginBottom:'0.4rem',
                      }}>
                        <span style={{ color:'#6fcf97', fontSize:'0.7rem', marginTop:'1px' }}>✓</span>
                        <span style={{ fontSize:'0.75rem', color:'#666' }}>{perk}</span>
                      </div>
                    ))}
                    <button style={{
                      width:'100%', marginTop:'1rem',
                      background: tier.active ? '#e8c97e' : 'transparent',
                      color: tier.active ? '#0a0a0a' : '#555',
                      border: tier.active ? 'none' : '1px solid #2a2a2a',
                      borderRadius:'100px', padding:'0.5rem',
                      fontSize:'0.78rem', fontWeight: tier.active ? 600 : 400,
                      cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                    }}>{tier.active ? 'Active tier' : 'Activate'}</button>
                  </div>
                ))}
              </div>

              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.25rem',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>Active subscribers</div>
                  <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'2px' }}>Across all tiers</div>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:600, color:'#e8c97e' }}>
                  0
                </div>
              </div>
            </div>
          )}

          {/* TIPS TAB */}
          {activeTab === 'tips' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Tips on Inspira
                </div>
                <p style={{ fontSize:'0.78rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  Followers can send you tips directly on any post. You keep 100% — Inspira takes nothing on tips. Instagram doesn't even have this feature.
                </p>
              </div>

              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Recent tips received
                </div>
                {[
                  { from:'nisha.creates', amount:'₹100', post:'🌅', message:'Incredible golden hour shot!', time:'2 days ago' },
                  { from:'arjun.lens', amount:'₹50', post:'🌿', message:'This composition is amazing', time:'5 days ago' },
                  { from:'maya.art', amount:'₹200', post:'🌃', message:'Your night photography is on another level', time:'1 week ago' },
                ].map((tip, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:'0.85rem',
                    padding:'0.75rem 0',
                    borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'50%',
                      background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.72rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                    }}>{tip.from[0].toUpperCase()}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.82rem', color:'#f0ede8', fontWeight:500 }}>
                        {tip.from} <span style={{ color:'#555', fontWeight:400, fontSize:'0.75rem' }}>tipped on</span> {tip.post}
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>
                        "{tip.message}" · {tip.time}
                      </div>
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'1.2rem', fontWeight:600, color:'#e8c97e',
                    }}>{tip.amount}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.25rem',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>Total tips received</div>
                  <div style={{ fontSize:'0.72rem', color:'#555' }}>You keep 100% · No platform cut</div>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:600, color:'#e8c97e' }}>
                  ₹350
                </div>
              </div>
            </div>
          )}

          {/* BRAND COLLABS TAB */}
          {activeTab === 'collabs' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Brand collabs marketplace
                </div>
                <p style={{ fontSize:'0.78rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  Connect with brands directly. No middlemen, no agency cuts. Brands reach out, you negotiate, you post. Inspira takes 15% only when a deal is completed.
                </p>
              </div>

              <div style={{ fontSize:'0.75rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                Active opportunities
              </div>

              {[
                { brand:'Noise Smartwatches', category:'Tech & Lifestyle', budget:'₹8,000-15,000', followers:'5k+', deadline:'Mar 30', match:'94%' },
                { brand:'Blue Tokai Coffee', category:'Food & Lifestyle', budget:'₹3,000-6,000', followers:'2k+', deadline:'Apr 5', match:'88%' },
                { brand:'Bombay Shaving Co.', category:'Grooming', budget:'₹5,000-10,000', followers:'3k+', deadline:'Apr 12', match:'76%' },
              ].map((opp, i) => (
                <div key={i} style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'14px', padding:'1.25rem',
                }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'0.75rem' }}>
                    <div>
                      <div style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8' }}>{opp.brand}</div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'2px' }}>{opp.category}</div>
                    </div>
                    <div style={{
                      background:'rgba(111,207,151,0.1)', color:'#6fcf97',
                      fontSize:'0.72rem', fontWeight:600,
                      padding:'0.25rem 0.65rem', borderRadius:'100px',
                    }}>{opp.match} match</div>
                  </div>
                  <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'1rem' }}>
                    {[
                      ['💰', opp.budget],
                      ['👥', `${opp.followers} followers req.`],
                      ['📅', `Deadline: ${opp.deadline}`],
                    ].map(([icon, text]) => (
                      <span key={text} style={{ fontSize:'0.72rem', color:'#666' }}>
                        {icon} {text}
                      </span>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <button style={{
                      background:'#e8c97e', color:'#0a0a0a', border:'none',
                      borderRadius:'100px', padding:'0.4rem 1.1rem',
                      fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
                      fontFamily:"'Outfit',sans-serif",
                    }}>Apply</button>
                    <button style={{
                      background:'transparent', color:'#555',
                      border:'1px solid #2a2a2a', borderRadius:'100px',
                      padding:'0.4rem 1.1rem', fontSize:'0.78rem',
                      cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                    }}>Pass</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.75rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
                  Payout method
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                  {[
                    { method:'UPI', detail:'yourname@upi', active:true, icon:'📱' },
                    { method:'Bank transfer', detail:'Add bank account', active:false, icon:'🏦' },
                    { method:'PayPal', detail:'Connect PayPal', active:false, icon:'💳' },
                  ].map(method => (
                    <div key={method.method} style={{
                      display:'flex', alignItems:'center', gap:'0.85rem',
                      padding:'0.85rem', borderRadius:'10px',
                      background: method.active ? 'rgba(232,201,126,0.06)' : '#1a1a1a',
                      border: method.active ? '1px solid rgba(232,201,126,0.2)' : '1px solid #2a2a2a',
                      cursor:'pointer',
                    }}>
                      <span style={{ fontSize:'1.2rem' }}>{method.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'0.85rem', color:'#f0ede8', fontWeight:500 }}>{method.method}</div>
                        <div style={{ fontSize:'0.72rem', color:'#555' }}>{method.detail}</div>
                      </div>
                      {method.active && (
                        <span style={{
                          background:'rgba(111,207,151,0.1)', color:'#6fcf97',
                          fontSize:'0.65rem', padding:'0.15rem 0.5rem',
                          borderRadius:'100px',
                        }}>Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.75rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
                  Payout history
                </div>
                {[
                  { date:'Mar 14, 2026', amount:'₹480', method:'UPI', status:'Paid' },
                  { date:'Mar 7, 2026', amount:'₹320', method:'UPI', status:'Paid' },
                  { date:'Feb 28, 2026', amount:'₹280', method:'UPI', status:'Paid' },
                  { date:'Feb 21, 2026', amount:'₹180', method:'UPI', status:'Paid' },
                ].map((payout, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center',
                    justifyContent:'space-between', padding:'0.65rem 0',
                    borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize:'0.82rem', color:'#f0ede8' }}>{payout.date}</div>
                      <div style={{ fontSize:'0.7rem', color:'#555', marginTop:'1px' }}>{payout.method}</div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:600, color:'#f0ede8' }}>
                        {payout.amount}
                      </span>
                      <span style={{
                        background:'rgba(111,207,151,0.1)', color:'#6fcf97',
                        fontSize:'0.65rem', padding:'0.15rem 0.5rem',
                        borderRadius:'100px',
                      }}>{payout.status}</span>
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
        width:'280px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        {/* Eligibility */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
            Your eligibility
          </div>
          {[
            { label:'Account age', status:true, value:'6+ months' },
            { label:'Original content', status:true, value:'Verified' },
            { label:'Community guidelines', status:true, value:'No violations' },
            { label:'Follower minimum', status:true, value:'None on Inspira ✦' },
          ].map((item, i) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.5rem 0',
              borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
            }}>
              <span style={{ fontSize:'0.78rem', color:'#666' }}>{item.label}</span>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ color: item.status ? '#6fcf97' : '#c96f6f', fontSize:'0.72rem' }}>
                  {item.status ? '✓' : '✗'}
                </span>
                <span style={{ fontSize:'0.72rem', color: item.value.includes('✦') ? '#e8c97e' : '#555' }}>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
          <div style={{
            marginTop:'0.85rem', padding:'0.65rem',
            background:'rgba(111,207,151,0.08)',
            border:'1px solid rgba(111,207,151,0.15)',
            borderRadius:'8px', fontSize:'0.72rem',
            color:'#6fcf97', textAlign:'center', fontWeight:500,
          }}>
            ✓ Fully eligible to monetize
          </div>
        </div>

        {/* Next payout */}
        <div style={{
          background:'rgba(232,201,126,0.06)',
          border:'1px solid rgba(232,201,126,0.2)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
            Next payout
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:600, color:'#e8c97e', marginBottom:'0.25rem' }}>
            ₹340
          </div>
          <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.75rem' }}>
            Scheduled for Friday, Mar 28
          </div>
          <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'4px', overflow:'hidden' }}>
            <div style={{ background:'#e8c97e', width:'75%', height:'100%', borderRadius:'100px' }}/>
          </div>
          <div style={{ fontSize:'0.65rem', color:'#555', marginTop:'0.35rem' }}>
            5 days remaining
          </div>
        </div>

        {/* Tips to earn more */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Earn more tips
          </div>
          {[
            '🕐 Post at peak times for your audience',
            '🏷 Use 5-10 targeted tags per post',
            '💬 Reply to comments within 1 hour',
            '📅 Post consistently — 4-5x per week',
            '🎬 Reels earn 2x vs static posts',
          ].map(tip => (
            <div key={tip} style={{
              fontSize:'0.75rem', color:'#666', lineHeight:1.6,
              marginBottom:'0.4rem',
            }}>{tip}</div>
          ))}
        </div>
      </aside>

      {/* Withdraw modal */}
      {showWithdraw && (
        <div style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:100, backdropFilter:'blur(8px)',
        }}
          onClick={() => setShowWithdraw(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'20px', padding:'2rem', width:'380px',
            }}
          >
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.5rem', fontWeight:600, color:'#f0ede8',
              marginBottom:'1.5rem',
            }}>Withdraw funds</h3>

            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>Amount</div>
              <input
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                placeholder="₹0"
                style={{
                  width:'100%', background:'#1a1a1a',
                  border:'1px solid #2a2a2a', borderRadius:'10px',
                  padding:'0.75rem 1rem', color:'#f0ede8',
                  fontSize:'1.1rem', fontFamily:"'Outfit',sans-serif",
                  outline:'none', boxSizing:'border-box',
                }}
                onFocus={e => e.target.style.borderColor='#e8c97e'}
                onBlur={e => e.target.style.borderColor='#2a2a2a'}
              />
              <div style={{ fontSize:'0.7rem', color:'#555', marginTop:'0.35rem' }}>
                Available: ₹1,260
              </div>
            </div>

            <div style={{ marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>To</div>
              <div style={{
                background:'#1a1a1a', border:'1px solid #2a2a2a',
                borderRadius:'10px', padding:'0.75rem 1rem',
                fontSize:'0.85rem', color:'#888',
                display:'flex', alignItems:'center', gap:'0.5rem',
              }}>
                <span>📱</span> UPI — yourname@upi
              </div>
            </div>

            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button
                onClick={() => setShowWithdraw(false)}
                style={{
                  flex:1, background:'transparent',
                  border:'1px solid #2a2a2a', borderRadius:'100px',
                  padding:'0.7rem', color:'#555', fontSize:'0.85rem',
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                }}
              >Cancel</button>
              <button
                onClick={() => setShowWithdraw(false)}
                style={{
                  flex:1, background:'#e8c97e', color:'#0a0a0a',
                  border:'none', borderRadius:'100px', padding:'0.7rem',
                  fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}
              >Withdraw now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}