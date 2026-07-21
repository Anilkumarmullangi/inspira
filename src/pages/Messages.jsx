import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { conversations } from '../constants/data'
import useWindowSize from '../hooks/useWindowSize'

export default function Messages() {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768

  const [activeConvo, setActiveConvo] = useState(conversations[0])
  const [message, setMessage] = useState('')
  const [allConvos, setAllConvos] = useState(conversations)
  const [search, setSearch] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

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

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const openConvo = (convo) => {
    setActiveConvo(convo)
    if (isMobile) setShowChat(true)
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

      {/* Conversation list — hidden on mobile when chat is open */}
      {(!isMobile || !showChat) && (
        <div style={{
          width: isMobile ? '100%' : '280px',
          flexShrink:0,
          borderRight:'1px solid #2a2a2a',
          display:'flex', flexDirection:'column',
          height:'100vh', overflow:'hidden',
        }}>
          {/* Header */}
          <div style={{ padding:'1.25rem 1rem 1rem', borderBottom:'1px solid #2a2a2a', flexShrink:0 }}>
            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'0.85rem',
            }}>
              <div>
                <h2 style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'1.3rem', fontWeight:600, color:'#f0ede8', margin:0,
                }}>Messages</h2>
                {totalUnread > 0 && (
                  <span style={{ fontSize:'0.68rem', color:'#e8c97e' }}>{totalUnread} unread</span>
                )}
              </div>
              <button style={{
                background:'#e8c97e', color:'#0a0a0a', border:'none',
                borderRadius:'100px', padding:'0.35rem 0.85rem',
                fontSize:'0.72rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>+ New</button>
            </div>
            <div style={{ position:'relative' }}>
              <span style={{
                position:'absolute', left:'0.7rem', top:'50%',
                transform:'translateY(-50%)', color:'#555', fontSize:'0.8rem',
              }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search messages..."
                style={{
                  width:'100%', background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.5rem 1rem 0.5rem 2rem',
                  color:'#f0ede8', fontSize:'0.78rem',
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
            padding:'0 1rem', flexShrink:0,
          }}>
            {['All','Unread','Collabs'].map((tab, i) => (
              <button key={tab} style={{
                background:'transparent', border:'none',
                borderBottom: i === 0 ? '2px solid #e8c97e' : '2px solid transparent',
                padding:'0.55rem 0.85rem', fontSize:'0.75rem',
                color: i === 0 ? '#f0ede8' : '#555',
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                marginBottom:'-1px',
              }}>{tab}</button>
            ))}
          </div>

          {/* Conversation list */}
          <div style={{ flex:1, overflowY:'auto' }}>
            {loading ? (
              Array.from({length:6}).map((_,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.85rem 1rem' }}>
                  <div style={{
                    width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
                    background:'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)',
                    backgroundSize:'936px 100%', animation:'shimmer 1.5s infinite linear',
                  }}/>
                  <div style={{ flex:1 }}>
                    <div style={{
                      height:'12px', borderRadius:'6px', marginBottom:'6px', width:'60%',
                      background:'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)',
                      backgroundSize:'936px 100%', animation:'shimmer 1.5s infinite linear',
                    }}/>
                    <div style={{
                      height:'10px', borderRadius:'6px', width:'80%',
                      background:'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)',
                      backgroundSize:'936px 100%', animation:'shimmer 1.5s infinite linear',
                    }}/>
                  </div>
                </div>
              ))
            ) : (
              filtered.map(convo => (
                <div
                  key={convo.id}
                  onClick={() => openConvo(convo)}
                  style={{
                    display:'flex', alignItems:'center', gap:'0.75rem',
                    padding:'0.85rem 1rem', cursor:'pointer',
                    background: activeConvo.id === convo.id ? '#111' : 'transparent',
                    borderLeft: activeConvo.id === convo.id ? '2px solid #e8c97e' : '2px solid transparent',
                    transition:'all 0.15s',
                  }}
                  onMouseEnter={e => { if (activeConvo.id !== convo.id) e.currentTarget.style.background='#0d0d0d' }}
                  onMouseLeave={e => { if (activeConvo.id !== convo.id) e.currentTarget.style.background='transparent' }}
                >
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
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                        <span style={{
                          fontSize:'0.85rem', fontWeight: convo.unread > 0 ? 600 : 500,
                          color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                          maxWidth:'120px',
                        }}>{convo.name}</span>
                        {convo.verified && (
                          <span style={{
                            background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                            width:'13px', height:'13px', display:'flex', alignItems:'center',
                            justifyContent:'center', fontSize:'0.45rem', fontWeight:700, flexShrink:0,
                          }}>✓</span>
                        )}
                      </div>
                      <span style={{ fontSize:'0.65rem', color:'#444', flexShrink:0 }}>{convo.time}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{
                        fontSize:'0.73rem', color: convo.unread > 0 ? '#888' : '#444',
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'160px',
                      }}>{convo.lastMessage}</span>
                      {convo.unread > 0 && (
                        <span style={{
                          background:'#e8c97e', color:'#0a0a0a',
                          borderRadius:'100px', fontSize:'0.6rem', fontWeight:700,
                          padding:'0.1rem 0.4rem', flexShrink:0,
                        }}>{convo.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Chat window — hidden on mobile when list is showing */}
      {(!isMobile || showChat) && (
        <div style={{
          flex:1, minWidth:0, display:'flex', flexDirection:'column',
          height:'100vh', overflow:'hidden',
          borderRight: showInfo ? '1px solid #2a2a2a' : 'none',
        }}>
          {/* Chat header */}
          <div style={{
            padding:'1rem 1.5rem', borderBottom:'1px solid #2a2a2a',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            background:'#0d0d0d', flexShrink:0,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              {/* Back button on mobile */}
              {isMobile && (
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    background:'transparent', border:'none',
                    color:'#555', fontSize:'1.1rem', cursor:'pointer',
                    padding:'0.25rem',
                  }}
                >←</button>
              )}
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

          {/* Messages area */}
          <div style={{
            flex:1, overflowY:'auto', padding:'1.5rem',
            display:'flex', flexDirection:'column', gap:'0.5rem',
          }}>
            <div style={{ textAlign:'center', marginBottom:'1rem' }}>
              <span style={{
                fontSize:'0.68rem', color:'#333',
                background:'#111', border:'1px solid #1a1a1a',
                padding:'0.3rem 0.85rem', borderRadius:'100px',
              }}>✦ Read receipts are optional on Inspira</span>
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
                  {!isMe && (
                    <div style={{
                      width:'28px', height:'28px', borderRadius:'50%',
                      background: showAvatar ? activeConvo.gradient : 'transparent',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.55rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                    }}>{showAvatar ? activeConvo.avatar : ''}</div>
                  )}
                  <div style={{ maxWidth:'65%' }}>
                    <div style={{
                      background: isMe ? '#e8c97e' : '#1a1a1a',
                      color: isMe ? '#0a0a0a' : '#f0ede8',
                      padding:'0.65rem 1rem',
                      borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize:'0.875rem', lineHeight:1.5,
                      border: isMe ? 'none' : '1px solid #2a2a2a',
                    }}>{msg.text}</div>
                    <div style={{
                      fontSize:'0.62rem', color:'#333', marginTop:'3px',
                      textAlign: isMe ? 'right' : 'left',
                      paddingLeft: isMe ? 0 : '0.25rem',
                      paddingRight: isMe ? '0.25rem' : 0,
                    }}>{msg.time}</div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input area */}
          <div style={{
            padding:'0.85rem 1.5rem', borderTop:'1px solid #2a2a2a',
            background:'#0d0d0d', flexShrink:0,
          }}>
            <div style={{ display:'flex', gap:'0.4rem', marginBottom:'0.6rem', overflowX:'auto' }}>
              {['👏','🔥','😍','💯','✨','🙏','❤️'].map(emoji => (
                <button key={emoji} onClick={() => setMessage(prev => prev + emoji)} style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.22rem 0.55rem',
                  fontSize:'0.82rem', cursor:'pointer', flexShrink:0,
                }}>{emoji}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0.6rem', alignItems:'center' }}>
              {!isMobile && (
                <div style={{ display:'flex', gap:'0.35rem', flexShrink:0 }}>
                  {['📷','🎵','📁'].map(icon => (
                    <button key={icon} style={{
                      background:'transparent', border:'1px solid #2a2a2a',
                      borderRadius:'10px', padding:'0.5rem 0.6rem',
                      color:'#555', fontSize:'0.82rem', cursor:'pointer',
                    }}>{icon}</button>
                  ))}
                </div>
              )}
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Message ${activeConvo.name}...`}
                style={{
                  flex:1, background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.65rem 1.1rem',
                  color:'#f0ede8', fontSize:'0.875rem',
                  fontFamily:"'Outfit',sans-serif", outline:'none',
                }}
                onFocus={e => e.target.style.borderColor='#e8c97e'}
                onBlur={e => e.target.style.borderColor='#2a2a2a'}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                style={{
                  background: message.trim() ? '#e8c97e' : '#1a1a1a',
                  color: message.trim() ? '#0a0a0a' : '#555',
                  border:'none', borderRadius:'100px',
                  padding:'0.65rem 1.1rem', fontSize:'0.82rem',
                  fontWeight:600, cursor: message.trim() ? 'pointer' : 'default',
                  fontFamily:"'Outfit',sans-serif", flexShrink:0,
                }}
              >Send ↗</button>
            </div>
          </div>
        </div>
      )}

      {/* Info panel — desktop only */}
      {showInfo && !isMobile && (
        <div style={{
          width:'260px', flexShrink:0, padding:'1.5rem',
          borderLeft:'1px solid #2a2a2a', overflowY:'auto',
          display:'flex', flexDirection:'column', gap:'1.25rem',
          height:'100vh',
        }}>
          <div style={{ textAlign:'center', paddingBottom:'1.25rem', borderBottom:'1px solid #2a2a2a' }}>
            <div style={{
              width:'64px', height:'64px', borderRadius:'50%',
              background: activeConvo.gradient, display:'flex',
              alignItems:'center', justifyContent:'center',
              fontSize:'1rem', fontWeight:700, color:'#0a0a0a',
              margin:'0 auto 0.75rem',
            }}>{activeConvo.avatar}</div>
            <div style={{ fontSize:'0.95rem', fontWeight:600, color:'#f0ede8' }}>{activeConvo.name}</div>
            <div style={{ fontSize:'0.75rem', color:'#555', marginTop:'0.2rem' }}>@{activeConvo.username}</div>
            <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginTop:'0.85rem' }}>
              <button
                onClick={() => navigate(`/user/${activeConvo.username}`)}
                style={{
                  background:'#e8c97e', color:'#0a0a0a', border:'none',
                  borderRadius:'100px', padding:'0.4rem 1rem',
                  fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}>View profile</button>
              <button style={{
                background:'transparent', color:'#888', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.4rem 1rem',
                fontSize:'0.75rem', cursor:'pointer', fontFamily:"'Outfit',sans-serif",
              }}>Mute</button>
            </div>
          </div>

          <div>
            <div style={{ fontSize:'0.65rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
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

          <div style={{
            background:'rgba(232,201,126,0.04)',
            border:'1px solid rgba(232,201,126,0.1)',
            borderRadius:'12px', padding:'1rem',
          }}>
            <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              ✦ Privacy controls
            </div>
            {[
              { label:'Read receipts', on:false },
              { label:'Message requests', on:true },
              { label:'Share activity', on:false },
            ].map((item, i) => (
              <div key={item.label} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'0.45rem 0', borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
              }}>
                <span style={{ fontSize:'0.75rem', color:'#666' }}>{item.label}</span>
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
                    left: item.on ? '14px' : '2px', transition:'all 0.2s',
                  }}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {['Block user','Report','Delete conversation'].map(action => (
              <button key={action} style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'10px', padding:'0.6rem',
                color: action === 'Delete conversation' ? '#555' : '#c96f6f',
                fontSize:'0.78rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>{action}</button>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes shimmer { 0%{background-position:-468px 0} 100%{background-position:468px 0} }`}</style>
    </div>
  )
}