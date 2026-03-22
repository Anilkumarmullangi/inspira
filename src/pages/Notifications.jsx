import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { notificationsData } from '../constants/data'
import { SkeletonNotification } from '../components/Skeleton'
import PageTransition from '../components/PageTransition'

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const filters = ['all','likes','comments','follows','mentions','saves','reach']

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read:true })))
  }

  const filtered = notifications.filter(n => {
    if (activeFilter === 'all') return true
    return n.type === activeFilter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const groupByTime = (notifs) => {
    const groups = { 'Today':[], 'Yesterday':[], 'This week':[] }
    notifs.forEach(n => {
      if (n.timeGroup === 'today') groups['Today'].push(n)
      else if (n.timeGroup === 'yesterday') groups['Yesterday'].push(n)
      else groups['This week'].push(n)
    })
    return groups
  }

  const grouped = groupByTime(filtered)

  const typeIcon = (type) => {
    const icons = {
      like:'♥', comment:'💬', follow:'👤',
      mention:'@', save:'★', reach:'👁', collab:'🤝',
    }
    return icons[type] || '🔔'
  }

  const typeColor = (type) => {
    const colors = {
      like:'#c96f6f', comment:'#7eb8e8', follow:'#e8c97e',
      mention:'#9b8ede', save:'#6fcf97', reach:'#e8c97e', collab:'#e8c97e',
    }
    return colors[type] || '#555'
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
        <div style={{ maxWidth:'680px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'1.5rem',
          }}>
            <div>
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Notifications</h1>
              {unreadCount > 0 && (
                <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.2rem' }}>
                  {unreadCount} unread
                </p>
              )}
            </div>
            <button
              onClick={markAllRead}
              style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.45rem 1rem',
                color:'#888', fontSize:'0.78rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
              onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
            >Mark all read</button>
          </div>

          {/* Filter chips */}
          <div style={{
            display:'flex', gap:'0.5rem', flexWrap:'wrap',
            marginBottom:'1.5rem',
          }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  background: activeFilter === filter ? '#e8c97e' : '#111',
                  color: activeFilter === filter ? '#0a0a0a' : '#555',
                  border: activeFilter === filter ? 'none' : '1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.35rem 0.9rem',
                  fontSize:'0.75rem', fontWeight: activeFilter === filter ? 600 : 400,
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  textTransform:'capitalize', transition:'all 0.2s',
                }}
              >{filter}</button>
            ))}
          </div>

          {/* Notifications */}
          {loading ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
              {Array.from({length:6}).map((_,i) => <SkeletonNotification key={i}/>)}
            </div>
          ) : (
            <PageTransition>
              {Object.entries(grouped).map(([group, notifs]) => {
                if (notifs.length === 0) return null
                return (
                  <div key={group} style={{ marginBottom:'2rem' }}>
                    <div style={{
                      fontSize:'0.72rem', color:'#555', fontWeight:500,
                      textTransform:'uppercase', letterSpacing:'0.1em',
                      marginBottom:'0.75rem', paddingBottom:'0.5rem',
                      borderBottom:'1px solid #1a1a1a',
                    }}>{group}</div>

                    <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                      {notifs.map(notif => (
                        <div
                          key={notif.id}
                          style={{
                            display:'flex', alignItems:'center', gap:'0.85rem',
                            padding:'0.85rem 1rem', borderRadius:'12px',
                            background: notif.read ? 'transparent' : 'rgba(232,201,126,0.04)',
                            border: notif.read ? '1px solid transparent' : '1px solid rgba(232,201,126,0.08)',
                            transition:'all 0.2s', cursor:'pointer',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background='#111'}
                          onMouseLeave={e => e.currentTarget.style.background = notif.read ? 'transparent' : 'rgba(232,201,126,0.04)'}
                          onClick={() => setNotifications(prev =>
                            prev.map(n => n.id === notif.id ? { ...n, read:true } : n)
                          )}
                        >
                          {/* Avatar */}
                          <div style={{ position:'relative', flexShrink:0 }}>
                            <div style={{
                              width:'42px', height:'42px', borderRadius:'50%',
                              background: notif.gradient || 'linear-gradient(135deg,#e8c97e,#c96f6f)',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontSize:'0.72rem', fontWeight:700, color:'#0a0a0a',
                            }}>{notif.avatar}</div>
                            <div style={{
                              position:'absolute', bottom:'-2px', right:'-2px',
                              width:'18px', height:'18px', borderRadius:'50%',
                              background: typeColor(notif.type),
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontSize:'0.55rem', border:'2px solid #0a0a0a',
                            }}>{typeIcon(notif.type)}</div>
                          </div>

                          {/* Content */}
                          <div style={{ flex:1, minWidth:0 }}>
                            <p style={{ fontSize:'0.85rem', color:'#d0cdc8', lineHeight:1.5, margin:0 }}>
                              <strong style={{ color:'#f0ede8', fontWeight:600 }}>{notif.user}</strong>
                              {' '}{notif.text}
                            </p>
                            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.2rem' }}>
                              <span style={{ fontSize:'0.7rem', color:'#444' }}>{notif.time}</span>
                              {!notif.read && (
                                <span style={{
                                  width:'6px', height:'6px', borderRadius:'50%',
                                  background:'#e8c97e', display:'inline-block',
                                }}/>
                              )}
                              {notif.inspiraOnly && (
                                <span style={{
                                  fontSize:'0.6rem', color:'#e8c97e',
                                  background:'rgba(232,201,126,0.1)',
                                  padding:'0.1rem 0.4rem', borderRadius:'100px',
                                  border:'1px solid rgba(232,201,126,0.2)',
                                }}>✦ Inspira</span>
                              )}
                            </div>
                          </div>

                          {/* Post thumbnail */}
                          {notif.postEmoji && (
                            <div style={{
                              width:'42px', height:'42px', borderRadius:'8px',
                              background: notif.postBg || '#1a1a1a',
                              display:'flex', alignItems:'center',
                              justifyContent:'center', fontSize:'1.2rem', flexShrink:0,
                            }}>{notif.postEmoji}</div>
                          )}

                          {/* Follow back button */}
                          {notif.type === 'follow' && (
                            <button style={{
                              background:'#e8c97e', color:'#0a0a0a', border:'none',
                              borderRadius:'100px', padding:'0.35rem 0.85rem',
                              fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                              fontFamily:"'Outfit',sans-serif", flexShrink:0,
                            }}>Follow back</button>
                          )}

                          {/* Collab buttons */}
                          {notif.type === 'collab' && (
                            <div style={{ display:'flex', gap:'0.4rem', flexShrink:0 }}>
                              <button style={{
                                background:'#e8c97e', color:'#0a0a0a', border:'none',
                                borderRadius:'100px', padding:'0.3rem 0.75rem',
                                fontSize:'0.72rem', fontWeight:600, cursor:'pointer',
                                fontFamily:"'Outfit',sans-serif",
                              }}>Accept</button>
                              <button style={{
                                background:'transparent', color:'#555',
                                border:'1px solid #2a2a2a', borderRadius:'100px',
                                padding:'0.3rem 0.75rem', fontSize:'0.72rem',
                                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                              }}>Decline</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </PageTransition>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width:'260px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            ✦ Notification fixes
          </div>
          {[
            ['🔖','Save notifications — know when someone saves your post'],
            ['📊','Reach milestone alerts'],
            ['🎯','Filter by notification type'],
            ['🔕','Quiet hours — silence notifications'],
            ['🤝','Collab invite notifications'],
            ['🚫','No spam from Instagram ads'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display:'flex', gap:'0.6rem', marginBottom:'0.5rem' }}>
              <span style={{ fontSize:'0.8rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Notification settings
          </div>
          {[
            { label:'Push notifications', on:true },
            { label:'Email digest', on:true },
            { label:'Reach milestones', on:true },
            { label:'Save alerts ✦', on:true },
            { label:'Marketing emails', on:false },
          ].map((item, i) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.45rem 0',
              borderBottom: i < 4 ? '1px solid #1a1a1a' : 'none',
            }}>
              <span style={{ fontSize:'0.78rem', color:'#666' }}>{item.label}</span>
              <div style={{
                width:'32px', height:'18px', borderRadius:'100px',
                background: item.on ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                position:'relative', cursor:'pointer',
                border: item.on ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
              }}>
                <div style={{
                  width:'12px', height:'12px', borderRadius:'50%',
                  background: item.on ? '#e8c97e' : '#555',
                  position:'absolute', top:'2px',
                  left: item.on ? '16px' : '2px',
                  transition:'all 0.2s',
                }}/>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}