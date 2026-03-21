import { useState, useRef, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { conversations } from '../constants/data'
import { SkeletonMessage } from '../components/Skeleton'

// Add loading state:
const [loading, setLoading] = useState(true)
useEffect(() => {
  const t = setTimeout(() => setLoading(false), 800)
  return () => clearTimeout(t)
}, [])


// In conversation list:
{loading ? (
  Array.from({length:6}).map((_,i) => <SkeletonMessage key={i}/>)
) : (
  filtered.map(convo => (

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(conversations[0])
  const [message, setMessage] = useState('')
  const [allConvos, setAllConvos] = useState(conversations)
  const [search, setSearch] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [activeConvo])

  const sendMessage = () => {
    if (!message.trim()) return
    const newMsg = { id: Date.now(), from:'me', text: message, time:'Just now' }
    const updated = allConvos.map(c =>
      c.id === activeConvo.id
        ? { ...c, messages:[...c.messages, newMsg], lastMessage: message, time:'now', unread:0 }
        : c
    )
    setAllConvos(updated)
    setActiveConvo(prev => ({ ...prev, messages:[...prev.messages, newMsg], lastMessage: message }))
    setMessage('')
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const openConvo = (convo) => {
    setActiveConvo(convo)
    setAllConvos(prev => prev.map(c => c.id === convo.id ? { ...c, unread:0 } : c))
    setShowInfo(false)
  }

  const filtered = allConvos.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase())
  )

  const totalUnread = allConvos.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div style={{
      display:'flex', height:'100vh', overflow:'hidden',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      {/* Conversations list */}
      <div style={{
        width:'320px', flexShrink:0, borderRight:'1px solid #2a2a2a',
        display:'flex', flexDirection:'column', height:'100vh',
      }}>
        {/* Header */}
        <div style={{ padding:'1.5rem 1.25rem 1rem', borderBottom:'1px solid #2a2a2a' }}>
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'1rem',
          }}>
            <div>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.4rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Messages</h2>
              {totalUnread > 0 && (
                <span style={{ fontSize:'0.72rem', color:'#e8c97e' }}>
                  {totalUnread} unread
                </span>
              )}
            </div>
            <button style={{
              background:'#e8c97e', color:'#0a0a0a', border:'none',
              borderRadius:'100px', padding:'0.4rem 0.9rem',
              fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif",
            }}>+ New</button>
          </div>

          {/* Search — Instagram's DM search is terrible */}
          <div style={{ position:'relative' }}>
            <span style={{
              position:'absolute', left:'0.75rem', top:'50%',
              transform:'translateY(-50%)', color:'#555', fontSize:'0.85rem',
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search messages..."
              style={{
                width:'100%', background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.55rem 1rem 0.55rem 2.2rem',
                color:'#f0ede8', fontSize:'0.82rem',
                fontFamily:"'Outfit',sans-serif", outline:'none',
                boxSizing:'border-box',
              }}
              onFocus={e => e.target.style.borderColor='#e8c97e'}
              onBlur={e => e.target.style.borderColor='#2a2a2a'}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display:'flex', borderBottom:'1px solid #2a2a2a',
          padding:'0 1.25rem',
        }}>
          {['All', 'Unread', 'Collabs'].map((tab, i) => (
            <button key={tab} style={{
              background:'transparent', border:'none',
              borderBottom: i === 0 ? '2px solid #e8c97e' : '2px solid transparent',
              padding:'0.65rem 1rem', fontSize:'0.78rem',
              color: i === 0 ? '#f0ede8' : '#555',
              cursor:'pointer', fontFamily:"'Outfit',sans-serif",
              marginBottom:'-1px', transition:'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Conversation list */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtered.map(convo => (
            <div
              key={convo.id}
              onClick={() => openConvo(convo)}
              style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.85rem 1.25rem', cursor:'pointer',
                background: activeConvo.id === convo.id ? '#111' : 'transparent',
                borderLeft: activeConvo.id === convo.id ? '2px solid #e8c97e' : '2px solid transparent',
                transition:'all 0.15s',
              }}
              onMouseEnter={e => { if (activeConvo.id !== convo.id) e.currentTarget.style.background='#0d0d0d' }}
              onMouseLeave={e => { if (activeConvo.id !== convo.id) e.currentTarget.style.background='transparent' }}
            >
              {/* Avatar with online indicator */}
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{
                  width:'44px', height:'44px', borderRadius:'50%',
                  background: convo.gradient, display:'flex',
                  alignItems:'center', justifyContent:'center',
                  fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a',
                }}>{convo.avatar}</div>
                {convo.online && (
                  <div style={{
                    position:'absolute', bottom:'1px', right:'1px',
                    width:'11px', height:'11px', borderRadius:'50%',
                    background:'#6fcf97', border:'2px solid #0a0a0a',
                  }}/>
                )}
              </div>

              {/* Convo info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:'2px',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                    <span style={{
                      fontSize:'0.85rem', fontWeight: convo.unread > 0 ? 600 : 500,
                      color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    }}>{convo.name}</span>
                    {convo.verified && (
                      <span style={{
                        background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                        width:'13px', height:'13px', display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'0.45rem', fontWeight:700, flexShrink:0,
                      }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize:'0.68rem', color:'#444', flexShrink:0 }}>{convo.time}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{
                    fontSize:'0.75rem',
                    color: convo.unread > 0 ? '#888' : '#444',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    maxWidth:'180px',
                  }}>{convo.lastMessage}</span>
                  {convo.unread > 0 && (
                    <span style={{
                      background:'#e8c97e', color:'#0a0a0a',
                      borderRadius:'100px', fontSize:'0.6rem', fontWeight:700,
                      padding:'0.1rem 0.45rem', flexShrink:0,
                    }}>{convo.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column', height:'100vh',
        borderRight: showInfo ? '1px solid #2a2a2a' : 'none',
      }}>
        {/* Chat header */}
        <div style={{
          padding:'1rem 1.5rem', borderBottom:'1px solid #2a2a2a',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'#0d0d0d',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ position:'relative' }}>
              <div style={{
                width:'40px', height:'40px', borderRadius:'50%',
                background: activeConvo.gradient, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'0.72rem', fontWeight:700, color:'#0a0a0a',
              }}>{activeConvo.avatar}</div>
              {activeConvo.online && (
                <div style={{
                  position:'absolute', bottom:'1px', right:'1px',
                  width:'10px', height:'10px', borderRadius:'50%',
                  background:'#6fcf97', border:'2px solid #0d0d0d',
                }}/>
              )}
            </div>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ fontSize:'0.92rem', fontWeight:600, color:'#f0ede8' }}>
                  {activeConvo.name}
                </span>
                {activeConvo.verified && (
                  <span style={{
                    background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                    width:'14px', height:'14px', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'0.5rem', fontWeight:700,
                  }}>✓</span>
                )}
              </div>
              <div style={{ fontSize:'0.72rem', color: activeConvo.online ? '#6fcf97' : '#555' }}>
                {activeConvo.online ? 'Active now' : `@${activeConvo.username}`}
              </div>
            </div>
          </div>

          {/* Chat actions */}
          <div style={{ display:'flex', gap:'0.5rem' }}>
            {[
              { icon:'📞', label:'Voice call' },
              { icon:'📹', label:'Video call' },
              { icon:'ℹ', label:'Info' },
            ].map(action => (
              <button
                key={action.label}
                onClick={() => action.label === 'Info' && setShowInfo(!showInfo)}
                title={action.label}
                style={{
                  background: action.label === 'Info' && showInfo ? '#1a1a1a' : 'transparent',
                  border:'1px solid #2a2a2a', borderRadius:'10px',
                  padding:'0.45rem 0.65rem', color:'#555',
                  fontSize:'0.9rem', cursor:'pointer', transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#555'; e.currentTarget.style.color='#f0ede8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#2a2a2a'; e.currentTarget.style.color='#555' }}
              >{action.icon}</button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex:1, overflowY:'auto', padding:'1.5rem',
          display:'flex', flexDirection:'column', gap:'0.5rem',
        }}>
          {/* Inspira feature: no read receipts pressure */}
          <div style={{
            textAlign:'center', marginBottom:'1rem',
          }}>
            <span style={{
              fontSize:'0.68rem', color:'#333',
              background:'#111', border:'1px solid #1a1a1a',
              padding:'0.3rem 0.85rem', borderRadius:'100px',
            }}>
              ✦ Read receipts are optional on Inspira
            </span>
          </div>

          {activeConvo.messages.map((msg, i) => {
            const isMe = msg.from === 'me'
            const prevMsg = activeConvo.messages[i - 1]
            const showAvatar = !isMe && (!prevMsg || prevMsg.from !== 'them')

            return (
              <div key={msg.id} style={{
                display:'flex', flexDirection: isMe ? 'row-reverse' : 'row',
                alignItems:'flex-end', gap:'0.5rem',
              }}>
                {/* Avatar for them */}
                {!isMe && (
                  <div style={{
                    width:'28px', height:'28px', borderRadius:'50%',
                    background: showAvatar ? activeConvo.gradient : 'transparent',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.55rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                  }}>
                    {showAvatar ? activeConvo.avatar : ''}
                  </div>
                )}

                <div style={{ maxWidth:'65%' }}>
                  <div style={{
                    background: isMe ? '#e8c97e' : '#1a1a1a',
                    color: isMe ? '#0a0a0a' : '#f0ede8',
                    padding:'0.65rem 1rem',
                    borderRadius: isMe
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    fontSize:'0.875rem', lineHeight:1.5,
                    border: isMe ? 'none' : '1px solid #2a2a2a',
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize:'0.62rem', color:'#333',
                    marginTop:'3px', textAlign: isMe ? 'right' : 'left',
                    paddingLeft: isMe ? 0 : '0.25rem',
                    paddingRight: isMe ? '0.25rem' : 0,
                  }}>{msg.time}</div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div style={{
          padding:'1rem 1.5rem', borderTop:'1px solid #2a2a2a',
          background:'#0d0d0d',
        }}>
          {/* Inspira quick reactions */}
          <div style={{
            display:'flex', gap:'0.5rem', marginBottom:'0.75rem',
            overflowX:'auto',
          }}>
            {['👏','🔥','😍','💯','✨','🙏','❤️'].map(emoji => (
              <button
                key={emoji}
                onClick={() => setMessage(prev => prev + emoji)}
                style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.25rem 0.6rem',
                  fontSize:'0.85rem', cursor:'pointer', flexShrink:0,
                  transition:'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor='#555'}
                onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
              >{emoji}</button>
            ))}
          </div>

          <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-end' }}>
            {/* Attachments */}
            <div style={{ display:'flex', gap:'0.4rem', flexShrink:0 }}>
              {['📷','🎵','📁'].map(icon => (
                <button key={icon} style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'10px', padding:'0.55rem 0.65rem',
                  color:'#555', fontSize:'0.85rem', cursor:'pointer',
                  transition:'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#555'; e.currentTarget.style.color='#f0ede8' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#2a2a2a'; e.currentTarget.style.color='#555' }}
                >{icon}</button>
              ))}
            </div>

            {/* Input */}
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Message ${activeConvo.name}...`}
              style={{
                flex:1, background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.7rem 1.25rem',
                color:'#f0ede8', fontSize:'0.875rem',
                fontFamily:"'Outfit',sans-serif", outline:'none',
                transition:'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor='#e8c97e'}
              onBlur={e => e.target.style.borderColor='#2a2a2a'}
            />

            {/* Send */}
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              style={{
                background: message.trim() ? '#e8c97e' : '#1a1a1a',
                color: message.trim() ? '#0a0a0a' : '#555',
                border:'none', borderRadius:'100px',
                padding:'0.7rem 1.25rem', fontSize:'0.82rem',
                fontWeight:600, cursor: message.trim() ? 'pointer' : 'default',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                flexShrink:0,
              }}
            >Send ↗</button>
          </div>
        </div>
      </div>

      {/* Info panel — slides in when info button clicked */}
      {showInfo && (
        <div style={{
          width:'280px', flexShrink:0, padding:'1.5rem',
          borderLeft:'1px solid #2a2a2a', overflowY:'auto',
          display:'flex', flexDirection:'column', gap:'1.25rem',
        }}>
          {/* Profile summary */}
          <div style={{ textAlign:'center', paddingBottom:'1.25rem', borderBottom:'1px solid #2a2a2a' }}>
            <div style={{
              width:'64px', height:'64px', borderRadius:'50%',
              background: activeConvo.gradient, display:'flex',
              alignItems:'center', justifyContent:'center',
              fontSize:'1rem', fontWeight:700, color:'#0a0a0a',
              margin:'0 auto 0.75rem',
            }}>{activeConvo.avatar}</div>
            <div style={{ fontSize:'0.95rem', fontWeight:600, color:'#f0ede8' }}>{activeConvo.name}</div>
            <div style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.2rem' }}>@{activeConvo.username}</div>
            <div style={{
              display:'flex', gap:'0.5rem', justifyContent:'center', marginTop:'0.85rem',
            }}>
              <button style={{
                background:'#e8c97e', color:'#0a0a0a', border:'none',
                borderRadius:'100px', padding:'0.4rem 1rem',
                fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>View profile</button>
              <button style={{
                background:'transparent', color:'#888', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.4rem 1rem',
                fontSize:'0.75rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>Mute</button>
            </div>
          </div>

          {/* Shared posts */}
          <div>
            <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              Shared posts
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px', borderRadius:'8px', overflow:'hidden' }}>
              {['🌅','🌃','🌿','🌺','🏛','🌌'].map((emoji, i) => (
                <div key={i} style={{
                  aspectRatio:'1', background:'#1a1a1a',
                  display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'1.2rem', cursor:'pointer',
                }}>{emoji}</div>
              ))}
            </div>
          </div>

          {/* Privacy controls — Inspira exclusive */}
          <div style={{
            background:'rgba(232,201,126,0.04)',
            border:'1px solid rgba(232,201,126,0.1)',
            borderRadius:'12px', padding:'1rem',
          }}>
            <div style={{ fontSize:'0.68rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              ✦ Privacy controls
            </div>
            {[
              { label:'Read receipts', on:false },
              { label:'Message requests', on:true },
              { label:'Share activity', on:false },
            ].map((item, i) => (
              <div key={item.label} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'0.45rem 0',
                borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
              }}>
                <span style={{ fontSize:'0.78rem', color:'#666' }}>{item.label}</span>
                <div style={{
                  width:'28px', height:'16px', borderRadius:'100px',
                  background: item.on ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                  position:'relative', cursor:'pointer',
                  border: item.on ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
                }}>
                  <div style={{
                    width:'10px', height:'10px', borderRadius:'50%',
                    background: item.on ? '#e8c97e' : '#555',
                    position:'absolute', top:'2px',
                    left: item.on ? '14px' : '2px',
                    transition:'all 0.2s',
                  }}/>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {['Block user', 'Report', 'Delete conversation'].map(action => (
              <button key={action} style={{
                background:'transparent',
                border:'1px solid #2a2a2a', borderRadius:'10px',
                padding:'0.6rem', color: action === 'Block user' || action === 'Report' ? '#c96f6f' : '#555',
                fontSize:'0.78rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
              >{action}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}