import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const settingsSections = [
  { id:'account', label:'Account', icon:'👤' },
  { id:'privacy', label:'Privacy', icon:'🔒' },
  { id:'notifications', label:'Notifications', icon:'🔔' },
  { id:'security', label:'Security', icon:'🛡' },
  { id:'appearance', label:'Appearance', icon:'🎨' },
  { id:'accessibility', label:'Accessibility', icon:'♿' },
  { id:'data', label:'Your Data', icon:'📦' },
  { id:'monetization', label:'Monetization', icon:'💰' },
  { id:'help', label:'Help & Support', icon:'💬' },
  { id:'about', label:'About Inspira', icon:'✦' },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('account')
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      {/* Settings sidebar */}
      <div style={{
        width:'240px', flexShrink:0,
        borderRight:'1px solid #2a2a2a',
        padding:'2rem 1.25rem',
        display:'flex', flexDirection:'column',
      }}>
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'1.4rem', fontWeight:600, color:'#f0ede8',
          marginBottom:'1.5rem',
        }}>Settings</h2>

        <nav style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.65rem 0.85rem', borderRadius:'10px',
                background: activeSection === section.id ? 'rgba(232,201,126,0.1)' : 'transparent',
                border: 'none',
                borderLeft: activeSection === section.id ? '2px solid #e8c97e' : '2px solid transparent',
                color: activeSection === section.id ? '#f0ede8' : '#555',
                fontSize:'0.85rem', fontWeight: activeSection === section.id ? 500 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                transition:'all 0.2s', textAlign:'left',
              }}
              onMouseEnter={e => { if (activeSection !== section.id) { e.currentTarget.style.background='#111'; e.currentTarget.style.color='#888' }}}
              onMouseLeave={e => { if (activeSection !== section.id) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#555' }}}
            >
              <span style={{ fontSize:'0.9rem', width:'20px', textAlign:'center' }}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>

        {/* Danger zone */}
        <div style={{ marginTop:'auto', paddingTop:'1rem', borderTop:'1px solid #2a2a2a' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              width:'100%', background:'transparent',
              border:'1px solid rgba(201,111,111,0.3)',
              borderRadius:'10px', padding:'0.65rem',
              color:'#c96f6f', fontSize:'0.82rem', cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background='rgba(201,111,111,0.08)'; e.target.style.borderColor='#c96f6f' }}
            onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='rgba(201,111,111,0.3)' }}
          >Log out</button>
        </div>
      </div>

      {/* Main settings content */}
      <main style={{
        flex:1, padding:'2rem 3vw', overflowY:'auto',
      }}>
        <div style={{ maxWidth:'640px', margin:'0 auto' }}>

          {/* ACCOUNT */}
          {activeSection === 'account' && (
            <SettingsSection title="Account" subtitle="Manage your profile and account details">
              <SettingsGroup title="Profile">
                <SettingsInput label="Full name" defaultValue="Your Name" />
                <SettingsInput label="Username" defaultValue="your.handle" prefix="@" />
                <SettingsInput label="Bio" defaultValue="Visual storyteller based in Hyderabad 🇮🇳" multiline />
                <SettingsInput label="Website" defaultValue="inspira.app/@your.handle" />
                <SettingsInput label="Email" defaultValue="you@example.com" type="email" />
              </SettingsGroup>

              <SettingsGroup title="Account type">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  {[
                    { id:'personal', label:'Personal', desc:'For sharing moments with friends and family' },
                    { id:'creator', label:'Creator ✦', desc:'Analytics, monetization, and creator tools — free on Inspira' },
                  ].map(type => (
                    <div key={type.id} style={{
                      background: type.id === 'creator' ? 'rgba(232,201,126,0.08)' : '#111',
                      border: type.id === 'creator' ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                      borderRadius:'12px', padding:'1rem', cursor:'pointer',
                      transition:'all 0.2s',
                    }}>
                      <div style={{ fontSize:'0.88rem', fontWeight:600, color: type.id === 'creator' ? '#e8c97e' : '#f0ede8', marginBottom:'0.35rem' }}>
                        {type.label}
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', lineHeight:1.5 }}>{type.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  background:'rgba(232,201,126,0.04)', border:'1px solid rgba(232,201,126,0.1)',
                  borderRadius:'10px', padding:'0.75rem', marginTop:'0.75rem',
                  fontSize:'0.72rem', color:'#555', lineHeight:1.6,
                }}>
                  ✦ Instagram charges for verified badges and locks creator tools behind business accounts. On Inspira, all creator features are free for everyone.
                </div>
              </SettingsGroup>

              <SettingsGroup title="Language & Region">
                <SettingsSelect label="Language" options={['English', 'Hindi', 'Telugu', 'Tamil', 'Spanish', 'French']} />
                <SettingsSelect label="Region" options={['India', 'United States', 'United Kingdom', 'Australia']} />
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* PRIVACY */}
          {activeSection === 'privacy' && (
            <SettingsSection title="Privacy" subtitle="Control who sees your content and how you appear">
              <SettingsGroup title="Account privacy">
                <SettingsToggle label="Private account" sublabel="Only approved followers can see your posts" defaultOn={false} />
                <SettingsToggle label="Show activity status" sublabel="Let others see when you were last active" defaultOn={true} />
                <SettingsToggle label="Allow story resharing" sublabel="Let others reshare your stories to theirs" defaultOn={true} />
                <SettingsToggle label="Show suggested posts" sublabel="Appear in suggestions for people who might like your content" defaultOn={true} />
              </SettingsGroup>

              <SettingsGroup title="Interactions">
                <SettingsSelect label="Who can comment" options={['Everyone', 'Followers', 'People you follow', 'Close friends']} />
                <SettingsSelect label="Who can DM you" options={['Everyone', 'Followers only', 'Nobody']} />
                <SettingsSelect label="Who can tag you" options={['Everyone', 'Followers only', 'Nobody']} />
                <SettingsToggle label="Read receipts" sublabel="Let people know when you've read their messages — you control this, unlike Instagram" defaultOn={false} inspira />
              </SettingsGroup>

              <SettingsGroup title="Blocked accounts">
                <div style={{
                  padding:'1rem', background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'10px', fontSize:'0.82rem', color:'#555',
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  <span>0 blocked accounts</span>
                  <button style={{
                    background:'transparent', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.3rem 0.85rem',
                    color:'#888', fontSize:'0.75rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}>Manage</button>
                </div>
              </SettingsGroup>

              {/* Inspira exclusive */}
              <div style={{
                background:'rgba(232,201,126,0.04)', border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'1rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Inspira privacy advantage
                </div>
                <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  Instagram buries privacy settings across 12+ screens. Inspira puts everything in one place. We also never use your data for ad targeting.
                </p>
              </div>
            </SettingsSection>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <SettingsSection title="Notifications" subtitle="Choose what you want to be notified about">
              <SettingsGroup title="Push notifications">
                <SettingsToggle label="Likes" sublabel="When someone likes your post" defaultOn={true} />
                <SettingsToggle label="Comments" sublabel="When someone comments on your post" defaultOn={true} />
                <SettingsToggle label="New followers" sublabel="When someone follows you" defaultOn={true} />
                <SettingsToggle label="Mentions" sublabel="When someone mentions you" defaultOn={true} />
                <SettingsToggle label="Direct messages" sublabel="When you receive a new message" defaultOn={true} />
                <SettingsToggle label="Collab invites" sublabel="When someone invites you to collaborate" defaultOn={true} inspira />
                <SettingsToggle label="Reach milestones" sublabel="When your post hits a reach milestone" defaultOn={true} inspira />
              </SettingsGroup>

              <SettingsGroup title="Email notifications">
                <SettingsToggle label="Weekly digest" sublabel="A summary of your weekly performance" defaultOn={true} />
                <SettingsToggle label="Product updates" sublabel="New features and Inspira news" defaultOn={false} />
                <SettingsToggle label="Marketing emails" sublabel="Promotions and offers" defaultOn={false} />
              </SettingsGroup>

              {/* Quiet hours — Inspira exclusive */}
              <SettingsGroup title="Quiet hours ✦">
                <div style={{
                  background:'rgba(232,201,126,0.04)', border:'1px solid rgba(232,201,126,0.1)',
                  borderRadius:'10px', padding:'0.75rem', marginBottom:'0.75rem',
                  fontSize:'0.72rem', color:'#555',
                }}>
                  ✦ Inspira exclusive — Instagram has no quiet hours. Set times when notifications are silenced automatically.
                </div>
                <SettingsToggle label="Enable quiet hours" sublabel="Silence all notifications during set times" defaultOn={true} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'0.5rem' }}>
                  <div>
                    <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>From</div>
                    <input type="time" defaultValue="22:00" style={{
                      width:'100%', background:'#111', border:'1px solid #2a2a2a',
                      borderRadius:'8px', padding:'0.55rem 0.75rem',
                      color:'#f0ede8', fontSize:'0.85rem',
                      fontFamily:"'Outfit',sans-serif", outline:'none',
                      colorScheme:'dark', boxSizing:'border-box',
                    }}/>
                  </div>
                  <div>
                    <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>To</div>
                    <input type="time" defaultValue="08:00" style={{
                      width:'100%', background:'#111', border:'1px solid #2a2a2a',
                      borderRadius:'8px', padding:'0.55rem 0.75rem',
                      color:'#f0ede8', fontSize:'0.85rem',
                      fontFamily:"'Outfit',sans-serif", outline:'none',
                      colorScheme:'dark', boxSizing:'border-box',
                    }}/>
                  </div>
                </div>
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* SECURITY */}
          {activeSection === 'security' && (
            <SettingsSection title="Security" subtitle="Keep your account safe">
              <SettingsGroup title="Password">
                <SettingsInput label="Current password" type="password" placeholder="••••••••" />
                <SettingsInput label="New password" type="password" placeholder="Min. 8 characters" />
                <SettingsInput label="Confirm new password" type="password" placeholder="••••••••" />
              </SettingsGroup>

              <SettingsGroup title="Two-factor authentication">
                <SettingsToggle label="Enable 2FA" sublabel="Add an extra layer of security to your account" defaultOn={false} />
                <SettingsSelect label="2FA method" options={['Authenticator app', 'SMS', 'Email']} />
              </SettingsGroup>

              <SettingsGroup title="Login activity">
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'10px', overflow:'hidden',
                }}>
                  {[
                    { device:'Chrome on Windows', location:'Hyderabad, IN', time:'Active now', current:true },
                    { device:'Inspira Android', location:'Hyderabad, IN', time:'2 hours ago', current:false },
                    { device:'Safari on iPhone', location:'Mumbai, IN', time:'3 days ago', current:false },
                  ].map((session, i) => (
                    <div key={session.device} style={{
                      display:'flex', alignItems:'center', gap:'0.75rem',
                      padding:'0.85rem 1rem',
                      borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
                    }}>
                      <div style={{
                        width:'36px', height:'36px', borderRadius:'8px',
                        background:'#1a1a1a', display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'1.1rem', flexShrink:0,
                      }}>💻</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'0.82rem', color:'#f0ede8', fontWeight:500 }}>
                          {session.device}
                          {session.current && (
                            <span style={{
                              marginLeft:'0.5rem', background:'rgba(111,207,151,0.1)',
                              color:'#6fcf97', fontSize:'0.65rem', padding:'0.1rem 0.4rem',
                              borderRadius:'100px', fontWeight:400,
                            }}>Current</span>
                          )}
                        </div>
                        <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>
                          {session.location} · {session.time}
                        </div>
                      </div>
                      {!session.current && (
                        <button style={{
                          background:'transparent', border:'1px solid rgba(201,111,111,0.3)',
                          borderRadius:'100px', padding:'0.25rem 0.75rem',
                          color:'#c96f6f', fontSize:'0.72rem', cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif",
                        }}>Log out</button>
                      )}
                    </div>
                  ))}
                </div>
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* APPEARANCE */}
          {activeSection === 'appearance' && (
            <SettingsSection title="Appearance" subtitle="Customize how Inspira looks">
              <SettingsGroup title="Theme">
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem' }}>
                  {[
                    { id:'dark', label:'Dark', bg:'#0a0a0a', preview:'#111', active:true },
                    { id:'light', label:'Light', bg:'#f5f5f0', preview:'#fff', active:false },
                    { id:'auto', label:'Auto', bg:'linear-gradient(135deg,#0a0a0a,#f5f5f0)', preview:'', active:false },
                  ].map(theme => (
                    <div key={theme.id} style={{
                      border: theme.active ? '2px solid #e8c97e' : '1px solid #2a2a2a',
                      borderRadius:'12px', overflow:'hidden', cursor:'pointer',
                      transition:'border-color 0.2s',
                    }}>
                      <div style={{
                        height:'60px', background: theme.bg,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        <div style={{
                          width:'40px', height:'30px', borderRadius:'6px',
                          background: theme.preview || 'linear-gradient(135deg,#111,#f5f5f0)',
                          border:'1px solid rgba(255,255,255,0.1)',
                        }}/>
                      </div>
                      <div style={{
                        padding:'0.5rem', textAlign:'center',
                        fontSize:'0.75rem', color: theme.active ? '#e8c97e' : '#555',
                        background:'#111',
                      }}>{theme.label}</div>
                    </div>
                  ))}
                </div>
              </SettingsGroup>

              <SettingsGroup title="Font size">
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  {['Small', 'Default', 'Large'].map((size, i) => (
                    <button key={size} style={{
                      flex:1, background: i === 1 ? '#e8c97e' : '#111',
                      color: i === 1 ? '#0a0a0a' : '#555',
                      border: i === 1 ? 'none' : '1px solid #2a2a2a',
                      borderRadius:'100px', padding:'0.5rem',
                      fontSize: i === 0 ? '0.72rem' : i === 1 ? '0.82rem' : '0.92rem',
                      cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                    }}>{size}</button>
                  ))}
                </div>
              </SettingsGroup>

              <SettingsGroup title="Feed layout">
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  {[
                    { id:'standard', label:'Standard', desc:'Single column feed', emoji:'▬' },
                    { id:'compact', label:'Compact', desc:'More posts visible at once', emoji:'▤' },
                  ].map(layout => (
                    <div key={layout.id} style={{
                      background:'#111', border: layout.id === 'standard' ? '1px solid #e8c97e' : '1px solid #2a2a2a',
                      borderRadius:'12px', padding:'1rem', cursor:'pointer', textAlign:'center',
                    }}>
                      <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{layout.emoji}</div>
                      <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>{layout.label}</div>
                      <div style={{ fontSize:'0.7rem', color:'#555', marginTop:'2px' }}>{layout.desc}</div>
                    </div>
                  ))}
                </div>
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* ACCESSIBILITY */}
          {activeSection === 'accessibility' && (
            <SettingsSection title="Accessibility" subtitle="Make Inspira work better for you">
              <SettingsGroup title="Display">
                <SettingsToggle label="Reduce motion" sublabel="Minimize animations and transitions" defaultOn={false} />
                <SettingsToggle label="High contrast" sublabel="Increase contrast for better readability" defaultOn={false} />
                <SettingsToggle label="Large text" sublabel="Increase text size across the app" defaultOn={false} />
              </SettingsGroup>
              <SettingsGroup title="Content">
                <SettingsToggle label="Auto-play videos" sublabel="Automatically play videos in feed" defaultOn={true} />
                <SettingsToggle label="Show captions" sublabel="Display captions on all videos" defaultOn={false} />
                <SettingsToggle label="Alt text reminders" sublabel="Remind you to add alt text when creating posts" defaultOn={true} inspira />
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* YOUR DATA */}
          {activeSection === 'data' && (
            <SettingsSection title="Your Data" subtitle="See, download, and manage your data">
              <div style={{
                background:'rgba(232,201,126,0.04)', border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'1rem', marginBottom:'1.5rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Inspira data transparency
                </div>
                <p style={{ fontSize:'0.75rem', color:'#555', lineHeight:1.6, margin:0 }}>
                  Instagram makes it very hard to export your data and even harder to delete your account. Inspira gives you full control — export everything, delete anytime, no dark patterns.
                </p>
              </div>

              <SettingsGroup title="Data export">
                {[
                  { label:'Download your posts', desc:'All photos, videos, and captions', icon:'📸' },
                  { label:'Download your messages', desc:'All DM conversations', icon:'💬' },
                  { label:'Download your data', desc:'Complete account data in JSON format', icon:'📦' },
                  { label:'Download your followers list', desc:'Export as CSV', icon:'👥' },
                ].map(item => (
                  <div key={item.label} style={{
                    display:'flex', alignItems:'center', gap:'0.85rem',
                    padding:'0.85rem', background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'10px', marginBottom:'0.5rem', cursor:'pointer',
                    transition:'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                  >
                    <span style={{ fontSize:'1.25rem', flexShrink:0 }}>{item.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.85rem', color:'#f0ede8', fontWeight:500 }}>{item.label}</div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>{item.desc}</div>
                    </div>
                    <span style={{ color:'#555', fontSize:'0.82rem' }}>↓</span>
                  </div>
                ))}
              </SettingsGroup>

              <SettingsGroup title="Danger zone">
                <div style={{
                  background:'rgba(201,111,111,0.04)', border:'1px solid rgba(201,111,111,0.15)',
                  borderRadius:'12px', padding:'1.25rem',
                }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                    <div>
                      <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.25rem' }}>
                        Deactivate account
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.75rem' }}>
                        Temporarily hide your profile. You can reactivate anytime.
                      </div>
                      <button style={{
                        background:'transparent', border:'1px solid rgba(201,111,111,0.3)',
                        borderRadius:'100px', padding:'0.4rem 1.1rem',
                        color:'#c96f6f', fontSize:'0.78rem', cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif",
                      }}>Deactivate</button>
                    </div>
                    <div style={{ borderTop:'1px solid rgba(201,111,111,0.1)', paddingTop:'0.75rem' }}>
                      <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8', marginBottom:'0.25rem' }}>
                        Delete account permanently
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.75rem', lineHeight:1.5 }}>
                        This will permanently delete your account and all your data. Unlike Instagram, we make this easy to find and do. No tricks, no guilt trips.
                      </div>
                      <button style={{
                        background:'rgba(201,111,111,0.1)', border:'1px solid #c96f6f',
                        borderRadius:'100px', padding:'0.4rem 1.1rem',
                        color:'#c96f6f', fontSize:'0.78rem', cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif", fontWeight:500,
                      }}>Delete my account</button>
                    </div>
                  </div>
                </div>
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* MONETIZATION */}
          {activeSection === 'monetization' && (
            <SettingsSection title="Monetization" subtitle="Earn from your content on Inspira">
              <div style={{
                background:'rgba(232,201,126,0.06)', border:'1px solid rgba(232,201,126,0.2)',
                borderRadius:'14px', padding:'1.25rem', marginBottom:'1.5rem',
              }}>
                <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                  ✦ Inspira Creator Fund
                </div>
                <p style={{ fontSize:'0.82rem', color:'#888', lineHeight:1.6, margin:'0 0 0.75rem' }}>
                  Inspira pays creators fairly. We take 15% — Instagram takes up to 55% on some features. You keep 85% of everything you earn.
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem' }}>
                  {[
                    { label:'Your earnings', value:'₹0', sublabel:'This month' },
                    { label:'Inspira cut', value:'15%', sublabel:'vs 55% on Instagram' },
                    { label:'You keep', value:'85%', sublabel:'Of all earnings' },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background:'rgba(10,10,10,0.5)', borderRadius:'10px',
                      padding:'0.75rem', textAlign:'center',
                    }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:600, color:'#e8c97e' }}>{stat.value}</div>
                      <div style={{ fontSize:'0.65rem', color:'#555', marginTop:'2px' }}>{stat.label}</div>
                      <div style={{ fontSize:'0.6rem', color:'#444', marginTop:'1px' }}>{stat.sublabel}</div>
                    </div>
                  ))}
                </div>
              </div>

              <SettingsGroup title="Revenue streams">
                {[
                  { label:'Creator Fund', desc:'Get paid based on your reach and engagement', enabled:false, icon:'💰' },
                  { label:'Subscriptions', desc:'Charge followers for exclusive content', enabled:false, icon:'⭐' },
                  { label:'Tips', desc:'Let followers send you tips on posts', enabled:false, icon:'🎁' },
                  { label:'Brand collabs', desc:'Connect with brands for paid partnerships', enabled:false, icon:'🤝' },
                ].map(stream => (
                  <div key={stream.label} style={{
                    display:'flex', alignItems:'center', gap:'0.85rem',
                    padding:'1rem', background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'12px', marginBottom:'0.5rem',
                  }}>
                    <span style={{ fontSize:'1.2rem', flexShrink:0 }}>{stream.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>{stream.label}</div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>{stream.desc}</div>
                    </div>
                    <button style={{
                      background: stream.enabled ? '#e8c97e' : 'transparent',
                      color: stream.enabled ? '#0a0a0a' : '#e8c97e',
                      border:'1px solid rgba(232,201,126,0.3)',
                      borderRadius:'100px', padding:'0.35rem 0.9rem',
                      fontSize:'0.75rem', fontWeight:500, cursor:'pointer',
                      fontFamily:"'Outfit',sans-serif", flexShrink:0,
                    }}>{stream.enabled ? 'Enabled' : 'Enable'}</button>
                  </div>
                ))}
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* HELP */}
          {activeSection === 'help' && (
            <SettingsSection title="Help & Support" subtitle="We're here to help">
              <SettingsGroup title="Get help">
                {[
                  { label:'Help Center', desc:'Browse articles and guides', icon:'📖' },
                  { label:'Contact support', desc:'Chat with our team', icon:'💬' },
                  { label:'Report a problem', desc:'Let us know about bugs or issues', icon:'🐛' },
                  { label:'Give feedback', desc:'Help us improve Inspira', icon:'💡' },
                ].map(item => (
                  <div key={item.label} style={{
                    display:'flex', alignItems:'center', gap:'0.85rem',
                    padding:'0.85rem', background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'10px', marginBottom:'0.5rem', cursor:'pointer',
                    transition:'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                  >
                    <span style={{ fontSize:'1.2rem', flexShrink:0 }}>{item.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'0.85rem', color:'#f0ede8', fontWeight:500 }}>{item.label}</div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'1px' }}>{item.desc}</div>
                    </div>
                    <span style={{ color:'#555' }}>→</span>
                  </div>
                ))}
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* ABOUT */}
          {activeSection === 'about' && (
            <SettingsSection title="About Inspira" subtitle="The better Instagram">
              <div style={{
                textAlign:'center', padding:'2rem',
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'16px', marginBottom:'1.5rem',
              }}>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'3rem', fontWeight:600, color:'#f0ede8', marginBottom:'0.5rem',
                }}>
                  Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
                </div>
                <div style={{ fontSize:'0.82rem', color:'#555', marginBottom:'1rem' }}>Version 1.0.0 · Built with ❤️ in Hyderabad</div>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  background:'rgba(232,201,126,0.1)', border:'1px solid rgba(232,201,126,0.2)',
                  borderRadius:'100px', padding:'0.35rem 1rem',
                  fontSize:'0.75rem', color:'#e8c97e',
                }}>✦ The Instagram we always deserved</div>
              </div>

              <SettingsGroup title="What makes Inspira different">
                {[
                  ['👁', 'Full reach transparency on every post'],
                  ['🚫', 'Zero shadowbanning — ever'],
                  ['📊', 'Free analytics for all creators'],
                  ['🔒', 'Your data never sold or used for ads'],
                  ['💰', 'Creators keep 85% of earnings'],
                  ['🗓', 'Native post scheduling — free'],
                  ['🧠', 'Algorithm explained, not hidden'],
                  ['🔀', 'You control your feed order'],
                ].map(([icon, text]) => (
                  <div key={text} style={{
                    display:'flex', gap:'0.75rem', alignItems:'flex-start',
                    padding:'0.6rem 0', borderBottom:'1px solid #1a1a1a',
                  }}>
                    <span style={{ fontSize:'0.9rem', flexShrink:0 }}>{icon}</span>
                    <span style={{ fontSize:'0.82rem', color:'#888', lineHeight:1.5 }}>{text}</span>
                  </div>
                ))}
              </SettingsGroup>
            </SettingsSection>
          )}

          {/* Save button */}
          {!['help','about','data'].includes(activeSection) && (
            <div style={{ marginTop:'2rem', display:'flex', justifyContent:'flex-end' }}>
              <button
                onClick={saveSettings}
                style={{
                  background: saved ? '#6fcf97' : '#e8c97e',
                  color:'#0a0a0a', border:'none', borderRadius:'100px',
                  padding:'0.7rem 2rem', fontSize:'0.88rem', fontWeight:600,
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  transition:'all 0.2s',
                }}
              >{saved ? '✓ Saved!' : 'Save changes'}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Reusable setting components
function SettingsSection({ title, subtitle, children }) {
  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'1.6rem', fontWeight:600, color:'#f0ede8', margin:0,
        }}>{title}</h2>
        <p style={{ fontSize:'0.82rem', color:'#555', marginTop:'0.35rem' }}>{subtitle}</p>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        {children}
      </div>
    </div>
  )
}

function SettingsGroup({ title, children }) {
  return (
    <div style={{
      background:'#0d0d0d', border:'1px solid #2a2a2a',
      borderRadius:'14px', padding:'1.25rem',
    }}>
      <div style={{
        fontSize:'0.68rem', color:'#555', fontWeight:500,
        textTransform:'uppercase', letterSpacing:'0.1em',
        marginBottom:'1rem',
      }}>{title}</div>
      {children}
    </div>
  )
}

function SettingsInput({ label, defaultValue, type='text', placeholder, multiline, prefix }) {
  return (
    <div style={{ marginBottom:'0.85rem' }}>
      <label style={{
        fontSize:'0.75rem', color:'#888', display:'block', marginBottom:'0.35rem',
      }}>{label}</label>
      <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
        {prefix && (
          <span style={{
            position:'absolute', left:'0.85rem',
            color:'#555', fontSize:'0.88rem',
          }}>{prefix}</span>
        )}
        {multiline ? (
          <textarea
            defaultValue={defaultValue}
            rows={3}
            style={{
              width:'100%', background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'10px', padding:'0.65rem 0.85rem',
              color:'#f0ede8', fontSize:'0.85rem',
              fontFamily:"'Outfit',sans-serif", outline:'none',
              resize:'vertical', lineHeight:1.6, boxSizing:'border-box',
            }}
            onFocus={e => e.target.style.borderColor='#e8c97e'}
            onBlur={e => e.target.style.borderColor='#2a2a2a'}
          />
        ) : (
          <input
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            style={{
              width:'100%', background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'10px', padding: prefix ? '0.65rem 0.85rem 0.65rem 1.75rem' : '0.65rem 0.85rem',
              color:'#f0ede8', fontSize:'0.85rem',
              fontFamily:"'Outfit',sans-serif", outline:'none',
              boxSizing:'border-box', transition:'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor='#e8c97e'}
            onBlur={e => e.target.style.borderColor='#2a2a2a'}
          />
        )}
      </div>
    </div>
  )
}

function SettingsSelect({ label, options }) {
  return (
    <div style={{ marginBottom:'0.85rem' }}>
      <label style={{ fontSize:'0.75rem', color:'#888', display:'block', marginBottom:'0.35rem' }}>
        {label}
      </label>
      <select style={{
        width:'100%', background:'#111', border:'1px solid #2a2a2a',
        borderRadius:'10px', padding:'0.65rem 0.85rem',
        color:'#f0ede8', fontSize:'0.85rem',
        fontFamily:"'Outfit',sans-serif", outline:'none',
        colorScheme:'dark', cursor:'pointer',
      }}
        onFocus={e => e.target.style.borderColor='#e8c97e'}
        onBlur={e => e.target.style.borderColor='#2a2a2a'}
      >
        {options.map(opt => (
          <option key={opt} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

function SettingsToggle({ label, sublabel, defaultOn, inspira }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0.65rem 0', borderBottom:'1px solid #1a1a1a',
    }}>
      <div style={{ flex:1, marginRight:'1rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
          <span style={{ fontSize:'0.85rem', color:'#888' }}>{label}</span>
          {inspira && (
            <span style={{
              fontSize:'0.6rem', color:'#e8c97e',
              background:'rgba(232,201,126,0.1)',
              padding:'0.1rem 0.4rem', borderRadius:'100px',
            }}>✦ Inspira</span>
          )}
        </div>
        {sublabel && <div style={{ fontSize:'0.72rem', color:'#444', marginTop:'1px', lineHeight:1.5 }}>{sublabel}</div>}
      </div>
      <div
        onClick={() => setOn(!on)}
        style={{
          width:'36px', height:'20px', borderRadius:'100px',
          background: on ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
          position:'relative', cursor:'pointer', flexShrink:0,
          border: on ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
          transition:'all 0.2s',
        }}
      >
        <div style={{
          width:'14px', height:'14px', borderRadius:'50%',
          background: on ? '#e8c97e' : '#555',
          position:'absolute', top:'2px',
          left: on ? '18px' : '2px',
          transition:'all 0.2s',
        }}/>
      </div>
    </div>
  )
}