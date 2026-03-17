import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { reelsData } from '../constants/data'

function ReelCard({ reel, isActive }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(reel.likes)
  const [muted, setMuted] = useState(true)
  const [showWhy, setShowWhy] = useState(false)
  const [following, setFollowing] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const formatNum = n => {
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n/1000).toFixed(1) + 'k'
    return n
  }

  return (
    <div style={{
      height:'100%', width:'100%', position:'relative',
      background: reel.bg, display:'flex',
      alignItems:'center', justifyContent:'center',
      flexShrink:0,
    }}>
      {/* Main visual */}
      <div style={{
        fontSize:'8rem', opacity: isActive ? 1 : 0.3,
        transition:'opacity 0.3s',
        filter:'drop-shadow(0 0 40px rgba(255,255,255,0.1))',
      }}>{reel.emoji}</div>

      {/* Duration badge */}
      <div style={{
        position:'absolute', top:'1rem', left:'1rem',
        background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
        borderRadius:'100px', padding:'0.25rem 0.65rem',
        fontSize:'0.72rem', color:'#f0ede8',
      }}>{reel.duration}</div>

      {/* Mute button */}
      <button
        onClick={() => setMuted(!muted)}
        style={{
          position:'absolute', top:'1rem', right:'1rem',
          background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
          width:'36px', height:'36px', display:'flex',
          alignItems:'center', justifyContent:'center',
          color:'#f0ede8', fontSize:'0.85rem', cursor:'pointer',
        }}
      >{muted ? '🔇' : '🔊'}</button>

      {/* Why am I seeing this — Inspira exclusive, Instagram never shows this */}
      <div style={{ position:'absolute', top:'3.5rem', right:'1rem' }}>
        <button
          onClick={() => setShowWhy(!showWhy)}
          style={{
            background:'rgba(232,201,126,0.15)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(232,201,126,0.3)', borderRadius:'100px',
            padding:'0.25rem 0.65rem', fontSize:'0.65rem',
            color:'#e8c97e', cursor:'pointer', fontFamily:"'Outfit',sans-serif",
          }}
        >✦ Why this reel?</button>
        {showWhy && (
          <div style={{
            position:'absolute', right:0, top:'2rem',
            background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'12px', padding:'0.85rem 1rem',
            width:'220px', zIndex:10,
          }}>
            <div style={{ fontSize:'0.72rem', color:'#e8c97e', fontWeight:500, marginBottom:'0.4rem' }}>
              ✦ Inspira Transparency
            </div>
            <p style={{ fontSize:'0.75rem', color:'#888', lineHeight:1.6, margin:0 }}>
              {reel.whyShowing}. Instagram never tells you why you see content. We always do.
            </p>
            <div style={{
              marginTop:'0.75rem', display:'flex', gap:'0.4rem',
            }}>
              <button style={{
                background:'#1a1a1a', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.25rem 0.65rem',
                fontSize:'0.68rem', color:'#555', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>See less like this</button>
              <button style={{
                background:'#1a1a1a', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.25rem 0.65rem',
                fontSize:'0.68rem', color:'#555', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>Not interested</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:'80px',
        padding:'2rem 1.25rem 1.5rem',
        background:'linear-gradient(transparent, rgba(10,10,10,0.85))',
      }}>
        {/* User info */}
        <div style={{
          display:'flex', alignItems:'center',
          gap:'0.65rem', marginBottom:'0.75rem',
        }}>
          <div style={{
            width:'36px', height:'36px', borderRadius:'50%',
            background: reel.user.gradient, display:'flex',
            alignItems:'center', justifyContent:'center',
            fontSize:'0.7rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
          }}>{reel.user.avatar}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
              <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8' }}>
                {reel.user.username}
              </span>
              {reel.user.verified && (
                <span style={{
                  background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                  width:'14px', height:'14px', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'0.5rem', fontWeight:700, flexShrink:0,
                }}>✓</span>
              )}
            </div>
          </div>
          <button
            onClick={() => setFollowing(!following)}
            style={{
              background: following ? 'transparent' : 'rgba(232,201,126,0.15)',
              border: following ? '1px solid #555' : '1px solid rgba(232,201,126,0.4)',
              borderRadius:'100px', padding:'0.3rem 0.85rem',
              color: following ? '#555' : '#e8c97e',
              fontSize:'0.75rem', fontWeight:500, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
          >{following ? 'Following' : 'Follow'}</button>
        </div>

        {/* Caption */}
        <p style={{
          fontSize:'0.82rem', color:'rgba(240,237,232,0.9)',
          lineHeight:1.5, margin:'0 0 0.5rem',
        }}>{reel.caption}</p>

        {/* Audio */}
        <div style={{
          display:'flex', alignItems:'center', gap:'0.4rem',
          fontSize:'0.72rem', color:'rgba(240,237,232,0.6)',
        }}>
          <span>🎵</span>
          <span style={{
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            maxWidth:'250px',
          }}>{reel.audio}</span>
        </div>

        {/* Reach — Inspira shows this, Instagram hides it */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'0.35rem',
          marginTop:'0.5rem',
          background:'rgba(232,201,126,0.1)', border:'1px solid rgba(232,201,126,0.2)',
          borderRadius:'100px', padding:'0.2rem 0.6rem',
          fontSize:'0.65rem', color:'#e8c97e',
        }}>
          👁 {reel.reach} reach
        </div>
      </div>

      {/* Right action buttons */}
      <div style={{
        position:'absolute', right:'1rem', bottom:'2rem',
        display:'flex', flexDirection:'column',
        alignItems:'center', gap:'1.25rem',
      }}>
        {/* Like */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem' }}>
          <button onClick={toggleLike} style={{
            background:'rgba(10,10,10,0.5)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
            width:'44px', height:'44px', display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:'1.2rem', cursor:'pointer',
            color: liked ? '#e8557a' : '#f0ede8', transition:'all 0.2s',
          }}>{liked ? '♥' : '♡'}</button>
          <span style={{ fontSize:'0.68rem', color:'rgba(240,237,232,0.7)' }}>
            {formatNum(likes)}
          </span>
        </div>

        {/* Comment */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem' }}>
          <button style={{
            background:'rgba(10,10,10,0.5)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
            width:'44px', height:'44px', display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:'1.1rem', cursor:'pointer',
            color:'#f0ede8',
          }}>💬</button>
          <span style={{ fontSize:'0.68rem', color:'rgba(240,237,232,0.7)' }}>
            {formatNum(reel.comments)}
          </span>
        </div>

        {/* Share */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem' }}>
          <button style={{
            background:'rgba(10,10,10,0.5)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
            width:'44px', height:'44px', display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:'1.1rem', cursor:'pointer',
            color:'#f0ede8',
          }}>↗</button>
          <span style={{ fontSize:'0.68rem', color:'rgba(240,237,232,0.7)' }}>
            {formatNum(reel.shares)}
          </span>
        </div>

        {/* Save */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2rem' }}>
          <button onClick={() => setSaved(!saved)} style={{
            background:'rgba(10,10,10,0.5)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
            width:'44px', height:'44px', display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:'1.1rem', cursor:'pointer',
            color: saved ? '#e8c97e' : '#f0ede8', transition:'all 0.2s',
          }}>{saved ? '★' : '☆'}</button>
          <span style={{ fontSize:'0.68rem', color:'rgba(240,237,232,0.7)' }}>
            {formatNum(reel.saves)}
          </span>
        </div>

        {/* More */}
        <button style={{
          background:'rgba(10,10,10,0.5)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
          width:'44px', height:'44px', display:'flex', alignItems:'center',
          justifyContent:'center', fontSize:'1.1rem', cursor:'pointer',
          color:'#f0ede8',
        }}>⋯</button>
      </div>
    </div>
  )
}

export default function Reels() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('foryou')
  const containerRef = useRef(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollTop = containerRef.current.scrollTop
    const height = containerRef.current.clientHeight
    const index = Math.round(scrollTop / height)
    setActiveIndex(index)
  }

  const scrollTo = (index) => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: index * containerRef.current.clientHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div style={{
      display:'flex', height:'100vh', overflow:'hidden',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      {/* Reels area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Top bar */}
        <div style={{
          position:'absolute', left:'220px', right:0, top:0, zIndex:50,
          padding:'1rem 1.5rem',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'linear-gradient(rgba(10,10,10,0.8), transparent)',
          pointerEvents:'none',
        }}>
          <div style={{ pointerEvents:'all' }}>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.4rem', fontWeight:600, color:'#f0ede8', margin:0,
            }}>Reels</h1>
          </div>

          {/* Feed type tabs — Inspira gives you control */}
          <div style={{
            display:'flex', background:'rgba(10,10,10,0.6)',
            backdropFilter:'blur(12px)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'100px', padding:'3px',
            pointerEvents:'all',
          }}>
            {[['foryou','✦ For You'],['following','👥 Following'],['trending','🔥 Trending']].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                background: activeTab === id ? '#e8c97e' : 'transparent',
                color: activeTab === id ? '#0a0a0a' : 'rgba(240,237,232,0.5)',
                border:'none', borderRadius:'100px',
                padding:'0.3rem 0.85rem', fontSize:'0.72rem',
                fontWeight: activeTab === id ? 600 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                transition:'all 0.2s', whiteSpace:'nowrap',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            flex:1, overflowY:'scroll',
            scrollSnapType:'y mandatory',
            scrollbarWidth:'none',
          }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {reelsData.map((reel, i) => (
            <div key={reel.id} style={{
              height:'100vh', scrollSnapAlign:'start',
              position:'relative', overflow:'hidden',
            }}>
              <ReelCard reel={reel} isActive={activeIndex === i} />
            </div>
          ))}
        </div>

        {/* Scroll indicators — right side */}
        <div style={{
          position:'absolute', right:'1.5rem', top:'50%',
          transform:'translateY(-50%)', zIndex:50,
          display:'flex', flexDirection:'column', gap:'0.5rem',
        }}>
          {reelsData.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} style={{
              width: activeIndex === i ? '4px' : '3px',
              height: activeIndex === i ? '24px' : '12px',
              borderRadius:'100px', border:'none', cursor:'pointer',
              background: activeIndex === i ? '#e8c97e' : 'rgba(240,237,232,0.2)',
              transition:'all 0.3s', padding:0,
            }}/>
          ))}
        </div>

        {/* Navigation arrows */}
        <div style={{
          position:'absolute', right:'5rem', top:'50%',
          transform:'translateY(-50%)', zIndex:50,
          display:'flex', flexDirection:'column', gap:'0.5rem',
        }}>
          {activeIndex > 0 && (
            <button onClick={() => scrollTo(activeIndex - 1)} style={{
              background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
              width:'40px', height:'40px', display:'flex', alignItems:'center',
              justifyContent:'center', color:'#f0ede8', cursor:'pointer',
              fontSize:'1rem',
            }}>↑</button>
          )}
          {activeIndex < reelsData.length - 1 && (
            <button onClick={() => scrollTo(activeIndex + 1)} style={{
              background:'rgba(10,10,10,0.6)', backdropFilter:'blur(8px)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
              width:'40px', height:'40px', display:'flex', alignItems:'center',
              justifyContent:'center', color:'#f0ede8', cursor:'pointer',
              fontSize:'1rem',
            }}>↓</button>
          )}
        </div>
      </div>

      {/* Right info panel */}
      <div style={{
        width:'280px', flexShrink:0, padding:'2rem 1.5rem',
        borderLeft:'1px solid #2a2a2a', overflowY:'auto',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        background:'#0d0d0d',
      }}>
        {/* Now playing */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.1rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Now playing
          </div>
          <div style={{
            width:'100%', aspectRatio:'9/16', borderRadius:'10px',
            background: reelsData[activeIndex].bg, display:'flex',
            alignItems:'center', justifyContent:'center', fontSize:'3rem',
            marginBottom:'0.85rem',
          }}>{reelsData[activeIndex].emoji}</div>
          <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>
            {reelsData[activeIndex].user.name}
          </div>
          <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'0.2rem' }}>
            {reelsData[activeIndex].audio}
          </div>
        </div>

        {/* Inspira vs Instagram */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.1rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            ✦ Inspira Reels fixes
          </div>
          {[
            ['🔍', '"Why this reel?" on every video'],
            ['🔀', 'For You / Following / Trending tabs'],
            ['👁', 'Reach shown to all creators'],
            ['🚫', 'No forced trending audio'],
            ['⏭', 'Skip reels freely, no penalty'],
            ['🧠', 'Algorithm explained, not hidden'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.55rem',
            }}>
              <span style={{ fontSize:'0.8rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Up next */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.1rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Up next
          </div>
          {reelsData.filter((_, i) => i !== activeIndex).map((reel, i) => (
            <div key={reel.id} style={{
              display:'flex', gap:'0.65rem', alignItems:'center',
              marginBottom: i < 2 ? '0.75rem' : 0,
              cursor:'pointer',
            }}
              onClick={() => scrollTo(reelsData.indexOf(reel))}
            >
              <div style={{
                width:'44px', height:'60px', borderRadius:'6px',
                background: reel.bg, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'1.2rem', flexShrink:0,
              }}>{reel.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.78rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {reel.user.username}
                </div>
                <div style={{ fontSize:'0.68rem', color:'#555', marginTop:'2px' }}>
                  {reel.duration} · {reel.reach} reach
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}