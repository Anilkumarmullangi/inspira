import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const signals = [
  {
    id:'relationship', label:'Relationship strength', weight:32, icon:'👥',
    color:'#e8c97e',
    description:'How close you are to the person who posted. Based on past interactions, DMs, tags, and profile visits.',
    factors:[
      { factor:'You\'ve liked their posts before', impact:'+High' },
      { factor:'You\'ve sent them a DM', impact:'+High' },
      { factor:'They\'ve tagged you in a post', impact:'+High' },
      { factor:'You\'ve visited their profile', impact:'+Medium' },
      { factor:'You follow each other', impact:'+Medium' },
    ],
    inspira:'Inspira shows you this score for every account you follow so you know why you see their posts.'
  },
  {
    id:'interest', label:'Interest relevance', weight:28, icon:'💡',
    color:'#7eb8e8',
    description:'How likely you are to be interested in this type of content based on your past behaviour.',
    factors:[
      { factor:'You\'ve engaged with similar content', impact:'+High' },
      { factor:'You follow this topic/category', impact:'+High' },
      { factor:'Your watch time on similar posts', impact:'+High' },
      { factor:'Your saves in this category', impact:'+Medium' },
      { factor:'Search history in this topic', impact:'+Medium' },
    ],
    inspira:'Inspira lets you explicitly set your interests so the algorithm doesn\'t have to guess.'
  },
  {
    id:'recency', label:'Post recency', weight:18, icon:'🕐',
    color:'#6fcf97',
    description:'How recently the post was shared. Newer posts get a temporary boost.',
    factors:[
      { factor:'Posted in last 1 hour', impact:'+High' },
      { factor:'Posted in last 6 hours', impact:'+Medium' },
      { factor:'Posted in last 24 hours', impact:'+Low' },
      { factor:'Posted over 24 hours ago', impact:'Neutral' },
      { factor:'Posted over 7 days ago', impact:'-Low' },
    ],
    inspira:'Inspira offers a true chronological feed mode — no recency weighting at all if you prefer.'
  },
  {
    id:'format', label:'Content format', weight:12, icon:'📱',
    color:'#9b8ede',
    description:'The type of content and how it performs historically for this creator.',
    factors:[
      { factor:'Reels (currently boosted)', impact:'+High' },
      { factor:'Carousels (high saves)', impact:'+Medium' },
      { factor:'Photos', impact:'Neutral' },
      { factor:'Videos over 60 seconds', impact:'+Low' },
      { factor:'Text-only posts', impact:'-Low' },
    ],
    inspira:'Inspira never artificially boosts one format over another. All content types are treated equally.'
  },
  {
    id:'engagement', label:'Early engagement velocity', weight:10, icon:'⚡',
    color:'#c96f6f',
    description:'How fast a post accumulates likes, comments, and shares in the first hour after posting.',
    factors:[
      { factor:'High like velocity in first 30 min', impact:'+High' },
      { factor:'Comments with meaningful text', impact:'+High' },
      { factor:'Shares and sends', impact:'+High' },
      { factor:'Saves (strong signal)', impact:'+High' },
      { factor:'Profile visits after seeing post', impact:'+Medium' },
    ],
    inspira:'Inspira shows you your post\'s velocity score in real time so you know how it\'s performing early.'
  },
]

const feedTypes = [
  {
    id:'algorithmic', label:'✦ For You', desc:'Inspira\'s algorithm — personalized but transparent',
    pros:['Discovers content you\'ll love', 'Surfaces new creators', 'Adapts to your taste over time'],
    cons:['May miss some posts from people you follow', 'Takes time to learn your preferences'],
  },
  {
    id:'chronological', label:'🕐 Chronological', desc:'Pure time order — newest posts first',
    pros:['Never miss a post', 'Total control', 'No algorithm manipulation'],
    cons:['May feel overwhelming if you follow many accounts', 'Doesn\'t surface best content'],
  },
  {
    id:'following', label:'👥 Following only', desc:'Only posts from accounts you follow',
    pros:['Curated to your network', 'No random content', 'Predictable feed'],
    cons:['Won\'t discover new creators', 'Misses trending content'],
  },
]

export default function Algorithm() {
  const [activeTab, setActiveTab] = useState('how')
  const [expandedSignal, setExpandedSignal] = useState(null)
  const [selectedFeed, setSelectedFeed] = useState('algorithmic')
  const [showWeights, setShowWeights] = useState(true)

  const tabs = [
    { id:'how', label:'How it works' },
    { id:'signals', label:'Ranking signals' },
    { id:'feed', label:'Feed control' },
    { id:'compare', label:'vs Instagram' },
  ]

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
        <div style={{ maxWidth:'820px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'0.5rem',
              background:'rgba(232,201,126,0.08)',
              border:'1px solid rgba(232,201,126,0.2)',
              borderRadius:'100px', padding:'0.3rem 0.85rem',
              fontSize:'0.72rem', color:'#e8c97e', marginBottom:'1rem',
            }}>✦ World first — full algorithm transparency</div>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
            }}>Algorithm Transparency</h1>
            <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
              Exactly how Inspira decides what you see — nothing hidden
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display:'flex', borderBottom:'1px solid #2a2a2a',
            marginBottom:'2rem',
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
              }}>{tab.label}</button>
            ))}
          </div>

          {/* HOW IT WORKS */}
          {activeTab === 'how' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

              {/* Mission statement */}
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.15)',
                borderRadius:'16px', padding:'1.75rem',
                textAlign:'center',
              }}>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'1.4rem', fontWeight:300, color:'#f0ede8',
                  lineHeight:1.5, marginBottom:'1rem', maxWidth:'560px', margin:'0 auto 1rem',
                }}>
                  "The algorithm should work <em style={{ color:'#e8c97e' }}>for you</em>, not the other way around."
                </div>
                <p style={{ fontSize:'0.82rem', color:'#555', lineHeight:1.7, maxWidth:'520px', margin:'0 auto' }}>
                  Every decision Inspira's algorithm makes is documented here. We update this page whenever we change how ranking works. No surprises, no manipulation, no hidden priorities.
                </p>
              </div>

              {/* Algorithm overview */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  How a post gets ranked in your feed
                </div>

                {/* Flow diagram */}
                <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
                  {[
                    { step:1, title:'Post is created', desc:'A creator posts new content', icon:'📸', color:'#e8c97e' },
                    { step:2, title:'Initial signals collected', desc:'Inspira notes the post format, time, creator\'s history, and your relationship', icon:'📡', color:'#7eb8e8' },
                    { step:3, title:'Candidate pool built', desc:'Posts from people you follow + potential discoveries are gathered', icon:'🗂', color:'#9b8ede' },
                    { step:4, title:'Ranking signals applied', desc:'5 signals (shown below) score each post for your specific feed', icon:'⚖', color:'#6fcf97' },
                    { step:5, title:'Final score calculated', desc:'Posts are ranked by combined score — highest scores appear first', icon:'🎯', color:'#e8c97e' },
                    { step:6, title:'You see it in your feed', desc:'With full transparency — tap any post to see why it was shown to you', icon:'✓', color:'#6fcf97' },
                  ].map((item, i) => (
                    <div key={item.step} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                        <div style={{
                          width:'36px', height:'36px', borderRadius:'50%',
                          background:`rgba(${item.color === '#e8c97e' ? '232,201,126' : item.color === '#7eb8e8' ? '126,184,232' : item.color === '#9b8ede' ? '155,142,222' : '111,207,151'},0.15)`,
                          border:`1px solid rgba(${item.color === '#e8c97e' ? '232,201,126' : item.color === '#7eb8e8' ? '126,184,232' : item.color === '#9b8ede' ? '155,142,222' : '111,207,151'},0.3)`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'1rem', flexShrink:0,
                        }}>{item.icon}</div>
                        {i < 5 && (
                          <div style={{ width:'1px', height:'24px', background:'#2a2a2a', margin:'4px 0' }}/>
                        )}
                      </div>
                      <div style={{ paddingTop:'6px', paddingBottom: i < 5 ? '0' : '0' }}>
                        <div style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.15rem' }}>
                          {item.step}. {item.title}
                        </div>
                        <div style={{ fontSize:'0.75rem', color:'#555', marginBottom:'0.5rem' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key principles */}
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem',
              }}>
                {[
                  { title:'No paid ranking', desc:'Inspira never allows brands or creators to pay for higher feed placement. Ranking is 100% based on relevance signals.', icon:'🚫', color:'#c96f6f' },
                  { title:'No engagement bait penalty', desc:'We don\'t penalise posts that ask for likes or comments. Only low-quality content is demoted.', icon:'✓', color:'#6fcf97' },
                  { title:'No format favouritism', desc:'We don\'t artificially boost Reels, Stories, or any other format. All content types compete on equal terms.', icon:'⚖', color:'#7eb8e8' },
                  { title:'Full explanation on every post', desc:'Tap the ✦ button on any post in your feed to see exactly why it was shown to you and its ranking score.', icon:'💬', color:'#e8c97e' },
                ].map(item => (
                  <div key={item.title} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                  }}>
                    <div style={{ fontSize:'1.3rem', marginBottom:'0.6rem' }}>{item.icon}</div>
                    <div style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.4rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.6 }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Last updated */}
              <div style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.85rem 1rem', background:'#111',
                border:'1px solid #2a2a2a', borderRadius:'10px',
                fontSize:'0.75rem', color:'#555',
              }}>
                <span style={{ color:'#e8c97e' }}>✦</span>
                <span>Algorithm last updated: <strong style={{ color:'#888' }}>March 15, 2026</strong></span>
                <span style={{ marginLeft:'auto' }}>
                  <a href="#" style={{ color:'#e8c97e', textDecoration:'none' }}>View changelog →</a>
                </span>
              </div>
            </div>
          )}

          {/* RANKING SIGNALS */}
          {activeTab === 'signals' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

              {/* Weight toggle */}
              <div style={{
                display:'flex', alignItems:'center',
                justifyContent:'space-between', marginBottom:'0.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', color:'#888' }}>
                  5 ranking signals — total weight: 100%
                </div>
                <button
                  onClick={() => setShowWeights(!showWeights)}
                  style={{
                    background: showWeights ? 'rgba(232,201,126,0.1)' : '#111',
                    border:'1px solid rgba(232,201,126,0.2)',
                    borderRadius:'100px', padding:'0.3rem 0.85rem',
                    color:'#e8c97e', fontSize:'0.72rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}
                >{showWeights ? 'Hide weights' : 'Show weights'}</button>
              </div>

              {/* Visual weight bar */}
              {showWeights && (
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'14px', padding:'1.25rem', marginBottom:'0.5rem',
                }}>
                  <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.75rem' }}>
                    Signal weight distribution
                  </div>
                  <div style={{ display:'flex', height:'32px', borderRadius:'8px', overflow:'hidden', gap:'2px' }}>
                    {signals.map(s => (
                      <div
                        key={s.id}
                        title={`${s.label}: ${s.weight}%`}
                        style={{
                          width:`${s.weight}%`, background: `rgba(${
                            s.color === '#e8c97e' ? '232,201,126' :
                            s.color === '#7eb8e8' ? '126,184,232' :
                            s.color === '#6fcf97' ? '111,207,151' :
                            s.color === '#9b8ede' ? '155,142,222' : '201,111,111'
                          },0.6)`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'0.6rem', color:'white', fontWeight:600,
                          cursor:'pointer', transition:'opacity 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity='0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity='1'}
                      >{s.weight}%</div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'0.75rem' }}>
                    {signals.map(s => (
                      <div key={s.id} style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                        <div style={{ width:'10px', height:'10px', borderRadius:'2px', background: s.color, opacity:0.7 }}/>
                        <span style={{ fontSize:'0.65rem', color:'#555' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signal cards */}
              {signals.map((signal, i) => {
                const isExpanded = expandedSignal === signal.id
                return (
                  <div key={signal.id} style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', overflow:'hidden',
                    transition:'border-color 0.2s',
                  }}>
                    <div
                      onClick={() => setExpandedSignal(isExpanded ? null : signal.id)}
                      style={{
                        display:'flex', alignItems:'center', gap:'1rem',
                        padding:'1.1rem 1.25rem', cursor:'pointer',
                        transition:'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <div style={{
                        width:'40px', height:'40px', borderRadius:'10px',
                        background:`rgba(${
                          signal.color === '#e8c97e' ? '232,201,126' :
                          signal.color === '#7eb8e8' ? '126,184,232' :
                          signal.color === '#6fcf97' ? '111,207,151' :
                          signal.color === '#9b8ede' ? '155,142,222' : '201,111,111'
                        },0.12)`,
                        border:`1px solid rgba(${
                          signal.color === '#e8c97e' ? '232,201,126' :
                          signal.color === '#7eb8e8' ? '126,184,232' :
                          signal.color === '#6fcf97' ? '111,207,151' :
                          signal.color === '#9b8ede' ? '155,142,222' : '201,111,111'
                        },0.25)`,
                        display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'1.1rem', flexShrink:0,
                      }}>{signal.icon}</div>

                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.15rem' }}>
                          {signal.label}
                        </div>
                        <div style={{ fontSize:'0.72rem', color:'#555' }}>
                          {signal.description}
                        </div>
                      </div>

                      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>
                        {showWeights && (
                          <div style={{ textAlign:'right' }}>
                            <div style={{
                              fontFamily:"'Cormorant Garamond',serif",
                              fontSize:'1.4rem', fontWeight:600, color: signal.color,
                              lineHeight:1,
                            }}>{signal.weight}%</div>
                            <div style={{ fontSize:'0.6rem', color:'#555' }}>weight</div>
                          </div>
                        )}
                        <span style={{
                          color:'#555', fontSize:'0.75rem', transition:'transform 0.2s',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                          display:'inline-block',
                        }}>▾</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ padding:'0 1.25rem 1.25rem' }}>
                        {/* Weight bar */}
                        <div style={{ marginBottom:'1rem' }}>
                          <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'6px', overflow:'hidden' }}>
                            <div style={{
                              width:`${signal.weight}%`, height:'100%',
                              background: signal.color, borderRadius:'100px',
                              transition:'width 0.5s',
                            }}/>
                          </div>
                        </div>

                        {/* Factors */}
                        <div style={{ marginBottom:'1rem' }}>
                          <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.6rem' }}>
                            What affects this signal
                          </div>
                          {signal.factors.map(f => (
                            <div key={f.factor} style={{
                              display:'flex', alignItems:'center',
                              justifyContent:'space-between', padding:'0.4rem 0',
                              borderBottom:'1px solid #1a1a1a',
                            }}>
                              <span style={{ fontSize:'0.78rem', color:'#888' }}>{f.factor}</span>
                              <span style={{
                                fontSize:'0.72rem', fontWeight:500,
                                color: f.impact.startsWith('+') ? '#6fcf97' :
                                       f.impact.startsWith('-') ? '#c96f6f' : '#555',
                              }}>{f.impact}</span>
                            </div>
                          ))}
                        </div>

                        {/* Inspira note */}
                        <div style={{
                          background:'rgba(232,201,126,0.05)',
                          border:'1px solid rgba(232,201,126,0.1)',
                          borderRadius:'10px', padding:'0.75rem',
                          display:'flex', gap:'0.5rem',
                        }}>
                          <span style={{ color:'#e8c97e', flexShrink:0, fontSize:'0.8rem' }}>✦</span>
                          <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.6 }}>
                            {signal.inspira}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* FEED CONTROL */}
          {activeTab === 'feed' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'0.85rem 1rem',
                fontSize:'0.75rem', color:'#555', lineHeight:1.6,
              }}>
                ✦ Instagram gives you zero control over your feed algorithm. Inspira gives you three distinct feed modes. Switch anytime from the feed page.
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {feedTypes.map(feed => (
                  <div
                    key={feed.id}
                    onClick={() => setSelectedFeed(feed.id)}
                    style={{
                      background: selectedFeed === feed.id ? 'rgba(232,201,126,0.06)' : '#111',
                      border: selectedFeed === feed.id ? '1px solid rgba(232,201,126,0.25)' : '1px solid #2a2a2a',
                      borderRadius:'14px', padding:'1.5rem',
                      cursor:'pointer', transition:'all 0.2s',
                    }}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.85rem' }}>
                      <div style={{
                        width:'20px', height:'20px', borderRadius:'50%',
                        border:`2px solid ${selectedFeed === feed.id ? '#e8c97e' : '#2a2a2a'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        flexShrink:0, transition:'border-color 0.2s',
                      }}>
                        {selectedFeed === feed.id && (
                          <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#e8c97e' }}/>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize:'0.95rem', fontWeight:600, color: selectedFeed === feed.id ? '#e8c97e' : '#f0ede8' }}>
                          {feed.label}
                        </div>
                        <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>{feed.desc}</div>
                      </div>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', paddingLeft:'2rem' }}>
                      <div>
                        <div style={{ fontSize:'0.65rem', color:'#6fcf97', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.4rem' }}>
                          Benefits
                        </div>
                        {feed.pros.map(p => (
                          <div key={p} style={{ display:'flex', gap:'0.4rem', marginBottom:'0.3rem' }}>
                            <span style={{ color:'#6fcf97', fontSize:'0.7rem', flexShrink:0, marginTop:'1px' }}>✓</span>
                            <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{p}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize:'0.65rem', color:'#c96f6f', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.4rem' }}>
                          Trade-offs
                        </div>
                        {feed.cons.map(c => (
                          <div key={c} style={{ display:'flex', gap:'0.4rem', marginBottom:'0.3rem' }}>
                            <span style={{ color:'#c96f6f', fontSize:'0.7rem', flexShrink:0, marginTop:'1px' }}>–</span>
                            <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button style={{
                background:'#e8c97e', color:'#0a0a0a', border:'none',
                borderRadius:'100px', padding:'0.85rem',
                fontSize:'0.88rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", width:'100%',
                transition:'all 0.2s',
              }}
                onMouseEnter={e => e.target.style.background='#f0d88a'}
                onMouseLeave={e => e.target.style.background='#e8c97e'}
              >
                Apply — Switch to {feedTypes.find(f => f.id === selectedFeed)?.label}
              </button>

              {/* Fine-tune controls */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Fine-tune your algorithm ✦
                </div>
                {[
                  { label:'Show more content from accounts I engage with', on:true },
                  { label:'Boost content from my close friends list', on:true },
                  { label:'Show content outside my usual interests', on:false },
                  { label:'Include trending content from my region', on:true },
                  { label:'Reduce repetitive content from same creator', on:true },
                  { label:'Show posts I may have missed from past 3 days', on:false },
                ].map((control, i) => (
                  <div key={control.label} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'0.65rem 0',
                    borderBottom: i < 5 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <span style={{ fontSize:'0.82rem', color:'#888', flex:1, marginRight:'1rem' }}>
                      {control.label}
                    </span>
                    <div style={{
                      width:'36px', height:'20px', borderRadius:'100px',
                      background: control.on ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                      position:'relative', cursor:'pointer', flexShrink:0,
                      border: control.on ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
                      transition:'all 0.2s',
                    }}>
                      <div style={{
                        width:'14px', height:'14px', borderRadius:'50%',
                        background: control.on ? '#e8c97e' : '#555',
                        position:'absolute', top:'2px',
                        left: control.on ? '18px' : '2px',
                        transition:'all 0.2s',
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VS INSTAGRAM */}
          {activeTab === 'compare' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr',
                gap:'1rem',
              }}>
                <div style={{
                  background:'rgba(201,111,111,0.05)',
                  border:'1px solid rgba(201,111,111,0.15)',
                  borderRadius:'14px', padding:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.72rem', color:'#c96f6f', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                    📸 Instagram algorithm
                  </div>
                  {[
                    ['✗', 'Algorithm is a complete black box'],
                    ['✗', 'No explanation for why you see posts'],
                    ['✗', 'Cannot choose feed type'],
                    ['✗', 'Artificially boosts Reels over photos'],
                    ['✗', 'Paid partnerships can influence ranking'],
                    ['✗', 'No transparency when algorithm changes'],
                    ['✗', 'Cannot fine-tune what you see'],
                    ['✗', 'Shadowbans without explanation'],
                    ['✗', 'Optimises for time-on-app over user wellbeing'],
                    ['✗', 'Cannot see ranking factors for any post'],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display:'flex', gap:'0.6rem', marginBottom:'0.55rem' }}>
                      <span style={{ color:'#c96f6f', flexShrink:0, fontSize:'0.8rem' }}>{icon}</span>
                      <span style={{ fontSize:'0.78rem', color:'#666', lineHeight:1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background:'rgba(232,201,126,0.05)',
                  border:'1px solid rgba(232,201,126,0.15)',
                  borderRadius:'14px', padding:'1.5rem',
                }}>
                  <div style={{ fontSize:'0.72rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                    ✦ Inspira algorithm
                  </div>
                  {[
                    ['✓', 'Full algorithm documentation — this page'],
                    ['✓', '"Why am I seeing this?" on every post'],
                    ['✓', '3 feed modes — algorithmic, chronological, following'],
                    ['✓', 'All content formats treated equally'],
                    ['✓', 'Zero paid ranking — ever'],
                    ['✓', 'Changelog published with every update'],
                    ['✓', '6 fine-tune controls for your feed'],
                    ['✓', 'No shadowbans without notification'],
                    ['✓', 'Optimises for creator success and user satisfaction'],
                    ['✓', 'Per-post ranking score visible to all creators'],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display:'flex', gap:'0.6rem', marginBottom:'0.55rem' }}>
                      <span style={{ color:'#6fcf97', flexShrink:0, fontSize:'0.8rem' }}>{icon}</span>
                      <span style={{ fontSize:'0.78rem', color:'#888', lineHeight:1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Algorithm score */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Transparency score comparison
                </div>
                {[
                  { label:'Algorithm transparency', inspira:100, instagram:5 },
                  { label:'User feed control', inspira:95, instagram:10 },
                  { label:'Creator fairness', inspira:90, instagram:35 },
                  { label:'Content format equality', inspira:100, instagram:20 },
                  { label:'Shadowban transparency', inspira:100, instagram:0 },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom:'1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', color:'#888', marginBottom:'0.4rem' }}>
                      <span>{item.label}</span>
                      <div style={{ display:'flex', gap:'1rem' }}>
                        <span style={{ color:'#e8c97e' }}>Inspira: {item.inspira}%</span>
                        <span style={{ color:'#c96f6f' }}>Instagram: {item.instagram}%</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
                      <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'5px', overflow:'hidden' }}>
                        <div style={{ width:`${item.inspira}%`, height:'100%', background:'#e8c97e', borderRadius:'100px' }}/>
                      </div>
                      <div style={{ background:'#1a1a1a', borderRadius:'100px', height:'5px', overflow:'hidden' }}>
                        <div style={{ width:`${item.instagram}%`, height:'100%', background:'rgba(201,111,111,0.5)', borderRadius:'100px' }}/>
                      </div>
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
        {/* Your feed mode */}
        <div style={{
          background:'rgba(232,201,126,0.06)',
          border:'1px solid rgba(232,201,126,0.2)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
            Your current feed
          </div>
          <div style={{ fontSize:'0.95rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.25rem' }}>
            ✦ For You
          </div>
          <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.85rem' }}>
            Algorithmic — personalized
          </div>
          <a href="/feed" style={{
            display:'block', textAlign:'center',
            background:'transparent', border:'1px solid rgba(232,201,126,0.3)',
            borderRadius:'100px', padding:'0.4rem',
            color:'#e8c97e', fontSize:'0.75rem', textDecoration:'none',
            transition:'all 0.2s',
          }}>Switch feed mode →</a>
        </div>

        {/* Quick facts */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Algorithm quick facts
          </div>
          {[
            { label:'Ranking signals', value:'5' },
            { label:'Feed modes', value:'3' },
            { label:'Fine-tune controls', value:'6' },
            { label:'Paid ranking', value:'Never' },
            { label:'Last updated', value:'Mar 15' },
            { label:'Transparency score', value:'100%' },
          ].map((fact, i) => (
            <div key={fact.label} style={{
              display:'flex', justifyContent:'space-between',
              padding:'0.4rem 0',
              borderBottom: i < 5 ? '1px solid #1a1a1a' : 'none',
            }}>
              <span style={{ fontSize:'0.75rem', color:'#555' }}>{fact.label}</span>
              <span style={{ fontSize:'0.75rem', fontWeight:500, color: fact.value === 'Never' || fact.value === '100%' ? '#6fcf97' : '#f0ede8' }}>
                {fact.value}
              </span>
            </div>
          ))}
        </div>

        {/* Changelog */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Recent changes
          </div>
          {[
            { date:'Mar 15', change:'Increased weight of saves signal from 8% to 10%' },
            { date:'Feb 28', change:'Added close friends feed boost option' },
            { date:'Feb 10', change:'Removed format favouritism — all types equal' },
            { date:'Jan 20', change:'Added chronological feed mode' },
          ].map((entry, i) => (
            <div key={i} style={{
              padding:'0.5rem 0',
              borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{ fontSize:'0.65rem', color:'#e8c97e', marginBottom:'0.2rem' }}>{entry.date}</div>
              <div style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{entry.change}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}