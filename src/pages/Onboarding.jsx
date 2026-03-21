import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { id:'welcome', label:'Welcome' },
  { id:'interests', label:'Interests' },
  { id:'creators', label:'Creators' },
  { id:'privacy', label:'Privacy' },
  { id:'feed', label:'Feed' },
  { id:'done', label:'Done' },
]

const interestOptions = [
  { id:'photography', label:'Photography', icon:'📸' },
  { id:'travel', label:'Travel', icon:'✈️' },
  { id:'architecture', label:'Architecture', icon:'🏛' },
  { id:'nature', label:'Nature', icon:'🌿' },
  { id:'art', label:'Art & Design', icon:'🎨' },
  { id:'food', label:'Food & Culture', icon:'☕' },
  { id:'fashion', label:'Fashion', icon:'✨' },
  { id:'music', label:'Music', icon:'🎵' },
  { id:'tech', label:'Technology', icon:'💻' },
  { id:'fitness', label:'Fitness', icon:'💪' },
  { id:'books', label:'Books & Writing', icon:'📚' },
  { id:'film', label:'Film & Cinema', icon:'🎬' },
]

const suggestedCreators = [
  { username:'nisha.creates', name:'Nisha Kapoor', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', category:'Photography', followers:'84k', verified:true },
  { username:'arjun.lens', name:'Arjun Lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', category:'Street Photography', followers:'41k', verified:false },
  { username:'maya.art', name:'Maya Art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', category:'Digital Art', followers:'28k', verified:true },
  { username:'ananya.studio', name:'Ananya Studio', avatar:'AS', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', category:'Minimal Design', followers:'120k', verified:true },
  { username:'rohan.travels', name:'Rohan Travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', category:'Travel', followers:'41k', verified:false },
  { username:'cosmos.lens', name:'Cosmos Lens', avatar:'CL', gradient:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', category:'Astrophotography', followers:'124k', verified:true },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [followedCreators, setFollowedCreators] = useState([])
  const [feedMode, setFeedMode] = useState('algorithmic')
  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showActivity: true,
    readReceipts: false,
    dataAds: false,
  })
  const [username] = useState('your.handle')

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleFollow = (username) => {
    setFollowedCreators(prev =>
      prev.includes(username) ? prev.filter(u => u !== username) : [...prev, username]
    )
  }

  const togglePrivacy = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const canProceed = () => {
    if (step === 1) return selectedInterests.length >= 3
    return true
  }

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
    else navigate('/feed')
  }

  const skip = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
    else navigate('/feed')
  }

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0a',
      fontFamily:"'Outfit',sans-serif",
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'2rem', position:'relative', overflow:'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position:'fixed', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(232,201,126,0.06) 0%, transparent 70%)',
      }}/>

      {/* Progress bar */}
      {step > 0 && step < STEPS.length - 1 && (
        <div style={{
          position:'fixed', top:0, left:0, right:0,
          height:'3px', background:'#1a1a1a', zIndex:100,
        }}>
          <div style={{
            height:'100%', background:'#e8c97e',
            width:`${(step / (STEPS.length - 1)) * 100}%`,
            transition:'width 0.4s ease', borderRadius:'0 100px 100px 0',
          }}/>
        </div>
      )}

      {/* Step indicators */}
      {step > 0 && step < STEPS.length - 1 && (
        <div style={{
          position:'fixed', top:'1.5rem', left:'50%',
          transform:'translateX(-50%)',
          display:'flex', gap:'0.4rem', zIndex:100,
        }}>
          {STEPS.slice(1, -1).map((s, i) => (
            <div key={s.id} style={{
              width: i === step - 1 ? '20px' : '6px',
              height:'6px', borderRadius:'100px',
              background: i < step - 1 ? '#6fcf97' : i === step - 1 ? '#e8c97e' : '#2a2a2a',
              transition:'all 0.3s',
            }}/>
          ))}
        </div>
      )}

      {/* Skip button */}
      {step > 0 && step < STEPS.length - 1 && step !== 3 && (
        <button
          onClick={skip}
          style={{
            position:'fixed', top:'1.5rem', right:'2rem', zIndex:100,
            background:'transparent', border:'none',
            color:'#555', fontSize:'0.82rem', cursor:'pointer',
            fontFamily:"'Outfit',sans-serif",
            transition:'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color='#888'}
          onMouseLeave={e => e.target.style.color='#555'}
        >Skip →</button>
      )}

      <div style={{
        width:'100%', maxWidth:'560px',
        position:'relative', zIndex:1,
      }}>

        {/* STEP 0 — Welcome */}
        {step === 0 && (
          <div style={{ textAlign:'center' }}>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'3.5rem', fontWeight:600, color:'#f0ede8',
              marginBottom:'0.5rem', lineHeight:1,
            }}>
              Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
            </div>
            <p style={{ fontSize:'1rem', color:'#555', marginBottom:'3rem', fontWeight:300 }}>
              The social platform that puts creators first
            </p>

            <div style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'20px', padding:'2rem', marginBottom:'2rem',
              textAlign:'left',
            }}>
              <div style={{ fontSize:'0.72rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                ✦ Before we start — our promises to you
              </div>
              {[
                { icon:'🚫', text:'We will never shadowban you without telling you' },
                { icon:'🔒', text:'We will never sell your data or use it for ads' },
                { icon:'📊', text:'Your analytics are yours — always free, always full' },
                { icon:'💰', text:'You keep 85% of everything you earn here' },
                { icon:'🧠', text:'Our algorithm is fully documented and transparent' },
                { icon:'🗑', text:'You can delete your account anytime — no dark patterns' },
              ].map(item => (
                <div key={item.text} style={{
                  display:'flex', gap:'0.75rem', alignItems:'flex-start',
                  marginBottom:'0.75rem',
                }}>
                  <span style={{ fontSize:'1rem', flexShrink:0 }}>{item.icon}</span>
                  <span style={{ fontSize:'0.85rem', color:'#888', lineHeight:1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{
              background:'rgba(232,201,126,0.05)',
              border:'1px solid rgba(232,201,126,0.15)',
              borderRadius:'12px', padding:'1rem',
              fontSize:'0.75rem', color:'#555', lineHeight:1.6,
              marginBottom:'2rem', textAlign:'left',
            }}>
              ✦ Unlike Instagram, we don't ask for your phone number, we don't require you to follow anyone, and we don't show you ads without your permission.
            </div>

            <button
              onClick={next}
              style={{
                width:'100%', background:'#e8c97e', color:'#0a0a0a',
                border:'none', borderRadius:'100px', padding:'1rem',
                fontSize:'1rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background='#f0d88a'}
              onMouseLeave={e => e.target.style.background='#e8c97e'}
            >I'm in — let's go ✦</button>
          </div>
        )}

        {/* STEP 1 — Interests */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom:'2rem' }}>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'2rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>What moves you?</h2>
              <p style={{ fontSize:'0.85rem', color:'#555', marginTop:'0.5rem' }}>
                Pick at least 3 — we'll use this to personalise your feed. You can change this anytime.
              </p>
            </div>

            <div style={{
              display:'grid', gridTemplateColumns:'repeat(3,1fr)',
              gap:'0.75rem', marginBottom:'2rem',
            }}>
              {interestOptions.map(interest => {
                const selected = selectedInterests.includes(interest.id)
                return (
                  <div
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    style={{
                      background: selected ? 'rgba(232,201,126,0.12)' : '#111',
                      border: selected ? '1px solid rgba(232,201,126,0.4)' : '1px solid #2a2a2a',
                      borderRadius:'14px', padding:'1.1rem 0.75rem',
                      cursor:'pointer', textAlign:'center',
                      transition:'all 0.2s', position:'relative',
                    }}
                    onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor='#3a3a3a' }}
                    onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor='#2a2a2a' }}
                  >
                    {selected && (
                      <div style={{
                        position:'absolute', top:'8px', right:'8px',
                        width:'18px', height:'18px', borderRadius:'50%',
                        background:'#e8c97e', display:'flex',
                        alignItems:'center', justifyContent:'center',
                        fontSize:'0.55rem', fontWeight:700, color:'#0a0a0a',
                      }}>✓</div>
                    )}
                    <div style={{ fontSize:'1.75rem', marginBottom:'0.5rem' }}>{interest.icon}</div>
                    <div style={{
                      fontSize:'0.8rem', fontWeight:500,
                      color: selected ? '#e8c97e' : '#888',
                    }}>{interest.label}</div>
                  </div>
                )
              })}
            </div>

            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'1rem',
            }}>
              <span style={{ fontSize:'0.78rem', color: selectedInterests.length >= 3 ? '#6fcf97' : '#555' }}>
                {selectedInterests.length} selected {selectedInterests.length < 3 ? `(${3 - selectedInterests.length} more to go)` : '✓'}
              </span>
            </div>

            <button
              onClick={next}
              disabled={!canProceed()}
              style={{
                width:'100%', background: canProceed() ? '#e8c97e' : '#2a2a2a',
                color: canProceed() ? '#0a0a0a' : '#555',
                border:'none', borderRadius:'100px', padding:'0.9rem',
                fontSize:'0.9rem', fontWeight:600,
                cursor: canProceed() ? 'pointer' : 'default',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
            >Continue →</button>
          </div>
        )}

        {/* STEP 2 — Creators */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom:'2rem' }}>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'2rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Creators you might love</h2>
              <p style={{ fontSize:'0.85rem', color:'#555', marginTop:'0.5rem' }}>
                Based on your interests. Follow some to get started — or skip and discover on your own.
              </p>
              <div style={{
                fontSize:'0.72rem', color:'#e8c97e',
                marginTop:'0.35rem',
              }}>
                ✦ Unlike Instagram, we never force you to follow anyone.
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
              {suggestedCreators.map(creator => (
                <div key={creator.username} style={{
                  display:'flex', alignItems:'center', gap:'0.85rem',
                  padding:'0.85rem 1rem', background:'#111',
                  border:'1px solid #2a2a2a', borderRadius:'14px',
                  transition:'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                >
                  <div style={{
                    width:'44px', height:'44px', borderRadius:'50%',
                    background: creator.gradient, display:'flex',
                    alignItems:'center', justifyContent:'center',
                    fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                  }}>{creator.avatar}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                      <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>
                        {creator.name}
                      </span>
                      {creator.verified && (
                        <span style={{
                          background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                          width:'14px', height:'14px', display:'flex', alignItems:'center',
                          justifyContent:'center', fontSize:'0.5rem', fontWeight:700,
                        }}>✓</span>
                      )}
                    </div>
                    <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>
                      @{creator.username} · {creator.followers} followers · {creator.category}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(creator.username)}
                    style={{
                      background: followedCreators.includes(creator.username) ? 'transparent' : '#e8c97e',
                      color: followedCreators.includes(creator.username) ? '#555' : '#0a0a0a',
                      border: followedCreators.includes(creator.username) ? '1px solid #2a2a2a' : 'none',
                      borderRadius:'100px', padding:'0.4rem 1.1rem',
                      fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
                      fontFamily:"'Outfit',sans-serif", flexShrink:0,
                      transition:'all 0.2s',
                    }}
                  >
                    {followedCreators.includes(creator.username) ? 'Following ✓' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>

            {followedCreators.length > 0 && (
              <div style={{
                fontSize:'0.75rem', color:'#6fcf97',
                textAlign:'center', marginBottom:'1rem',
              }}>
                ✓ Following {followedCreators.length} creator{followedCreators.length > 1 ? 's' : ''}
              </div>
            )}

            <button onClick={next} style={{
              width:'100%', background:'#e8c97e', color:'#0a0a0a',
              border:'none', borderRadius:'100px', padding:'0.9rem',
              fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
              onMouseEnter={e => e.target.style.background='#f0d88a'}
              onMouseLeave={e => e.target.style.background='#e8c97e'}
            >
              {followedCreators.length > 0 ? `Continue with ${followedCreators.length} follows →` : 'Skip for now →'}
            </button>
          </div>
        )}

        {/* STEP 3 — Privacy */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom:'2rem' }}>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'2rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Your privacy, your choice</h2>
              <p style={{ fontSize:'0.85rem', color:'#555', marginTop:'0.5rem' }}>
                Set your privacy preferences now. You can change all of these anytime in Settings.
              </p>
            </div>

            <div style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'16px', overflow:'hidden', marginBottom:'1.5rem',
            }}>
              {[
                {
                  key:'privateAccount', icon:'🔒',
                  label:'Private account',
                  desc:'Only approved followers can see your posts',
                },
                {
                  key:'showActivity', icon:'🟢',
                  label:'Show activity status',
                  desc:'Let others see when you were last active',
                },
                {
                  key:'readReceipts', icon:'✉️',
                  label:'Read receipts in DMs',
                  desc:'Let people know when you\'ve read their messages',
                  inspira:'Instagram forces read receipts. Inspira makes them optional.',
                },
                {
                  key:'dataAds', icon:'📊',
                  label:'Use my data to show me ads',
                  desc:'Allow Inspira to use your activity to personalise ads',
                  inspira:'Instagram does this by default with no opt-out. We ask first.',
                },
              ].map((item, i) => (
                <div key={item.key} style={{
                  padding:'1.1rem 1.25rem',
                  borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                }}>
                  <div style={{
                    display:'flex', alignItems:'center',
                    justifyContent:'space-between', gap:'1rem',
                  }}>
                    <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', flex:1 }}>
                      <span style={{ fontSize:'1.1rem', flexShrink:0, marginTop:'1px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.2rem' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize:'0.72rem', color:'#555', lineHeight:1.5 }}>
                          {item.desc}
                        </div>
                        {item.inspira && (
                          <div style={{ fontSize:'0.68rem', color:'#e8c97e', marginTop:'0.3rem' }}>
                            ✦ {item.inspira}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => togglePrivacy(item.key)}
                      style={{
                        width:'40px', height:'22px', borderRadius:'100px',
                        background: privacy[item.key] ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                        position:'relative', cursor:'pointer', flexShrink:0,
                        border: privacy[item.key] ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
                        transition:'all 0.2s',
                      }}
                    >
                      <div style={{
                        width:'16px', height:'16px', borderRadius:'50%',
                        background: privacy[item.key] ? '#e8c97e' : '#555',
                        position:'absolute', top:'2px',
                        left: privacy[item.key] ? '20px' : '2px',
                        transition:'all 0.2s',
                      }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background:'rgba(111,207,151,0.05)',
              border:'1px solid rgba(111,207,151,0.15)',
              borderRadius:'12px', padding:'0.85rem 1rem',
              fontSize:'0.75rem', color:'#555', lineHeight:1.6,
              marginBottom:'1.5rem',
            }}>
              🔒 These settings are saved immediately. You can find them anytime in Settings → Privacy. No data collection happens until you choose.
            </div>

            <button onClick={next} style={{
              width:'100%', background:'#e8c97e', color:'#0a0a0a',
              border:'none', borderRadius:'100px', padding:'0.9rem',
              fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
              onMouseEnter={e => e.target.style.background='#f0d88a'}
              onMouseLeave={e => e.target.style.background='#e8c97e'}
            >Save and continue →</button>
          </div>
        )}

        {/* STEP 4 — Feed mode */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom:'2rem' }}>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'2rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>How do you want your feed?</h2>
              <p style={{ fontSize:'0.85rem', color:'#555', marginTop:'0.5rem' }}>
                Choose your default feed mode. You can switch anytime from the feed page.
              </p>
              <div style={{ fontSize:'0.72rem', color:'#e8c97e', marginTop:'0.35rem' }}>
                ✦ Instagram gives you zero choice. Inspira gives you three.
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
              {[
                {
                  id:'algorithmic', icon:'✦', label:'For You',
                  desc:'Personalised based on your interests and interactions',
                  detail:'Best for discovering new creators and content you\'ll love',
                  recommended:true,
                },
                {
                  id:'chronological', icon:'🕐', label:'Chronological',
                  desc:'Posts in the order they were shared — newest first',
                  detail:'Best if you follow a small number of accounts closely',
                  recommended:false,
                },
                {
                  id:'following', icon:'👥', label:'Following only',
                  desc:'Only posts from people you follow — no discoveries',
                  detail:'Best for a clean, focused feed with no surprises',
                  recommended:false,
                },
              ].map(mode => (
                <div
                  key={mode.id}
                  onClick={() => setFeedMode(mode.id)}
                  style={{
                    background: feedMode === mode.id ? 'rgba(232,201,126,0.08)' : '#111',
                    border: feedMode === mode.id ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                    cursor:'pointer', transition:'all 0.2s', position:'relative',
                  }}
                >
                  {mode.recommended && (
                    <div style={{
                      position:'absolute', top:'-8px', left:'1rem',
                      background:'#e8c97e', color:'#0a0a0a',
                      fontSize:'0.6rem', fontWeight:700,
                      padding:'0.15rem 0.6rem', borderRadius:'100px',
                      letterSpacing:'0.05em',
                    }}>RECOMMENDED</div>
                  )}
                  <div style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
                    <div style={{
                      width:'20px', height:'20px', borderRadius:'50%',
                      border:`2px solid ${feedMode === mode.id ? '#e8c97e' : '#2a2a2a'}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, transition:'border-color 0.2s',
                    }}>
                      {feedMode === mode.id && (
                        <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#e8c97e' }}/>
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontSize:'0.92rem', fontWeight:600,
                        color: feedMode === mode.id ? '#e8c97e' : '#f0ede8',
                        display:'flex', alignItems:'center', gap:'0.4rem',
                      }}>
                        <span>{mode.icon}</span> {mode.label}
                      </div>
                      <div style={{ fontSize:'0.78rem', color:'#666', marginTop:'0.2rem' }}>
                        {mode.desc}
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#444', marginTop:'0.2rem' }}>
                        {mode.detail}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={next} style={{
              width:'100%', background:'#e8c97e', color:'#0a0a0a',
              border:'none', borderRadius:'100px', padding:'0.9rem',
              fontSize:'0.9rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
              onMouseEnter={e => e.target.style.background='#f0d88a'}
              onMouseLeave={e => e.target.style.background='#e8c97e'}
            >Set my feed →</button>
          </div>
        )}

        {/* STEP 5 — Done */}
        {step === 5 && (
          <div style={{ textAlign:'center' }}>
            {/* Celebration */}
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🎉</div>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'2.5rem', fontWeight:600, color:'#f0ede8',
              marginBottom:'0.5rem', lineHeight:1.1,
            }}>
              Welcome to <em style={{ color:'#e8c97e', fontStyle:'italic' }}>Inspira</em>
            </h2>
            <p style={{ fontSize:'0.9rem', color:'#555', marginBottom:'2.5rem', lineHeight:1.7 }}>
              You're all set, @{username}. Your feed is ready, your privacy is protected, and your creative journey starts now.
            </p>

            {/* Summary */}
            <div style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem',
              textAlign:'left',
            }}>
              <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                Your setup summary
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'#6fcf97', fontSize:'0.8rem' }}>✓</span>
                  <span style={{ fontSize:'0.82rem', color:'#888' }}>
                    {selectedInterests.length} interests selected
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'#6fcf97', fontSize:'0.8rem' }}>✓</span>
                  <span style={{ fontSize:'0.82rem', color:'#888' }}>
                    Following {followedCreators.length} creator{followedCreators.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'#6fcf97', fontSize:'0.8rem' }}>✓</span>
                  <span style={{ fontSize:'0.82rem', color:'#888' }}>
                    Privacy configured — data ads {privacy.dataAds ? 'enabled' : 'disabled'}
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ color:'#6fcf97', fontSize:'0.8rem' }}>✓</span>
                  <span style={{ fontSize:'0.82rem', color:'#888' }}>
                    Feed mode: {feedMode === 'algorithmic' ? '✦ For You' : feedMode === 'chronological' ? '🕐 Chronological' : '👥 Following only'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              gap:'0.75rem', marginBottom:'1.5rem',
            }}>
              {[
                { icon:'📸', label:'Create your first post', path:'/create' },
                { icon:'🔍', label:'Explore content', path:'/explore' },
                { icon:'◯', label:'Complete your profile', path:'/profile' },
                { icon:'📊', label:'View your analytics', path:'/analytics' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'12px', padding:'0.85rem',
                    cursor:'pointer', transition:'all 0.2s',
                    display:'flex', alignItems:'center', gap:'0.6rem',
                    fontFamily:"'Outfit',sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#e8c97e'; e.currentTarget.style.background='rgba(232,201,126,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#2a2a2a'; e.currentTarget.style.background='#111' }}
                >
                  <span style={{ fontSize:'1.1rem' }}>{action.icon}</span>
                  <span style={{ fontSize:'0.78rem', color:'#888', textAlign:'left' }}>{action.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/feed')}
              style={{
                width:'100%', background:'#e8c97e', color:'#0a0a0a',
                border:'none', borderRadius:'100px', padding:'1rem',
                fontSize:'1rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background='#f0d88a'}
              onMouseLeave={e => e.target.style.background='#e8c97e'}
            >Go to my feed →</button>
          </div>
        )}

        {/* Back button */}
        {step > 0 && step < STEPS.length - 1 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              display:'block', margin:'1.25rem auto 0',
              background:'transparent', border:'none',
              color:'#444', fontSize:'0.8rem', cursor:'pointer',
              fontFamily:"'Outfit',sans-serif",
              transition:'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color='#666'}
            onMouseLeave={e => e.target.style.color='#444'}
          >← Back</button>
        )}
      </div>
    </div>
  )
}