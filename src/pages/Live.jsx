import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const liveStreams = [
  {
    id:1,
    user:{ name:'Nisha Kapoor', username:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', verified:true },
    title:'Golden hour photography tips 📸',
    viewers:1842, emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)',
    duration:'24:18', category:'Photography',
    coHost:{ name:'Arjun Lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)' },
  },
  {
    id:2,
    user:{ name:'Maya Art', username:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', verified:true },
    title:'Live painting session 🎨 Watch me create',
    viewers:3291, emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)',
    duration:'1:02:44', category:'Art',
    coHost:null,
  },
  {
    id:3,
    user:{ name:'Rohan Travels', username:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', verified:false },
    title:'Exploring Coorg — live travel vlog 🌿',
    viewers:892, emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)',
    duration:'45:22', category:'Travel',
    coHost:null,
  },
  {
    id:4,
    user:{ name:'Ananya Studio', username:'ananya.studio', avatar:'AS', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', verified:true },
    title:'Q&A: Behind my minimal aesthetic ✨',
    viewers:2104, emoji:'✨', bg:'linear-gradient(135deg,#1a1a0f,#3a3a1e)',
    duration:'18:56', category:'Lifestyle',
    coHost:null,
  },
]

const scheduledLives = [
  { user:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', title:'Lightroom masterclass', date:'Tomorrow', time:'7:00 PM', reminder:false },
  { user:'cosmos.lens', avatar:'CL', gradient:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', title:'Astrophotography live shoot', date:'Mar 24', time:'10:00 PM', reminder:true },
  { user:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', title:'New painting reveal', date:'Mar 25', time:'6:00 PM', reminder:false },
]

export default function Live() {
  const navigate = useNavigate()
  const [activeStream, setActiveStream] = useState(liveStreams[0])
  const [isGoingLive, setIsGoingLive] = useState(false)
  const [liveTitle, setLiveTitle] = useState('')
  const [liveCategory, setLiveCategory] = useState('Photography')
  const [chatMessages, setChatMessages] = useState([
    { id:1, user:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', text:'Welcome everyone! 🎉', time:'24:01', pinned:true },
    { id:2, user:'arjun.lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', text:'This lighting is incredible 🌅', time:'24:05' },
    { id:3, user:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', text:'What camera are you using?', time:'24:08' },
    { id:4, user:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', text:'Been following you for 2 years, this is amazing', time:'24:10' },
    { id:5, user:'user482', avatar:'U4', gradient:'linear-gradient(135deg,#555,#333)', text:'❤️❤️❤️', time:'24:12' },
    { id:6, user:'flora.studio', avatar:'FS', gradient:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', text:'The colors are so warm', time:'24:15' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [showGoLive, setShowGoLive] = useState(false)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [reminders, setReminders] = useState({})
  const [reactions, setReactions] = useState([])
  const chatEndRef = useRef(null)
  const reactionId = useRef(0)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [chatMessages])

  const sendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, {
      id: Date.now(), user:'your.handle', avatar:'You',
      gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)',
      text: chatInput, time:'now', isMe:true,
    }])
    setChatInput('')
  }

  const sendReaction = (emoji) => {
    const id = reactionId.current++
    setReactions(prev => [...prev, { id, emoji }])
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2000)
  }

  const toggleReminder = (idx) => {
    setReminders(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Header */}
        <div style={{
          padding:'1.5rem 2rem 1rem',
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          borderBottom:'1px solid #2a2a2a',
          flexShrink:0,
        }}>
          <div>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.6rem', fontWeight:600, color:'#f0ede8', margin:0,
            }}>Live</h1>
            <p style={{ fontSize:'0.72rem', color:'#555', marginTop:'2px' }}>
              {liveStreams.length} streams live now
            </p>
          </div>
          <button
            onClick={() => setShowGoLive(true)}
            style={{
              background:'#c96f6f', color:'white', border:'none',
              borderRadius:'100px', padding:'0.6rem 1.5rem',
              fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif",
              display:'flex', alignItems:'center', gap:'0.5rem',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#d48080'}
            onMouseLeave={e => e.currentTarget.style.background='#c96f6f'}
          >
            <span style={{
              width:'8px', height:'8px', borderRadius:'50%',
              background:'white', display:'inline-block',
              animation:'pulse 1.5s ease-in-out infinite',
            }}/>
            Go Live
          </button>
        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes floatUp { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-120px);opacity:0} }
        `}</style>

        <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

          {/* Left — stream list */}
          <div style={{
            width:'280px', flexShrink:0,
            borderRight:'1px solid #2a2a2a',
            overflowY:'auto', padding:'1rem',
          }}>
            <div style={{ fontSize:'0.65rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              🔴 Live now
            </div>
            {liveStreams.map(stream => (
              <div
                key={stream.id}
                onClick={() => setActiveStream(stream)}
                style={{
                  borderRadius:'12px', overflow:'hidden', marginBottom:'0.75rem',
                  border: activeStream.id === stream.id ? '1px solid #e8c97e' : '1px solid #2a2a2a',
                  cursor:'pointer', transition:'all 0.2s',
                }}
                onMouseEnter={e => { if (activeStream.id !== stream.id) e.currentTarget.style.borderColor='#3a3a3a' }}
                onMouseLeave={e => { if (activeStream.id !== stream.id) e.currentTarget.style.borderColor='#2a2a2a' }}
              >
                <div style={{
                  height:'100px', background: stream.bg,
                  display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'2.5rem',
                  position:'relative',
                }}>
                  {stream.emoji}
                  <div style={{
                    position:'absolute', top:'6px', left:'6px',
                    background:'#c96f6f', color:'white',
                    fontSize:'0.6rem', fontWeight:700, padding:'0.15rem 0.5rem',
                    borderRadius:'100px', display:'flex', alignItems:'center', gap:'3px',
                  }}>
                    <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'white', display:'inline-block' }}/>
                    LIVE
                  </div>
                  <div style={{
                    position:'absolute', bottom:'6px', right:'6px',
                    background:'rgba(0,0,0,0.7)', fontSize:'0.6rem',
                    color:'white', padding:'0.15rem 0.45rem', borderRadius:'4px',
                  }}>{stream.duration}</div>
                </div>
                <div style={{ padding:'0.65rem 0.75rem', background:'#111' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem' }}>
                    <div style={{
                      width:'20px', height:'20px', borderRadius:'50%',
                      background: stream.user.gradient, display:'flex',
                      alignItems:'center', justifyContent:'center',
                      fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                    }}>{stream.user.avatar}</div>
                    <span style={{ fontSize:'0.75rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {stream.user.username}
                    </span>
                    {stream.user.verified && (
                      <span style={{ background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%', width:'11px', height:'11px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.4rem', fontWeight:700, flexShrink:0 }}>✓</span>
                    )}
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#888', marginBottom:'0.35rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {stream.title}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'0.65rem', color:'#555' }}>
                      👁 {stream.viewers.toLocaleString()}
                    </span>
                    <span style={{
                      background:'#1a1a1a', color:'#555',
                      fontSize:'0.6rem', padding:'0.1rem 0.45rem',
                      borderRadius:'100px', border:'1px solid #2a2a2a',
                    }}>{stream.category}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Scheduled */}
            <div style={{ fontSize:'0.65rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', margin:'1rem 0 0.75rem' }}>
              📅 Scheduled
            </div>
            {scheduledLives.map((live, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:'0.65rem',
                padding:'0.65rem 0.75rem', background:'#111',
                border:'1px solid #2a2a2a', borderRadius:'10px',
                marginBottom:'0.5rem',
              }}>
                <div style={{
                  width:'32px', height:'32px', borderRadius:'50%',
                  background: live.gradient, display:'flex',
                  alignItems:'center', justifyContent:'center',
                  fontSize:'0.6rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                }}>{live.avatar}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'0.75rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {live.title}
                  </div>
                  <div style={{ fontSize:'0.65rem', color:'#555' }}>
                    {live.date} · {live.time}
                  </div>
                </div>
                <button
                  onClick={() => toggleReminder(i)}
                  style={{
                    background: reminders[i] || live.reminder ? 'rgba(232,201,126,0.1)' : 'transparent',
                    border: reminders[i] || live.reminder ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.2rem 0.55rem',
                    color: reminders[i] || live.reminder ? '#e8c97e' : '#555',
                    fontSize:'0.65rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", flexShrink:0,
                    transition:'all 0.2s',
                  }}
                >{reminders[i] || live.reminder ? '🔔' : '🔕'}</button>
              </div>
            ))}
          </div>

          {/* Center — active stream */}
          <div style={{
            flex:1, display:'flex', flexDirection:'column',
            position:'relative', overflow:'hidden',
          }}>
            {/* Stream view */}
            <div style={{
              flex:1, background: activeStream.bg,
              display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:'8rem',
              position:'relative', overflow:'hidden',
            }}>
              {activeStream.emoji}

              {/* Live badge */}
              <div style={{
                position:'absolute', top:'1rem', left:'1rem',
                display:'flex', alignItems:'center', gap:'0.5rem',
              }}>
                <div style={{
                  background:'#c96f6f', color:'white',
                  fontSize:'0.75rem', fontWeight:700,
                  padding:'0.3rem 0.75rem', borderRadius:'100px',
                  display:'flex', alignItems:'center', gap:'5px',
                }}>
                  <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'white', animation:'pulse 1.5s ease-in-out infinite', display:'inline-block' }}/>
                  LIVE
                </div>
                <div style={{
                  background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
                  color:'white', fontSize:'0.78rem',
                  padding:'0.3rem 0.75rem', borderRadius:'100px',
                }}>
                  👁 {activeStream.viewers.toLocaleString()}
                </div>
                <div style={{
                  background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
                  color:'white', fontSize:'0.78rem',
                  padding:'0.3rem 0.75rem', borderRadius:'100px',
                }}>
                  ⏱ {activeStream.duration}
                </div>
              </div>

              {/* Inspira exclusive — save live replay */}
              <div style={{
                position:'absolute', top:'1rem', right:'1rem',
                background:'rgba(232,201,126,0.15)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(232,201,126,0.3)',
                borderRadius:'100px', padding:'0.3rem 0.75rem',
                fontSize:'0.65rem', color:'#e8c97e',
                display:'flex', alignItems:'center', gap:'0.35rem',
              }}>
                ✦ Replay saved automatically
              </div>

              {/* Co-host */}
              {activeStream.coHost && (
                <div style={{
                  position:'absolute', bottom:'1rem', left:'1rem',
                  background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)',
                  borderRadius:'12px', padding:'0.5rem 0.75rem',
                  display:'flex', alignItems:'center', gap:'0.5rem',
                }}>
                  <div style={{
                    width:'28px', height:'28px', borderRadius:'50%',
                    background: activeStream.coHost.gradient,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.55rem', fontWeight:700, color:'#0a0a0a',
                  }}>{activeStream.coHost.avatar}</div>
                  <div>
                    <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.5)' }}>Co-host</div>
                    <div style={{ fontSize:'0.72rem', color:'white', fontWeight:500 }}>{activeStream.coHost.name}</div>
                  </div>
                </div>
              )}

              {/* Floating reactions */}
              <div style={{ position:'absolute', right:'1rem', bottom:'5rem', pointerEvents:'none' }}>
                {reactions.map(r => (
                  <div key={r.id} style={{
                    position:'absolute', bottom:0, right:0,
                    fontSize:'1.5rem', animation:'floatUp 2s ease-out forwards',
                  }}>{r.emoji}</div>
                ))}
              </div>

              {/* Stream title overlay */}
              <div style={{
                position:'absolute', bottom:'1rem', right:'1rem',
                background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)',
                borderRadius:'12px', padding:'0.6rem 0.85rem',
                maxWidth:'240px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem' }}>
                  <div style={{
                    width:'22px', height:'22px', borderRadius:'50%',
                    background: activeStream.user.gradient,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                  }}>{activeStream.user.avatar}</div>
                  <span style={{ fontSize:'0.75rem', fontWeight:500, color:'white' }}>
                    {activeStream.user.username}
                  </span>
                </div>
                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.8)', lineHeight:1.4 }}>
                  {activeStream.title}
                </div>
              </div>
            </div>

            {/* Reaction bar */}
            <div style={{
              padding:'0.65rem 1rem',
              background:'#0d0d0d', borderTop:'1px solid #2a2a2a',
              display:'flex', alignItems:'center', gap:'0.5rem',
            }}>
              {['❤️','🔥','😍','👏','💯','😂','🙏'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendReaction(emoji)}
                  style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.3rem 0.65rem',
                    fontSize:'1rem', cursor:'pointer', transition:'transform 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.2)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >{emoji}</button>
              ))}
              <div style={{ marginLeft:'auto', display:'flex', gap:'0.5rem' }}>
                <button
                  onClick={() => setMuted(!muted)}
                  style={{
                    background: muted ? 'rgba(201,111,111,0.2)' : '#111',
                    border: muted ? '1px solid #c96f6f' : '1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.3rem 0.75rem',
                    color: muted ? '#c96f6f' : '#555', fontSize:'0.78rem',
                    cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  }}
                >{muted ? '🔇 Muted' : '🔊 Sound'}</button>
                <button style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.3rem 0.75rem',
                  color:'#555', fontSize:'0.78rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}>↗ Share</button>
              </div>
            </div>
          </div>

          {/* Right — chat */}
          <div style={{
            width:'300px', flexShrink:0,
            borderLeft:'1px solid #2a2a2a',
            display:'flex', flexDirection:'column',
            height:'100%',
          }}>
            {/* Chat header */}
            <div style={{
              padding:'1rem 1.25rem', borderBottom:'1px solid #2a2a2a',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              flexShrink:0,
            }}>
              <span style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>Live chat</span>
              <div style={{ display:'flex', gap:'0.4rem' }}>
                {/* Inspira exclusive — slow mode */}
                <button style={{
                  background:'rgba(232,201,126,0.08)',
                  border:'1px solid rgba(232,201,126,0.2)',
                  borderRadius:'100px', padding:'0.2rem 0.6rem',
                  color:'#e8c97e', fontSize:'0.65rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}>✦ Slow mode</button>
                <button style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.2rem 0.6rem',
                  color:'#555', fontSize:'0.65rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                }}>🛡 Moderation</button>
              </div>
            </div>

            {/* Pinned message — Inspira exclusive */}
            <div style={{
              padding:'0.65rem 1rem',
              background:'rgba(232,201,126,0.05)',
              borderBottom:'1px solid rgba(232,201,126,0.1)',
              display:'flex', alignItems:'center', gap:'0.5rem',
              flexShrink:0,
            }}>
              <span style={{ fontSize:'0.65rem', color:'#e8c97e', flexShrink:0 }}>📌</span>
              <span style={{ fontSize:'0.72rem', color:'#888' }}>Welcome everyone! 🎉</span>
            </div>

            {/* Messages */}
            <div style={{
              flex:1, overflowY:'auto', padding:'0.75rem 1rem',
              display:'flex', flexDirection:'column', gap:'0.6rem',
            }}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{
                  display:'flex', gap:'0.5rem', alignItems:'flex-start',
                  background: msg.isMe ? 'rgba(232,201,126,0.06)' : 'transparent',
                  borderRadius:'8px', padding: msg.isMe ? '0.4rem 0.5rem' : '0',
                }}>
                  <div style={{
                    width:'24px', height:'24px', borderRadius:'50%',
                    background: msg.gradient, display:'flex',
                    alignItems:'center', justifyContent:'center',
                    fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                  }}>{msg.avatar}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{
                      fontSize:'0.72rem', fontWeight:600,
                      color: msg.isMe ? '#e8c97e' : '#888',
                      marginRight:'0.4rem',
                    }}>{msg.user}</span>
                    <span style={{ fontSize:'0.78rem', color: msg.isMe ? '#f0ede8' : '#aaa' }}>
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <div style={{
              padding:'0.75rem 1rem', borderTop:'1px solid #2a2a2a',
              flexShrink:0,
            }}>
              <div style={{ display:'flex', gap:'0.5rem' }}>
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
                  placeholder="Say something..."
                  style={{
                    flex:1, background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.55rem 0.9rem',
                    color:'#f0ede8', fontSize:'0.8rem',
                    fontFamily:"'Outfit',sans-serif", outline:'none',
                  }}
                  onFocus={e => e.target.style.borderColor='#e8c97e'}
                  onBlur={e => e.target.style.borderColor='#2a2a2a'}
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  style={{
                    background: chatInput.trim() ? '#e8c97e' : '#1a1a1a',
                    color: chatInput.trim() ? '#0a0a0a' : '#555',
                    border:'none', borderRadius:'100px',
                    padding:'0.55rem 0.9rem', fontSize:'0.78rem',
                    fontWeight:600, cursor: chatInput.trim() ? 'pointer' : 'default',
                    fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                  }}
                >↗</button>
              </div>

              {/* Inspira chat features */}
              <div style={{
                display:'flex', gap:'0.5rem', marginTop:'0.5rem',
                flexWrap:'wrap',
              }}>
                {['Q&A mode','Word filter','Block list'].map(feat => (
                  <button key={feat} style={{
                    background:'transparent', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.2rem 0.55rem',
                    color:'#444', fontSize:'0.62rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", transition:'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color='#666'}
                    onMouseLeave={e => e.target.style.color='#444'}
                  >{feat}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Go Live modal */}
      {showGoLive && (
        <div style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.85)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:100, backdropFilter:'blur(12px)',
        }}
          onClick={() => setShowGoLive(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'20px', padding:'2rem', width:'440px',
              maxHeight:'90vh', overflowY:'auto',
            }}
          >
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.6rem', fontWeight:600, color:'#f0ede8',
              marginBottom:'0.35rem',
            }}>Go Live</h2>
            <p style={{ fontSize:'0.78rem', color:'#555', marginBottom:'1.5rem' }}>
              Your live will be saved automatically — unlike Instagram
            </p>

            {/* Camera preview */}
            <div style={{
              width:'100%', aspectRatio:'16/9',
              background:'#1a1a1a', borderRadius:'12px',
              display:'flex', alignItems:'center', justifyContent:'center',
              marginBottom:'1.5rem', position:'relative', overflow:'hidden',
              border:'1px solid #2a2a2a',
            }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>📷</div>
                <div style={{ fontSize:'0.78rem', color:'#555' }}>Camera preview</div>
              </div>
              <div style={{
                position:'absolute', bottom:'0.75rem',
                left:'50%', transform:'translateX(-50%)',
                display:'flex', gap:'0.75rem',
              }}>
                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  style={{
                    background: cameraOff ? 'rgba(201,111,111,0.8)' : 'rgba(0,0,0,0.6)',
                    border:'none', borderRadius:'50%', width:'40px', height:'40px',
                    color:'white', fontSize:'1rem', cursor:'pointer',
                  }}
                >{cameraOff ? '📵' : '📷'}</button>
                <button
                  onClick={() => setMuted(!muted)}
                  style={{
                    background: muted ? 'rgba(201,111,111,0.8)' : 'rgba(0,0,0,0.6)',
                    border:'none', borderRadius:'50%', width:'40px', height:'40px',
                    color:'white', fontSize:'1rem', cursor:'pointer',
                  }}
                >{muted ? '🔇' : '🎤'}</button>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>Title</div>
              <input
                value={liveTitle}
                onChange={e => setLiveTitle(e.target.value)}
                placeholder="What's your live about?"
                style={{
                  width:'100%', background:'#1a1a1a',
                  border:'1px solid #2a2a2a', borderRadius:'10px',
                  padding:'0.75rem 1rem', color:'#f0ede8',
                  fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                  outline:'none', boxSizing:'border-box',
                }}
                onFocus={e => e.target.style.borderColor='#e8c97e'}
                onBlur={e => e.target.style.borderColor='#2a2a2a'}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.5rem' }}>Category</div>
              <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                {['Photography','Art','Travel','Lifestyle','Music','Gaming','Education','Q&A'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setLiveCategory(cat)}
                    style={{
                      background: liveCategory === cat ? '#e8c97e' : '#1a1a1a',
                      color: liveCategory === cat ? '#0a0a0a' : '#555',
                      border: liveCategory === cat ? 'none' : '1px solid #2a2a2a',
                      borderRadius:'100px', padding:'0.3rem 0.85rem',
                      fontSize:'0.75rem', cursor:'pointer',
                      fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                    }}
                  >{cat}</button>
                ))}
              </div>
            </div>

            {/* Inspira live features */}
            <div style={{
              background:'rgba(232,201,126,0.04)',
              border:'1px solid rgba(232,201,126,0.1)',
              borderRadius:'12px', padding:'1rem', marginBottom:'1.5rem',
            }}>
              <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                ✦ Inspira live features
              </div>
              {[
                ['💾', 'Replay saved automatically — Instagram deletes lives'],
                ['🗓', 'Schedule in advance — Instagram can\'t do this'],
                ['🛡', 'Built-in chat moderation tools'],
                ['🤝', 'Invite co-hosts mid-stream'],
                ['📌', 'Pin important messages'],
                ['🐌', 'Slow mode to control chat speed'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display:'flex', gap:'0.5rem', marginBottom:'0.4rem' }}>
                  <span style={{ fontSize:'0.8rem', flexShrink:0 }}>{icon}</span>
                  <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button
                onClick={() => setShowGoLive(false)}
                style={{
                  flex:1, background:'transparent',
                  border:'1px solid #2a2a2a', borderRadius:'100px',
                  padding:'0.75rem', color:'#555', fontSize:'0.85rem',
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                }}
              >Cancel</button>
              <button
                onClick={() => setShowGoLive(false)}
                style={{
                  flex:2, background:'#c96f6f', color:'white',
                  border:'none', borderRadius:'100px', padding:'0.75rem',
                  fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif",
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                }}
              >
                <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'white', animation:'pulse 1.5s ease-in-out infinite', display:'inline-block' }}/>
                Start Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}