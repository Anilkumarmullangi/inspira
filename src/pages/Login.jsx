import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handle = field => e => setForm({ ...form, [field]: e.target.value })

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0a',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'2rem', position:'relative', overflow:'hidden',
      fontFamily:"'Outfit', sans-serif",
    }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(232,201,126,0.07) 0%, transparent 70%)',
      }}/>

      <div style={{ width:'100%', maxWidth:'420px', position:'relative', zIndex:1 }}>

        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <Link to="/" style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'2.4rem', fontWeight:600, color:'#f0ede8', textDecoration:'none',
          }}>
            Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
          </Link>
          <p style={{ color:'#555', fontSize:'0.85rem', marginTop:'0.5rem' }}>
            Welcome back, creator
          </p>
        </div>

        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'20px', padding:'2.5rem',
        }}>
          <h2 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', marginBottom:'2rem',
          }}>Log in</h2>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', marginBottom:'1rem' }}>
            <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={handle('email')} />
            <InputField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={handle('password')} />
          </div>

          <div style={{ textAlign:'right', marginBottom:'1.75rem' }}>
            <a href="#" style={{ fontSize:'0.8rem', color:'#e8c97e', textDecoration:'none' }}>
              Forgot password?
            </a>
          </div>

          <button
            onClick={() => navigate('/feed')}
            style={{
              width:'100%', background:'#e8c97e', color:'#0a0a0a',
              border:'none', borderRadius:'100px', padding:'0.9rem',
              fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit', sans-serif", transition:'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = '#f0d88a'}
            onMouseLeave={e => e.target.style.background = '#e8c97e'}
          >
            Log in
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:'1rem', margin:'1.75rem 0' }}>
            <div style={{ flex:1, height:'1px', background:'#2a2a2a' }}/>
            <span style={{ color:'#555', fontSize:'0.78rem' }}>or continue with</span>
            <div style={{ flex:1, height:'1px', background:'#2a2a2a' }}/>
          </div>

          <div style={{ display:'flex', gap:'0.75rem' }}>
            {[['G','Google'],['🍎','Apple']].map(([icon, label]) => (
              <button key={label} style={{
                flex:1, background:'#1a1a1a', border:'1px solid #2a2a2a',
                borderRadius:'10px', padding:'0.75rem', color:'#f0ede8',
                fontSize:'0.85rem', fontWeight:500, cursor:'pointer',
                fontFamily:"'Outfit', sans-serif", display:'flex',
                alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#555'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background:'rgba(232,201,126,0.05)', border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'12px', padding:'1rem 1.25rem', marginTop:'1.25rem',
          display:'flex', alignItems:'flex-start', gap:'0.75rem',
        }}>
          <span style={{ color:'#e8c97e', fontSize:'1rem', flexShrink:0 }}>🔒</span>
          <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
            Unlike Instagram, Inspira never sells your data or tracks you across other apps. Your account, your data.
          </p>
        </div>

        <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.85rem', color:'#555' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color:'#e8c97e', textDecoration:'none', fontWeight:500 }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}