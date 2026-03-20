import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { storiesData } from '../constants/data'

export default function Stories() {
  const navigate = useNavigate()
  const [userIndex, setUserIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showViewers, setShowViewers] = useState(false)
  const [reply, setReply] = useState('')
  const [liked, setLiked] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const intervalRef = useRef(null)
  const DURATION = 5000

  const currentUser = storiesData[userIndex]
  const currentStory = currentUser?.stories[storyIndex]

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goNext()
          return 0
        }
        return prev + (100 / (DURATION / 100))
      })
    }, 100)
    return () => clearInterval(intervalRef.current)
  }, [paused, storyIndex, userIndex])

 const goNext = () => {
  clearInterval(intervalRef.current)
  setProgress(0)
  setLiked(false)
  
  const currentUserStories = storiesData[userIndex]?.stories || []
  
  if (storyIndex < currentUserStories.length - 1) {
    setStoryIndex(prev => prev + 1)
  } else if (userIndex < storiesData.length - 1) {
    setUserIndex(prev => prev + 1)
    setStoryIndex(0)
  } else {
    navigate('/feed')
  }
}

  const goPrev = () => {
    clearInterval(intervalRef.current)
    setProgress(0)
    setLiked(false)
    if (storyIndex > 0) {
      setStoryIndex(prev => prev - 1)
    } else if (userIndex > 0) {
      setUserIndex(prev => prev - 1)
      setStoryIndex(storiesData[userIndex - 1].stories.length - 1)
    }
  }

  const sendReply = () => {
    if (!reply.trim()) return
    setReply('')
  }

  if (!currentStory) return null

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0a',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Outfit',sans-serif", position:'relative',
    }}>
      {/* Background blur */}
      <div style={{
        position:'fixed', inset:0,
        background: currentStory.bg, opacity:0.15,
        filter:'blur(40px)',
      }}/>

      {/* Close button */}
      <button
        onClick={() => navigate('/feed')}
        style={{
          position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:100,
          background:'rgba(10,10,10,0.6)', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:'50%', width:'40px', height:'40px',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#f0ede8', fontSize:'1.1rem', cursor:'pointer',
          backdropFilter:'blur(8px)',
        }}
      >✕</button>

      {/* User avatars strip — other stories */}
      <div style={{
        position:'fixed', top:'1.5rem', left:'50%',
        transform:'translateX(-50%)',
        display:'flex', gap:'0.75rem', zIndex:100,
      }}>
        {storiesData.map((user, i) => (
          <div
            key={user.id}
            onClick={() => { setUserIndex(i); setStoryIndex(0); setProgress(0) }}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              gap:'0.3rem', cursor:'pointer', opacity: i === userIndex ? 1 : 0.5,
              transition:'opacity 0.2s',
            }}
          >
            <div style={{
              width: i === userIndex ? '40px' : '32px',
              height: i === userIndex ? '40px' : '32px',
              borderRadius:'50%', background: user.user.gradient,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: i === userIndex ? '0.72rem' : '0.6rem',
              fontWeight:700, color:'#0a0a0a',
              border: i === userIndex ? '2px solid #e8c97e' : '2px solid transparent',
              transition:'all 0.2s',
            }}>{user.user.avatar}</div>
          </div>
        ))}
      </div>

      {/* Main story card */}
      <div style={{
        width:'420px', height:'680px', borderRadius:'20px',
        overflow:'hidden', position:'relative', zIndex:10,
        boxShadow:'0 40px 80px rgba(0,0,0,0.8)',
        background: currentStory.bg,
      }}>
        {/* Progress bars */}
        <div style={{
          position:'absolute', top:'1rem', left:'1rem', right:'1rem',
          display:'flex', gap:'4px', zIndex:30,
        }}>
          {currentUser.stories.map((_, i) => (
            <div key={i} style={{
              flex:1, height:'3px', borderRadius:'100px',
              background:'rgba(255,255,255,0.25)', overflow:'hidden',
            }}>
              <div style={{
                height:'100%', borderRadius:'100px',
                background:'white',
                width: i < storyIndex ? '100%' : i === storyIndex ? `${progress}%` : '0%',
                transition: i === storyIndex ? 'none' : 'none',
              }}/>
            </div>
          ))}
        </div>

        {/* Story header */}
        <div style={{
          position:'absolute', top:'2.5rem', left:'1rem', right:'1rem',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          zIndex:30,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
            <div style={{
              width:'36px', height:'36px', borderRadius:'50%',
              background: currentUser.user.gradient, display:'flex',
              alignItems:'center', justifyContent:'center',
              fontSize:'0.7rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
            }}>{currentUser.user.avatar}</div>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                <span style={{ fontSize:'0.85rem', fontWeight:600, color:'white' }}>
                  {currentUser.user.username}
                </span>
                {currentUser.user.verified && (
                  <span style={{
                    background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                    width:'14px', height:'14px', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'0.5rem', fontWeight:700,
                  }}>✓</span>
                )}
              </div>
              <div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.6)' }}>
                {Math.floor(Math.random() * 4) + 1}h ago
              </div>
            </div>
          </div>

          <div style={{ display:'flex', gap:'0.5rem' }}>
            {/* Pause button — Inspira lets you pause properly */}
            <button
              onClick={() => setPaused(!paused)}
              style={{
                background:'rgba(10,10,10,0.5)', border:'none',
                borderRadius:'50%', width:'32px', height:'32px',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'white', fontSize:'0.8rem', cursor:'pointer',
              }}
            >{paused ? '▶' : '⏸'}</button>
            <button style={{
              background:'rgba(10,10,10,0.5)', border:'none',
              borderRadius:'50%', width:'32px', height:'32px',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontSize:'0.8rem', cursor:'pointer',
            }}>⋯</button>
          </div>
        </div>

        {/* Story content */}
        <div style={{
          width:'100%', height:'100%', display:'flex',
          alignItems:'center', justifyContent:'center', fontSize:'8rem',
          userSelect:'none',
        }}
          onClick={e => {
            const x = e.clientX - e.currentTarget.getBoundingClientRect().left
            const width = e.currentTarget.offsetWidth
            if (x < width / 2) goPrev()
            else goNext()
          }}
        >
          {currentStory.emoji}
        </div>

        {/* Location */}
        {currentStory.location && (
          <div style={{
            position:'absolute', top:'6rem', left:'1rem',
            background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
            borderRadius:'100px', padding:'0.2rem 0.65rem',
            fontSize:'0.7rem', color:'rgba(255,255,255,0.8)',
            display:'flex', alignItems:'center', gap:'0.3rem',
          }}>
            📍 {currentStory.location}
          </div>
        )}

        {/* Caption */}
        <div style={{
          position:'absolute', bottom:'7rem', left:'1rem', right:'1rem',
        }}>
          <p style={{
            fontSize:'0.95rem', color:'white', fontWeight:500,
            textShadow:'0 2px 8px rgba(0,0,0,0.8)', lineHeight:1.5,
            margin:0,
          }}>{currentStory.caption}</p>
        </div>

        {/* Bottom actions */}
        <div style={{
          position:'absolute', bottom:'1rem', left:'1rem', right:'1rem',
          display:'flex', alignItems:'center', gap:'0.65rem', zIndex:30,
        }}>
          {/* Reply input */}
          <input
            value={reply}
            onChange={e => setReply(e.target.value)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            placeholder={`Reply to ${currentUser.user.username}...`}
            style={{
              flex:1, background:'rgba(255,255,255,0.1)',
              backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.2)',
              borderRadius:'100px', padding:'0.6rem 1rem',
              color:'white', fontSize:'0.82rem',
              fontFamily:"'Outfit',sans-serif", outline:'none',
            }}
            onKeyDown={e => { if (e.key === 'Enter') sendReply() }}
          />

          {/* Like */}
          <button
            onClick={() => setLiked(!liked)}
            style={{
              background:'rgba(10,10,10,0.5)', border:'none',
              borderRadius:'50%', width:'40px', height:'40px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.2rem', cursor:'pointer',
              color: liked ? '#e8557a' : 'white',
              transition:'all 0.2s',
            }}
          >{liked ? '♥' : '♡'}</button>

          {/* Share */}
          <button style={{
            background:'rgba(10,10,10,0.5)', border:'none',
            borderRadius:'50%', width:'40px', height:'40px',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.1rem', cursor:'pointer', color:'white',
          }}>↗</button>
        </div>

        {/* Left/Right tap zones — invisible */}
        <div style={{
          position:'absolute', inset:0, display:'flex', zIndex:20,
          pointerEvents:'none',
        }}>
          <div style={{ flex:1, cursor:'pointer', pointerEvents:'all' }}
            onClick={goPrev}
          />
          <div style={{ flex:1, cursor:'pointer', pointerEvents:'all' }}
            onClick={goNext}
          />
        </div>
      </div>

      {/* Viewers panel — Inspira shows who viewed, Instagram hides order algorithm */}
      <div style={{
        position:'fixed', right:'2rem', top:'50%',
        transform:'translateY(-50%)', zIndex:100,
        display:'flex', flexDirection:'column', gap:'1rem',
      }}>
        {/* Viewers count */}
        <div
          onClick={() => setShowViewers(!showViewers)}
          style={{
            background:'rgba(10,10,10,0.8)', backdropFilter:'blur(12px)',
            border:'1px solid rgba(232,201,126,0.2)', borderRadius:'14px',
            padding:'0.85rem 1rem', cursor:'pointer', textAlign:'center',
            minWidth:'120px',
          }}
        >
          <div style={{
            fontSize:'1.4rem', fontWeight:600, color:'#e8c97e',
            fontFamily:"'Cormorant Garamond',serif",
          }}>{currentStory.viewers.toLocaleString()}</div>
          <div style={{ fontSize:'0.68rem', color:'#555', marginTop:'2px' }}>viewers</div>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', marginTop:'4px' }}>
            ✦ tap to see who
          </div>
        </div>

        {showViewers && (
          <div style={{
            background:'rgba(10,10,10,0.95)', backdropFilter:'blur(12px)',
            border:'1px solid #2a2a2a', borderRadius:'14px',
            padding:'1rem', minWidth:'200px',
          }}>
            <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              ✦ Story viewers
            </div>
            <div style={{
              fontSize:'0.68rem', color:'#555', marginBottom:'0.75rem',
              padding:'0.5rem', background:'rgba(232,201,126,0.05)',
              borderRadius:'8px', lineHeight:1.5,
            }}>
              Unlike Instagram, Inspira shows viewers in chronological order — not algorithmically reordered.
            </div>
            {['nisha.creates','arjun.lens','maya.art','rohan.travels','priya.frames'].map((u, i) => (
              <div key={u} style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                padding:'0.4rem 0',
                borderBottom: i < 4 ? '1px solid #1a1a1a' : 'none',
              }}>
                <div style={{
                  width:'24px', height:'24px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a',
                }}>{u[0].toUpperCase()}</div>
                <span style={{ fontSize:'0.75rem', color:'#888' }}>{u}</span>
                <span style={{ fontSize:'0.65rem', color:'#444', marginLeft:'auto' }}>{i + 1}h ago</span>
              </div>
            ))}
          </div>
        )}

        {/* Privacy controls — Inspira exclusive */}
        <div
          onClick={() => setShowPrivacy(!showPrivacy)}
          style={{
            background:'rgba(10,10,10,0.8)', backdropFilter:'blur(12px)',
            border:'1px solid rgba(232,201,126,0.15)', borderRadius:'14px',
            padding:'0.75rem 1rem', cursor:'pointer', textAlign:'center',
          }}
        >
          <div style={{ fontSize:'0.75rem', color:'#555' }}>🔒 Privacy</div>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', marginTop:'2px' }}>✦ control</div>
        </div>

        {showPrivacy && (
          <div style={{
            background:'rgba(10,10,10,0.95)', backdropFilter:'blur(12px)',
            border:'1px solid #2a2a2a', borderRadius:'14px',
            padding:'1rem', minWidth:'200px',
          }}>
            <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
              ✦ Story privacy
            </div>
            {[
              { label:'Hide from specific users', on:false },
              { label:'Close friends only', on:false },
              { label:'Allow replies', on:true },
              { label:'Show view count', on:true },
            ].map((item, i) => (
              <div key={item.label} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'0.5rem 0',
                borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
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
                    left: item.on ? '14px' : '2px',
                    transition:'all 0.2s',
                  }}/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Left nav arrow */}
      {(userIndex > 0 || storyIndex > 0) && (
        <button onClick={goPrev} style={{
          position:'fixed', left:'2rem', top:'50%',
          transform:'translateY(-50%)', zIndex:100,
          background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
          width:'44px', height:'44px', display:'flex',
          alignItems:'center', justifyContent:'center',
          color:'white', fontSize:'1.1rem', cursor:'pointer',
        }}>←</button>
      )}

      {/* Right nav arrow */}
      {(userIndex < storiesData.length - 1 || storyIndex < currentUser.stories.length - 1) && (
        <button onClick={goNext} style={{
          position:'fixed', left:'calc(50% + 240px)', top:'50%',
          transform:'translateY(-50%)', zIndex:100,
          background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
          width:'44px', height:'44px', display:'flex',
          alignItems:'center', justifyContent:'center',
          color:'white', fontSize:'1.1rem', cursor:'pointer',
        }}>→</button>
      )}
    </div>
  )
}