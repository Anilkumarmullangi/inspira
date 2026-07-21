import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Signup() {
  const [form, setForm] = useState({ name:'', username:'', email:'', password:'' })
  const [step, setStep] = useState(1)
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

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <Link to="/" style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'2.4rem', fontWeight:600, color:'#f0ede8', textDecoration:'none',
          }}>
            Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
          </Link>
          <p style={{ color:'#555', fontSize:'0.85rem', marginTop:'0.5rem' }}>
            Join 2 million creators worldwide
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem' }}>
          {[1,2].map(s => (
            <div key={s} style={{
              flex:1, height:'3px', borderRadius:'100px',
              background: s <= step ? '#e8c97e' : '#2a2a2a',
              transition:'background 0.3s',
            }}/>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'20px', padding:'2.5rem',
        }}>
          <h2 style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.4rem',
          }}>
            {step === 1 ? 'Create account' : 'Your identity'}
          </h2>
          <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'2rem' }}>
            {step === 1 ? 'Step 1 of 2 — your credentials' : 'Step 2 of 2 — how the world sees you'}
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            {step === 1 ? (
              <>
                <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={handle('email')} />
                <InputField label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={handle('password')} />
              </>
            ) : (
              <>
                <InputField label="Full name" placeholder="Priya Kapoor" value={form.name} onChange={handle('name')} />
                <InputField label="Username" placeholder="priya.creates" value={form.username} onChange={handle('username')} />

                {/* Username preview */}
                {form.username && (
                  <div style={{
                    background:'#1a1a1a', border:'1px solid #2a2a2a',
                    borderRadius:'10px', padding:'0.75rem 1rem',
                    fontSize:'0.8rem', color:'#555',
                  }}>
                    Your profile: <span style={{ color:'#e8c97e' }}>inspira.app/@{form.username}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ marginTop:'1.75rem', display:'flex', gap:'0.75rem' }}>
            {step === 2 && (
              <button onClick={() => setStep(1)} style={{
                flex:1, background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.9rem', color:'#888',
                fontSize:'0.9rem', cursor:'pointer', fontFamily:"'Outfit', sans-serif",
              }}>
                Back
              </button>
            )}
            <button
              onClick={() => step === 1 ? setStep(2) : null}
              style={{
                flex:1, background:'#e8c97e', color:'#0a0a0a',
                border:'none', borderRadius:'100px', padding:'0.9rem',
                fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit', sans-serif", transition:'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = '#f0d88a'}
              onMouseLeave={e => e.target.style.background = '#e8c97e'}
            >
              {step === 1 ? 'Continue →' : 'Create my account'}
            </button>
          </div>

          {step === 1 && (
            <>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', margin:'1.75rem 0' }}>
                <div style={{ flex:1, height:'1px', background:'#2a2a2a' }}/>
                <span style={{ color:'#555', fontSize:'0.78rem' }}>or</span>
                <div style={{ flex:1, height:'1px', background:'#2a2a2a' }}/>
              </div>
              <div style={{ display:'flex', gap:'0.75rem' }}>
                {[['G','Google'],['🍎','Apple']].map(([icon,label]) => (
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
            </>
          )}

          {step === 2 && (
            <p style={{ fontSize:'0.72rem', color:'#555', marginTop:'1.25rem', lineHeight:1.6, textAlign:'center' }}>
              By creating an account you agree to our{' '}
              <a href="#" style={{ color:'#e8c97e', textDecoration:'none' }}>Terms</a> and{' '}
              <a href="#" style={{ color:'#e8c97e', textDecoration:'none' }}>Privacy Policy</a>.
              We never sell your data.
            </p>
          )}
        </div>

        {/* Inspira advantage */}
        <div style={{
          background:'rgba(232,201,126,0.05)', border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'12px', padding:'1rem 1.25rem', marginTop:'1.25rem',
          display:'flex', alignItems:'flex-start', gap:'0.75rem',
        }}>
          <span style={{ color:'#e8c97e', fontSize:'1rem', flexShrink:0 }}>✦</span>
          <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
            No phone number required. No hidden data collection. Inspira respects your privacy from day one — unlike other platforms.
          </p>
        </div>

        <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.85rem', color:'#555' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'#e8c97e', textDecoration:'none', fontWeight:500 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}