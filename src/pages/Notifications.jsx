import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { notificationsData } from '../constants/data'

const typeConfig = {
  like:      { icon:'♥',  color:'#e8557a', label:'Likes' },
  follow:    { icon:'👤', color:'#7eb8e8', label:'Follows' },
  comment:   { icon:'💬', color:'#9b8ede', label:'Comments' },
  mention:   { icon:'@',  color:'#e8c97e', label:'Mentions' },
  collab:    { icon:'🤝', color:'#6fcf97', label:'Collabs' },
  save:      { icon:'★',  color:'#e8c97e', label:'Saves' },
  milestone: { icon:'✦',  color:'#e8c97e', label:'Milestones' },
}

const filters = ['All', 'Likes', 'Comments', 'Follows', 'Mentions', 'Collabs', 'Milestones']

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [notifications, setNotifications] = useState(notificationsData)
  const [followStates, setFollowStates] = useState({})

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const toggleFollow = (user) => {
    setFollowStates(prev => ({ ...prev, [user]: !prev[user] }))
  }

  const filtered = activeFilter === 'All'
    ? notifications
    : notifications.filter(n => typeConfig[n.type]?.label === activeFilter)

  const groups = [...new Set(filtered.map(n => n.group))]
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{
  flex:1,
  padding:'2rem 3vw',
  borderRight:'1px solid #2a2a2a',
}}>
    <div style={{ maxWidth:'700px', margin:'0 auto' }}></div>
        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:'1.75rem',
        }}>
          <div>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.8rem', fontWeight:600, color:'#f0ede8',
              margin:0, lineHeight:1,
            }}>Notifications</h1>
            {unreadCount > 0 && (
              <div style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.3rem' }}>
                {unreadCount} unread
              </div>
            )}
          </div>
          <button
            onClick={markAllRead}
            style={{
              background:'transparent', border:'1px solid #2a2a2a',
              borderRadius:'100px', padding:'0.4rem 1rem',
              color:'#888', fontSize:'0.78rem', cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
            onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
          >
            Mark all read
          </button>
        </div>

        {/* Inspira advantage — Instagram has no filtering */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'12px', padding:'0.85rem 1rem',
          marginBottom:'1.5rem',
          display:'flex', alignItems:'center', gap:'0.75rem',
        }}>
          <span style={{ color:'#e8c97e', fontSize:'0.9rem', flexShrink:0 }}>✦</span>
          <p style={{ fontSize:'0.75rem', color:'#555', margin:0, lineHeight:1.5 }}>
            Instagram shows all notifications in one overwhelming list. Inspira lets you filter by type and groups them clearly.
          </p>
        </div>

        {/* Filter chips — Instagram doesn't have this */}
        <div style={{
          display:'flex', gap:'0.5rem', flexWrap:'wrap',
          marginBottom:'1.75rem',
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
                transition:'all 0.2s',
              }}
              onMouseEnter={e => { if (activeFilter !== filter) { e.target.style.borderColor='#555'; e.target.style.color='#888' }}}
              onMouseLeave={e => { if (activeFilter !== filter) { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#555' }}}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notification groups */}
        {groups.map(group => (
          <div key={group} style={{ marginBottom:'2rem' }}>
            <div style={{
              fontSize:'0.72rem', color:'#555', fontWeight:500,
              textTransform:'uppercase', letterSpacing:'0.1em',
              marginBottom:'0.75rem', paddingBottom:'0.5rem',
              borderBottom:'1px solid #1a1a1a',
            }}>{group}</div>

            <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
              {filtered.filter(n => n.group === group).map(notif => {
                const config = typeConfig[notif.type]
                return (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    style={{
                      display:'flex', alignItems:'center', gap:'0.85rem',
                      padding:'0.85rem 1rem', borderRadius:'14px',
                      background: notif.read ? 'transparent' : 'rgba(232,201,126,0.04)',
                      border: notif.read ? '1px solid transparent' : '1px solid rgba(232,201,126,0.08)',
                      cursor:'pointer', transition:'all 0.2s', position:'relative',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background='#111'}
                    onMouseLeave={e => e.currentTarget.style.background = notif.read ? 'transparent' : 'rgba(232,201,126,0.04)'}
                  >
                    {/* Unread dot */}
                    {!notif.read && (
                      <div style={{
                        position:'absolute', left:'0', top:'50%',
                        transform:'translateY(-50%)',
                        width:'3px', height:'60%', borderRadius:'0 2px 2px 0',
                        background:'#e8c97e',
                      }}/>
                    )}

                    {/* Avatar */}
                    <div style={{ position:'relative', flexShrink:0 }}>
                      <div style={{
                        width:'40px', height:'40px', borderRadius:'50%',
                        background: notif.gradient,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize: notif.avatar === '✦' ? '1rem' : '0.72rem',
                        fontWeight:700,
                        color: notif.avatar === '✦' ? '#0a0a0a' : '#0a0a0a',
                      }}>
                        {notif.avatar}
                      </div>
                      {/* Type icon badge */}
                      <div style={{
                        position:'absolute', bottom:'-2px', right:'-2px',
                        width:'18px', height:'18px', borderRadius:'50%',
                        background:'#1a1a1a', border:'2px solid #0a0a0a',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'0.55rem', color: config.color,
                      }}>
                        {config.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:'0.85rem', color:'#f0ede8', margin:0, lineHeight:1.5 }}>
                        <strong style={{ color:'#f0ede8' }}>{notif.user}</strong>{' '}
                        <span style={{ color: notif.read ? '#666' : '#888' }}>{notif.text}</span>
                      </p>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.2rem' }}>
                        <span style={{ fontSize:'0.72rem', color:'#444' }}>{notif.time}</span>
                        {notif.inspira && (
                          <span style={{
                            fontSize:'0.6rem', color:'#e8c97e',
                            background:'rgba(232,201,126,0.1)',
                            padding:'0.1rem 0.4rem', borderRadius:'100px',
                            fontWeight:500,
                          }}>✦ Inspira exclusive</span>
                        )}
                      </div>
                    </div>

                    {/* Right side — post thumbnail or follow button */}
                    {notif.post && (
                      <div style={{
                        width:'42px', height:'42px', borderRadius:'8px',
                        background:'#1a1a1a', display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'1.2rem', flexShrink:0,
                      }}>
                        {notif.post}
                      </div>
                    )}
                    {notif.type === 'follow' && (
                      <button
                        onClick={e => { e.stopPropagation(); toggleFollow(notif.user) }}
                        style={{
                          background: followStates[notif.user] ? 'transparent' : '#e8c97e',
                          color: followStates[notif.user] ? '#888' : '#0a0a0a',
                          border: followStates[notif.user] ? '1px solid #2a2a2a' : 'none',
                          borderRadius:'100px', padding:'0.35rem 1rem',
                          fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif", flexShrink:0,
                          transition:'all 0.2s',
                        }}
                      >
                        {followStates[notif.user] ? 'Following' : 'Follow back'}
                      </button>
                    )}
                    {notif.type === 'collab' && (
                      <div style={{ display:'flex', gap:'0.4rem', flexShrink:0 }}>
                        <button style={{
                          background:'#e8c97e', color:'#0a0a0a',
                          border:'none', borderRadius:'100px',
                          padding:'0.35rem 0.75rem', fontSize:'0.72rem',
                          fontWeight:600, cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif",
                        }}>Accept</button>
                        <button style={{
                          background:'transparent', color:'#555',
                          border:'1px solid #2a2a2a', borderRadius:'100px',
                          padding:'0.35rem 0.75rem', fontSize:'0.72rem',
                          cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                        }}>Decline</button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔔</div>
            <p style={{ fontSize:'0.9rem' }}>No {activeFilter.toLowerCase()} notifications</p>
          </div>
        )}
      </main>

      {/* Right panel */}
      <aside style={{
        width:'280px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
      }}>
        {/* Notification settings — Inspira exclusive */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#888', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem',
          }}>Notification settings</div>

          {[
            { label:'Likes', on:true },
            { label:'Comments', on:true },
            { label:'New followers', on:true },
            { label:'Mentions', on:true },
            { label:'Collabs', on:true },
            { label:'Reach milestones', on:true },
            { label:'Marketing emails', on:false },
          ].map((setting, i) => (
            <div key={setting.label} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.55rem 0',
              borderBottom: i < 6 ? '1px solid #1a1a1a' : 'none',
            }}>
              <span style={{ fontSize:'0.82rem', color: setting.on ? '#888' : '#444' }}>
                {setting.label}
              </span>
              <div style={{
                width:'32px', height:'18px', borderRadius:'100px',
                background: setting.on ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                position:'relative', cursor:'pointer', transition:'all 0.2s',
                border: setting.on ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
              }}>
                <div style={{
                  width:'12px', height:'12px', borderRadius:'50%',
                  background: setting.on ? '#e8c97e' : '#555',
                  position:'absolute', top:'2px',
                  left: setting.on ? '16px' : '2px',
                  transition:'all 0.2s',
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Inspira vs Instagram */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#e8c97e', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem',
          }}>✦ How Inspira is different</div>
          {[
            ['🔀', 'Filter by notification type'],
            ['📊', 'Reach milestone alerts'],
            ['🤝', 'Collab invites built-in'],
            ['💾', 'Know when someone saves your post'],
            ['🚫', 'No fake engagement alerts'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.6rem',
            }}>
              <span style={{ fontSize:'0.8rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}