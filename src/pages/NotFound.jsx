import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/feed')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0a',
      fontFamily:"'Outfit',sans-serif",
      display:'flex', alignItems:'center',
      justifyContent:'center', padding:'2rem',
      position:'relative', overflow:'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position:'fixed', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,201,126,0.05) 0%, transparent 70%)',
      }}/>

      {/* Big 404 background text */}
      <div style={{
        position:'fixed', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'clamp(120px,25vw,280px)',
        fontWeight:700, color:'rgba(232,201,126,0.04)',
        lineHeight:1, userSelect:'none', pointerEvents:'none',
        whiteSpace:'nowrap',
      }}>404</div>

      <div style={{
        position:'relative', zIndex:1,
        textAlign:'center', maxWidth:'480px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'1.6rem', fontWeight:600, color:'#f0ede8',
          textDecoration:'none', display:'inline-block', marginBottom:'2.5rem',
        }}>
          Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
        </Link>

        {/* Icon */}
        <div style={{ fontSize:'3.5rem', marginBottom:'1.25rem' }}>🔍</div>

        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'2.2rem', fontWeight:600, color:'#f0ede8',
          margin:'0 0 0.75rem', lineHeight:1.1,
        }}>
          This page doesn't exist
        </h1>

        <p style={{
          fontSize:'0.9rem', color:'#555', lineHeight:1.7,
          margin:'0 0 2rem',
        }}>
          The page you're looking for may have been moved, deleted, or never existed. Don't worry — there's plenty more to explore.
        </p>

        {/* Countdown */}
        <div style={{
          background:'rgba(232,201,126,0.06)',
          border:'1px solid rgba(232,201,126,0.15)',
          borderRadius:'100px', padding:'0.5rem 1.25rem',
          fontSize:'0.78rem', color:'#e8c97e',
          display:'inline-block', marginBottom:'2rem',
        }}>
          Redirecting to your feed in {countdown}s
        </div>

        {/* Progress bar */}
        <div style={{
          background:'#1a1a1a', borderRadius:'100px',
          height:'3px', overflow:'hidden', marginBottom:'2rem',
        }}>
          <div style={{
            background:'#e8c97e', height:'100%',
            borderRadius:'100px',
            width:`${((10 - countdown) / 10) * 100}%`,
            transition:'width 1s linear',
          }}/>
        </div>

        {/* Action buttons */}
        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'2rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background:'transparent', border:'1px solid #2a2a2a',
              borderRadius:'100px', padding:'0.7rem 1.5rem',
              color:'#888', fontSize:'0.85rem', cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
            onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
          >← Go back</button>
          <button
            onClick={() => navigate('/feed')}
            style={{
              background:'#e8c97e', color:'#0a0a0a', border:'none',
              borderRadius:'100px', padding:'0.7rem 1.5rem',
              fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background='#f0d88a'}
            onMouseLeave={e => e.target.style.background='#e8c97e'}
          >Go to feed →</button>
        </div>

        {/* Quick links */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'16px', padding:'1.25rem',
          textAlign:'left',
        }}>
          <div style={{
            fontSize:'0.68rem', color:'#555', textTransform:'uppercase',
            letterSpacing:'0.1em', marginBottom:'0.85rem',
          }}>Or explore these pages</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
            {[
              { icon:'🏠', label:'Home Feed', path:'/feed' },
              { icon:'🔍', label:'Explore', path:'/explore' },
              { icon:'🔴', label:'Live', path:'/live' },
              { icon:'📊', label:'Analytics', path:'/analytics' },
              { icon:'💰', label:'Monetize', path:'/monetization' },
              { icon:'🛡', label:'Shadowban', path:'/shadowban' },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display:'flex', alignItems:'center', gap:'0.6rem',
                  padding:'0.6rem 0.75rem', borderRadius:'10px',
                  textDecoration:'none', color:'#666',
                  fontSize:'0.8rem', transition:'all 0.15s',
                  background:'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.color='#f0ede8' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#666' }}
              >
                <span style={{ fontSize:'0.9rem' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}