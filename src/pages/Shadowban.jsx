import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

const checkItems = [
  { id:'hashtags', label:'Hashtag reach', description:'Checking if your posts appear in hashtag feeds', status:'clear', detail:'All 847 hashtag searches show your content correctly' },
  { id:'explore', label:'Explore page visibility', description:'Checking if your content appears on Explore', status:'clear', detail:'Your posts are appearing normally on Explore' },
  { id:'search', label:'Account searchability', description:'Checking if your account appears in search results', status:'clear', detail:'Your account appears at the top of relevant searches' },
  { id:'reach', label:'Reach anomaly detection', description:'Checking for unusual drops in your reach', status:'warning', detail:'Reach dropped 34% in the last 7 days — may indicate suppression' },
  { id:'engagement', label:'Engagement rate health', description:'Checking for unusual engagement patterns', status:'clear', detail:'Engagement rate is normal at 8.4% — industry avg is 3.2%' },
  { id:'content', label:'Content policy compliance', description:'Checking your recent posts against community guidelines', status:'clear', detail:'No content violations found in last 90 posts' },
  { id:'account', label:'Account standing', description:'Checking your overall account health with Inspira', status:'clear', detail:'Your account is in good standing — no restrictions' },
  { id:'links', label:'Link click suppression', description:'Checking if links in your bio are being suppressed', status:'clear', detail:'Bio link is working and not being suppressed' },
]

const historyData = [
  { date:'Mar 21, 2026', status:'clear', reach:'14.2k', note:'All clear' },
  { date:'Mar 14, 2026', status:'warning', reach:'9.1k', note:'Reach drop detected' },
  { date:'Mar 7, 2026', status:'clear', reach:'18.4k', note:'All clear' },
  { date:'Feb 28, 2026', status:'clear', reach:'16.2k', note:'All clear' },
  { date:'Feb 21, 2026', status:'shadowban', reach:'2.1k', note:'Hashtag suppression detected' },
  { date:'Feb 14, 2026', status:'clear', reach:'15.8k', note:'All clear' },
]

export default function Shadowban() {
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentCheck, setCurrentCheck] = useState('')
  const [activeTab, setActiveTab] = useState('checker')
  const [expandedItem, setExpandedItem] = useState(null)

  const startScan = () => {
    setScanning(true)
    setScanComplete(false)
    setScanProgress(0)

    const total = checkItems.length
    let current = 0

    const interval = setInterval(() => {
      if (current < total) {
        setCurrentCheck(checkItems[current].label)
        setScanProgress(Math.round(((current + 1) / total) * 100))
        current++
      } else {
        clearInterval(interval)
        setScanning(false)
        setScanComplete(true)
        setCurrentCheck('')
      }
    }, 600)
  }

  const warnings = checkItems.filter(c => c.status === 'warning')
  const issues = checkItems.filter(c => c.status === 'shadowban')
  const overallStatus = issues.length > 0 ? 'shadowban' : warnings.length > 0 ? 'warning' : 'clear'

  const statusConfig = {
    clear: { color:'#6fcf97', bg:'rgba(111,207,151,0.08)', border:'rgba(111,207,151,0.2)', label:'All clear', icon:'✓' },
    warning: { color:'#e8c97e', bg:'rgba(232,201,126,0.08)', border:'rgba(232,201,126,0.2)', label:'Warning', icon:'⚠' },
    shadowban: { color:'#c96f6f', bg:'rgba(201,111,111,0.08)', border:'rgba(201,111,111,0.2)', label:'Shadowbanned', icon:'✗' },
  }

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
        <div style={{ maxWidth:'780px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom:'1.5rem' }}>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
            }}>Shadowban Checker</h1>
            <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
              Instagram never tells you. Inspira always does.
            </p>
          </div>

          {/* Instagram vs Inspira */}
          <div style={{
            background:'rgba(232,201,126,0.04)',
            border:'1px solid rgba(232,201,126,0.1)',
            borderRadius:'12px', padding:'1rem',
            marginBottom:'1.5rem',
            display:'flex', gap:'1rem',
          }}>
            <div style={{ flex:1, borderRight:'1px solid #2a2a2a', paddingRight:'1rem' }}>
              <div style={{ fontSize:'0.65rem', color:'#c96f6f', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                📸 Instagram
              </div>
              <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
                Shadowbans without warning. Your reach drops 90% with zero explanation. They deny shadowbanning exists while doing it. You have no way to check, no way to appeal, no way to know why.
              </p>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                ✦ Inspira
              </div>
              <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
                Full transparency. Run a scan anytime to check 8 different suppression signals. If something is wrong, we tell you exactly what and why. No hidden penalties, ever.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display:'flex', borderBottom:'1px solid #2a2a2a',
            marginBottom:'2rem',
          }}>
            {[
              { id:'checker', label:'Run checker' },
              { id:'history', label:'Check history' },
              { id:'causes', label:'What causes shadowbans' },
              { id:'fix', label:'How to fix it' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background:'transparent', border:'none',
                borderBottom: activeTab === tab.id ? '2px solid #e8c97e' : '2px solid transparent',
                padding:'0.65rem 1.25rem', fontSize:'0.82rem',
                color: activeTab === tab.id ? '#f0ede8' : '#555',
                fontWeight: activeTab === tab.id ? 500 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                marginBottom:'-1px', transition:'all 0.2s',
                whiteSpace:'nowrap',
              }}>{tab.label}</button>
            ))}
          </div>

          {/* CHECKER TAB */}
          {activeTab === 'checker' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

              {/* Main scan card */}
              {!scanComplete ? (
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'16px', padding:'2.5rem',
                  textAlign:'center',
                }}>
                  <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>
                    {scanning ? '🔍' : '🛡'}
                  </div>
                  <h2 style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'1.6rem', fontWeight:600, color:'#f0ede8',
                    marginBottom:'0.5rem',
                  }}>
                    {scanning ? 'Scanning your account...' : 'Check your account'}
                  </h2>
                  <p style={{ fontSize:'0.85rem', color:'#555', marginBottom:'2rem', lineHeight:1.6 }}>
                    {scanning
                      ? `Checking: ${currentCheck}`
                      : 'Run a full scan to check for shadowbans, reach suppression, hashtag blocks, and more across 8 different signals.'
                    }
                  </p>

                  {scanning ? (
                    <div style={{ maxWidth:'400px', margin:'0 auto' }}>
                      <div style={{
                        background:'#1a1a1a', borderRadius:'100px',
                        height:'6px', overflow:'hidden', marginBottom:'0.75rem',
                      }}>
                        <div style={{
                          background:'#e8c97e', height:'100%',
                          borderRadius:'100px',
                          width:`${scanProgress}%`,
                          transition:'width 0.5s ease',
                        }}/>
                      </div>
                      <div style={{ fontSize:'0.75rem', color:'#555' }}>
                        {scanProgress}% complete · {checkItems.filter(c => checkItems.indexOf(c) < Math.floor(scanProgress / 100 * checkItems.length)).length} of {checkItems.length} checks done
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={startScan}
                      style={{
                        background:'#e8c97e', color:'#0a0a0a', border:'none',
                        borderRadius:'100px', padding:'0.85rem 2.5rem',
                        fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.background='#f0d88a'}
                      onMouseLeave={e => e.target.style.background='#e8c97e'}
                    >Run full scan</button>
                  )}
                </div>
              ) : (
                <>
                  {/* Overall result */}
                  <div style={{
                    background: statusConfig[overallStatus].bg,
                    border:`1px solid ${statusConfig[overallStatus].border}`,
                    borderRadius:'16px', padding:'1.5rem',
                    display:'flex', alignItems:'center', gap:'1.25rem',
                  }}>
                    <div style={{
                      width:'56px', height:'56px', borderRadius:'50%',
                      background: statusConfig[overallStatus].bg,
                      border:`2px solid ${statusConfig[overallStatus].color}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'1.4rem', flexShrink:0,
                      color: statusConfig[overallStatus].color,
                    }}>
                      {statusConfig[overallStatus].icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{
                        fontSize:'1.1rem', fontWeight:600,
                        color: statusConfig[overallStatus].color,
                        marginBottom:'0.25rem',
                      }}>
                        {overallStatus === 'clear' && 'Account looks healthy ✓'}
                        {overallStatus === 'warning' && 'Potential reach suppression detected'}
                        {overallStatus === 'shadowban' && 'Shadowban detected'}
                      </div>
                      <div style={{ fontSize:'0.82rem', color:'#666' }}>
                        {overallStatus === 'clear' && 'No shadowbans or suppression found. Your content is reaching its full potential.'}
                        {overallStatus === 'warning' && `${warnings.length} warning found. Review the details below and take action.`}
                        {overallStatus === 'shadowban' && `${issues.length} issue found. Your content is being suppressed. See details and fix steps below.`}
                      </div>
                    </div>
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      <div style={{ fontSize:'0.65rem', color:'#555', marginBottom:'0.25rem' }}>Scanned</div>
                      <div style={{ fontSize:'0.78rem', color:'#888' }}>Just now</div>
                      <button
                        onClick={() => { setScanComplete(false); setScanProgress(0) }}
                        style={{
                          background:'transparent', border:'none',
                          color:'#e8c97e', fontSize:'0.72rem', cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif", marginTop:'0.35rem',
                          padding:0,
                        }}
                      >Scan again →</button>
                    </div>
                  </div>

                  {/* Check results */}
                  <div style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', overflow:'hidden',
                  }}>
                    <div style={{
                      padding:'1rem 1.25rem',
                      borderBottom:'1px solid #2a2a2a',
                      fontSize:'0.75rem', fontWeight:500, color:'#888',
                      textTransform:'uppercase', letterSpacing:'0.08em',
                    }}>
                      8 checks completed
                    </div>
                    {checkItems.map((item, i) => {
                      const config = statusConfig[item.status]
                      const isExpanded = expandedItem === item.id
                      return (
                        <div
                          key={item.id}
                          style={{
                            borderBottom: i < checkItems.length - 1 ? '1px solid #1a1a1a' : 'none',
                          }}
                        >
                          <div
                            onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                            style={{
                              display:'flex', alignItems:'center',
                              gap:'1rem', padding:'1rem 1.25rem',
                              cursor:'pointer', transition:'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                            onMouseLeave={e => e.currentTarget.style.background='transparent'}
                          >
                            {/* Status indicator */}
                            <div style={{
                              width:'28px', height:'28px', borderRadius:'50%',
                              background: config.bg,
                              border:`1px solid ${config.border}`,
                              display:'flex', alignItems:'center',
                              justifyContent:'center', fontSize:'0.75rem',
                              color: config.color, flexShrink:0,
                            }}>{config.icon}</div>

                            <div style={{ flex:1 }}>
                              <div style={{
                                fontSize:'0.88rem', fontWeight:500,
                                color:'#f0ede8', marginBottom:'0.15rem',
                              }}>{item.label}</div>
                              <div style={{ fontSize:'0.72rem', color:'#555' }}>
                                {item.description}
                              </div>
                            </div>

                            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                              <span style={{
                                fontSize:'0.72rem', fontWeight:500,
                                color: config.color,
                                background: config.bg,
                                padding:'0.2rem 0.65rem', borderRadius:'100px',
                                border:`1px solid ${config.border}`,
                              }}>{config.label}</span>
                              <span style={{
                                color:'#555', fontSize:'0.75rem',
                                transition:'transform 0.2s',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                display:'inline-block',
                              }}>▾</span>
                            </div>
                          </div>

                          {isExpanded && (
                            <div style={{
                              padding:'0 1.25rem 1rem 3.5rem',
                              fontSize:'0.78rem', color:'#888', lineHeight:1.6,
                            }}>
                              <div style={{
                                background: config.bg,
                                border:`1px solid ${config.border}`,
                                borderRadius:'10px', padding:'0.75rem 1rem',
                                marginBottom:'0.5rem',
                              }}>
                                {item.detail}
                              </div>
                              {item.status === 'warning' && (
                                <div style={{ color:'#e8c97e', fontSize:'0.75rem' }}>
                                  ⚠ This may be causing your reach to drop. See the "How to fix it" tab for steps.
                                </div>
                              )}
                              {item.status === 'clear' && (
                                <div style={{ color:'#6fcf97', fontSize:'0.72rem' }}>
                                  ✓ This signal is healthy — no action needed.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Score card */}
                  <div style={{
                    display:'grid', gridTemplateColumns:'repeat(4,1fr)',
                    gap:'1rem',
                  }}>
                    {[
                      { label:'Checks passed', value:`${checkItems.filter(c => c.status === 'clear').length}/${checkItems.length}`, color:'#6fcf97' },
                      { label:'Warnings', value: warnings.length, color:'#e8c97e' },
                      { label:'Issues', value: issues.length, color:'#c96f6f' },
                      { label:'Health score', value:'87/100', color:'#6fcf97' },
                    ].map(stat => (
                      <div key={stat.label} style={{
                        background:'#111', border:'1px solid #2a2a2a',
                        borderRadius:'14px', padding:'1rem', textAlign:'center',
                      }}>
                        <div style={{
                          fontFamily:"'Cormorant Garamond',serif",
                          fontSize:'1.6rem', fontWeight:600,
                          color: stat.color, lineHeight:1, marginBottom:'0.3rem',
                        }}>{stat.value}</div>
                        <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'0.85rem 1rem',
                fontSize:'0.75rem', color:'#555',
              }}>
                ✦ Inspira tracks your shadowban history automatically. Instagram gives you zero history, zero transparency.
              </div>

              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', overflow:'hidden',
              }}>
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'1fr 80px 80px 1fr',
                  gap:'1rem', padding:'0.75rem 1.25rem',
                  borderBottom:'1px solid #2a2a2a',
                  fontSize:'0.65rem', color:'#555',
                  textTransform:'uppercase', letterSpacing:'0.08em',
                }}>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Reach</span>
                  <span>Note</span>
                </div>
                {historyData.map((entry, i) => {
                  const config = statusConfig[entry.status]
                  return (
                    <div key={i} style={{
                      display:'grid',
                      gridTemplateColumns:'1fr 80px 80px 1fr',
                      gap:'1rem', padding:'0.85rem 1.25rem',
                      alignItems:'center',
                      borderBottom: i < historyData.length - 1 ? '1px solid #1a1a1a' : 'none',
                      background: entry.status === 'shadowban' ? 'rgba(201,111,111,0.03)' : 'transparent',
                    }}>
                      <span style={{ fontSize:'0.82rem', color:'#888' }}>{entry.date}</span>
                      <span style={{
                        fontSize:'0.72rem', fontWeight:500,
                        color: config.color,
                        background: config.bg,
                        padding:'0.2rem 0.6rem', borderRadius:'100px',
                        border:`1px solid ${config.border}`,
                        textAlign:'center', display:'inline-block',
                      }}>{config.label}</span>
                      <span style={{ fontSize:'0.82rem', color:'#f0ede8', fontWeight:500 }}>
                        {entry.reach}
                      </span>
                      <span style={{ fontSize:'0.75rem', color:'#555' }}>{entry.note}</span>
                    </div>
                  )
                })}
              </div>

              {/* Reach chart */}
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1.5rem',
              }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', marginBottom:'1.25rem' }}>
                  Reach over time with shadowban overlays
                </div>
                <div style={{
                  display:'flex', alignItems:'flex-end',
                  gap:'0.5rem', height:'100px', marginBottom:'0.5rem',
                }}>
                  {historyData.slice().reverse().map((entry, i) => {
                    const reachVal = parseFloat(entry.reach.replace('k','')) * (entry.reach.includes('k') ? 1000 : 1)
                    const maxReach = 20000
                    const height = Math.max((reachVal / maxReach) * 100, 5)
                    return (
                      <div key={i} style={{
                        flex:1, display:'flex', flexDirection:'column',
                        alignItems:'center', gap:'0.3rem', height:'100%',
                        justifyContent:'flex-end',
                      }}>
                        <div style={{
                          width:'100%', borderRadius:'4px 4px 0 0',
                          background: entry.status === 'shadowban' ? 'rgba(201,111,111,0.6)' :
                                      entry.status === 'warning' ? 'rgba(232,201,126,0.5)' :
                                      'rgba(232,201,126,0.3)',
                          height:`${height}%`, minHeight:'4px',
                          position:'relative',
                        }}>
                          {entry.status !== 'clear' && (
                            <div style={{
                              position:'absolute', top:'-6px',
                              left:'50%', transform:'translateX(-50%)',
                              width:'8px', height:'8px', borderRadius:'50%',
                              background: entry.status === 'shadowban' ? '#c96f6f' : '#e8c97e',
                            }}/>
                          )}
                        </div>
                        <span style={{ fontSize:'0.55rem', color:'#555' }}>
                          {entry.date.split(',')[0].replace('Mar ','').replace('Feb ','')}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display:'flex', gap:'1rem', fontSize:'0.65rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#c96f6f' }}/>
                    <span style={{ color:'#555' }}>Shadowban</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#e8c97e' }}/>
                    <span style={{ color:'#555' }}>Warning</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'rgba(232,201,126,0.3)' }}/>
                    <span style={{ color:'#555' }}>Clear</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CAUSES TAB */}
          {activeTab === 'causes' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', overflow:'hidden',
              }}>
                <div style={{ padding:'1.25rem', borderBottom:'1px solid #2a2a2a' }}>
                  <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.25rem' }}>
                    What causes shadowbans on Instagram
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#555' }}>
                    These are the known triggers — Instagram never publishes these officially
                  </div>
                </div>
                {[
                  { cause:'Using banned hashtags', risk:'High', icon:'🏷', desc:'Some hashtags are quietly banned by Instagram. Using even one banned tag can suppress an entire post from hashtag feeds for 24-72 hours.' },
                  { cause:'Mass following/unfollowing', risk:'High', icon:'👥', desc:'Following and unfollowing large numbers of accounts rapidly triggers Instagram\'s spam detection and can suppress your content.' },
                  { cause:'Too many posts too quickly', risk:'Medium', icon:'⚡', desc:'Posting more than 3-5 times per day can be flagged as spam behaviour, reducing your reach temporarily.' },
                  { cause:'Using third-party automation', risk:'High', icon:'🤖', desc:'Bots, scheduling tools that use unofficial APIs, and auto-likers can trigger suppression or permanent account suspension.' },
                  { cause:'Multiple reports from other users', risk:'Medium', icon:'🚩', desc:'If multiple users report your content even if it doesn\'t violate guidelines, Instagram may temporarily suppress it.' },
                  { cause:'Posting sensitive content', risk:'Medium', icon:'⚠️', desc:'Content flagged as potentially sensitive (even if not violating guidelines) may be shown less prominently.' },
                  { cause:'Sudden activity spikes', risk:'Low', icon:'📈', desc:'A sudden large increase in likes, comments or follows (e.g. from going viral) can temporarily look like bot activity.' },
                  { cause:'Posting from untrusted locations', risk:'Low', icon:'📍', desc:'Logging in from multiple different countries in quick succession can trigger security flags that limit reach.' },
                ].map((item, i) => (
                  <div key={item.cause} style={{
                    padding:'1rem 1.25rem',
                    borderBottom: i < 7 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.4rem' }}>
                      <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
                      <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8', flex:1 }}>
                        {item.cause}
                      </span>
                      <span style={{
                        fontSize:'0.65rem', fontWeight:600,
                        color: item.risk === 'High' ? '#c96f6f' : item.risk === 'Medium' ? '#e8c97e' : '#6fcf97',
                        background: item.risk === 'High' ? 'rgba(201,111,111,0.1)' : item.risk === 'Medium' ? 'rgba(232,201,126,0.1)' : 'rgba(111,207,151,0.1)',
                        padding:'0.2rem 0.6rem', borderRadius:'100px',
                        border:`1px solid ${item.risk === 'High' ? 'rgba(201,111,111,0.2)' : item.risk === 'Medium' ? 'rgba(232,201,126,0.2)' : 'rgba(111,207,151,0.2)'}`,
                      }}>{item.risk} risk</span>
                    </div>
                    <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0, paddingLeft:'1.85rem' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FIX TAB */}
          {activeTab === 'fix' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              <div style={{
                background:'rgba(232,201,126,0.05)',
                border:'1px solid rgba(232,201,126,0.15)',
                borderRadius:'14px', padding:'1.25rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Inspira note
                </div>
                <p style={{ fontSize:'0.78rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  On Inspira, we never shadowban without telling you. If your reach ever drops, we'll notify you with the exact reason and steps to resolve it. These steps below are for if you're cross-posting to Instagram.
                </p>
              </div>

              {[
                {
                  step:1, title:'Stop posting for 24-72 hours',
                  desc:'Taking a break can reset Instagram\'s algorithm flags. This is the most effective first step for most shadowban types.',
                  timeframe:'24-72 hours', difficulty:'Easy',
                },
                {
                  step:2, title:'Audit and remove banned hashtags',
                  desc:'Go through your recent posts and remove any potentially banned hashtags. Use hashtag research tools to check before using new tags.',
                  timeframe:'1-2 hours', difficulty:'Medium',
                },
                {
                  step:3, title:'Disconnect all third-party apps',
                  desc:'Go to Instagram Settings → Security → Apps and Websites. Revoke access to any scheduling, automation, or analytics tools using unofficial APIs.',
                  timeframe:'30 minutes', difficulty:'Easy',
                },
                {
                  step:4, title:'Engage authentically',
                  desc:'Spend time genuinely engaging with posts in your niche. Real comments (not just emojis) signal to the algorithm that you\'re a real person.',
                  timeframe:'30 min/day', difficulty:'Easy',
                },
                {
                  step:5, title:'Report the issue to Instagram',
                  desc:'Go to Settings → Help → Report a Problem. While Instagram rarely responds, there\'s some evidence that reports can trigger manual reviews.',
                  timeframe:'15 minutes', difficulty:'Easy',
                },
                {
                  step:6, title:'Switch to a Creator account temporarily',
                  desc:'Some users report that switching account type can reset certain flags. Go to Settings → Account → Switch account type.',
                  timeframe:'5 minutes', difficulty:'Easy',
                },
              ].map(item => (
                <div key={item.step} style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'14px', padding:'1.25rem',
                  display:'flex', gap:'1rem',
                }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'50%',
                    background:'rgba(232,201,126,0.1)',
                    border:'1px solid rgba(232,201,126,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.85rem', fontWeight:700, color:'#e8c97e',
                    flexShrink:0,
                  }}>{item.step}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.4rem' }}>
                      {item.title}
                    </div>
                    <p style={{ fontSize:'0.78rem', color:'#666', lineHeight:1.6, margin:'0 0 0.6rem' }}>
                      {item.desc}
                    </p>
                    <div style={{ display:'flex', gap:'1rem' }}>
                      <span style={{ fontSize:'0.68rem', color:'#555' }}>⏱ {item.timeframe}</span>
                      <span style={{
                        fontSize:'0.68rem',
                        color: item.difficulty === 'Easy' ? '#6fcf97' : '#e8c97e',
                      }}>● {item.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
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
        {/* Current status */}
        <div style={{
          background: scanComplete ? statusConfig[overallStatus].bg : '#111',
          border:`1px solid ${scanComplete ? statusConfig[overallStatus].border : '#2a2a2a'}`,
          borderRadius:'14px', padding:'1.25rem', textAlign:'center',
        }}>
          <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>
            {scanComplete ? (overallStatus === 'clear' ? '✅' : overallStatus === 'warning' ? '⚠️' : '🚫') : '🛡'}
          </div>
          <div style={{
            fontSize:'0.88rem', fontWeight:600,
            color: scanComplete ? statusConfig[overallStatus].color : '#555',
            marginBottom:'0.25rem',
          }}>
            {scanComplete ? statusConfig[overallStatus].label : 'Not scanned yet'}
          </div>
          <div style={{ fontSize:'0.72rem', color:'#555' }}>
            {scanComplete ? 'Last scan: just now' : 'Run a scan to check'}
          </div>
          {!scanning && (
            <button
              onClick={startScan}
              style={{
                background: scanComplete ? 'transparent' : '#e8c97e',
                color: scanComplete ? '#e8c97e' : '#0a0a0a',
                border: scanComplete ? '1px solid rgba(232,201,126,0.3)' : 'none',
                borderRadius:'100px', padding:'0.4rem 1.1rem',
                fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", marginTop:'0.85rem',
                transition:'all 0.2s',
              }}
            >{scanComplete ? 'Scan again' : 'Scan now'}</button>
          )}
        </div>

        {/* Quick tips */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Prevention tips
          </div>
          {[
            '🏷 Research hashtags before using them',
            '🤖 Never use automation tools',
            '📅 Post consistently — not in bursts',
            '💬 Reply to comments within 1 hour',
            '🚫 Avoid posting the same content twice',
            '✦ On Inspira — you\'ll never be shadowbanned',
          ].map(tip => (
            <div key={tip} style={{
              fontSize:'0.75rem', color:'#666', lineHeight:1.6,
              marginBottom:'0.4rem', display:'flex', gap:'0.4rem',
            }}>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        {/* Inspira promise */}
        <div style={{
          background:'rgba(232,201,126,0.05)',
          border:'1px solid rgba(232,201,126,0.15)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
            ✦ The Inspira promise
          </div>
          <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.7, margin:0 }}>
            Inspira will <strong style={{ color:'#f0ede8' }}>never</strong> shadowban a creator without telling them. If we ever limit your reach for any reason, you'll receive a notification with the exact reason, the duration, and how to resolve it.
          </p>
        </div>
      </aside>
    </div>
  )
}