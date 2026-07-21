import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const STEPS = ['Media', 'Edit', 'Details', 'Schedule']

const emojiOptions = [
  { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', label:'Golden Hour' },
  { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', label:'Night City' },
  { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', label:'Nature' },
  { emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)', label:'Art' },
  { emoji:'✈️', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', label:'Travel' },
  { emoji:'☕', bg:'linear-gradient(135deg,#1a1210,#3a2218)', label:'Lifestyle' },
  { emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', label:'Architecture' },
  { emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', label:'Ocean' },
  { emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', label:'Space' },
]

export default function CreatePost() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [altText, setAltText] = useState('')
  const [audience, setAudience] = useState('everyone')
  const [hideStats, setHideStats] = useState(false)
  const [disableComments, setDisableComments] = useState(false)
  const [contentWarning, setContentWarning] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isDraft, setIsDraft] = useState(false)
  const [postType, setPostType] = useState('post')
  const [aspectRatio, setAspectRatio] = useState('1/1')

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '')
    if (t && !tags.includes(t) && tags.length < 30) {
      setTags([...tags, t])
      setTagInput('')
    }
  }

  const removeTag = (t) => setTags(tags.filter(tag => tag !== t))

  const captionLength = caption.length
  const maxCaption = 2200

  const canProceed = () => {
    if (step === 0) return selectedMedia !== null
    if (step === 1) return true
    if (step === 2) return caption.length > 0
    return true
  }

  const publish = () => {
    navigate('/feed')
  }

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{
        flex:1, padding:'2rem 3vw',
        borderRight:'1px solid #2a2a2a', overflowY:'auto',
      }}>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'2rem',
          }}>
            <div>
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
              }}>Create Post</h1>
              <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </p>
            </div>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button
                onClick={() => { setIsDraft(true); navigate('/feed') }}
                style={{
                  background:'transparent', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.5rem 1.25rem',
                  color:'#888', fontSize:'0.82rem', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
                onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#888' }}
              >Save draft</button>
              <button
                onClick={() => navigate('/feed')}
                style={{
                  background:'transparent', border:'none',
                  color:'#555', fontSize:'1.1rem', cursor:'pointer',
                }}
              >✕</button>
            </div>
          </div>

          {/* Step progress */}
          <div style={{
            display:'flex', gap:'0', marginBottom:'2.5rem',
            background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'100px', padding:'4px', overflow:'hidden',
          }}>
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                style={{
                  flex:1, background: i === step ? '#e8c97e' : 'transparent',
                  color: i === step ? '#0a0a0a' : i < step ? '#888' : '#444',
                  border:'none', borderRadius:'100px',
                  padding:'0.5rem', fontSize:'0.78rem',
                  fontWeight: i === step ? 600 : 400,
                  cursor: i < step ? 'pointer' : 'default',
                  fontFamily:"'Outfit',sans-serif",
                  transition:'all 0.2s',
                  display:'flex', alignItems:'center',
                  justifyContent:'center', gap:'0.4rem',
                }}
              >
                <span style={{
                  width:'18px', height:'18px', borderRadius:'50%',
                  background: i < step ? '#6fcf97' : i === step ? '#0a0a0a' : '#2a2a2a',
                  color: i < step ? '#0a0a0a' : i === step ? '#e8c97e' : '#555',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.6rem', fontWeight:700, flexShrink:0,
                }}>{i < step ? '✓' : i + 1}</span>
                {s}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', alignItems:'start' }}>

            {/* Left — main content area */}
            <div>

              {/* STEP 0 — Media selection */}
              {step === 0 && (
                <div>
                  {/* Post type */}
                  <div style={{ marginBottom:'1.5rem' }}>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                      Post type
                    </div>
                    <div style={{ display:'flex', gap:'0.5rem' }}>
                      {[
                        { id:'post', label:'📸 Post' },
                        { id:'reel', label:'▶ Reel' },
                        { id:'story', label:'⭕ Story' },
                        { id:'carousel', label:'🗂 Carousel' },
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setPostType(type.id)}
                          style={{
                            background: postType === type.id ? '#e8c97e' : '#111',
                            color: postType === type.id ? '#0a0a0a' : '#555',
                            border: postType === type.id ? 'none' : '1px solid #2a2a2a',
                            borderRadius:'100px', padding:'0.4rem 1rem',
                            fontSize:'0.78rem', fontWeight: postType === type.id ? 600 : 400,
                            cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                            transition:'all 0.2s',
                          }}
                        >{type.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Media picker */}
                  {!selectedMedia ? (
                    <div>
                      <div style={{
                        border:'2px dashed #2a2a2a', borderRadius:'16px',
                        padding:'3rem 2rem', textAlign:'center',
                        marginBottom:'1.5rem', transition:'border-color 0.2s',
                        cursor:'pointer',
                      }}
                        onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
                        onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                      >
                        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📸</div>
                        <p style={{ fontSize:'0.95rem', color:'#f0ede8', marginBottom:'0.5rem', fontWeight:500 }}>
                          Drag and drop your media here
                        </p>
                        <p style={{ fontSize:'0.8rem', color:'#555', marginBottom:'1.5rem' }}>
                          JPG, PNG, MP4, MOV up to 100MB
                        </p>
                        <button style={{
                          background:'#e8c97e', color:'#0a0a0a', border:'none',
                          borderRadius:'100px', padding:'0.65rem 1.75rem',
                          fontSize:'0.85rem', fontWeight:600, cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif",
                        }}>Browse files</button>
                      </div>

                      {/* Pick from library (emoji placeholders) */}
                      <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                        Or pick from your library
                      </div>
                      <div style={{
                        display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                        gap:'3px', borderRadius:'12px', overflow:'hidden',
                      }}>
                        {emojiOptions.map(opt => (
                          <div
                            key={opt.emoji}
                            onClick={() => setSelectedMedia(opt)}
                            style={{
                              aspectRatio:'1', background: opt.bg,
                              display:'flex', alignItems:'center',
                              justifyContent:'center', fontSize:'2.5rem',
                              cursor:'pointer', transition:'transform 0.15s',
                              position:'relative',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform='scale(0.97)'}
                            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                          >
                            {opt.emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        borderRadius:'16px', overflow:'hidden',
                        background: selectedMedia.bg,
                        aspectRatio: aspectRatio,
                        display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'6rem',
                        marginBottom:'1rem', position:'relative',
                      }}>
                        {selectedMedia.emoji}
                        <button
                          onClick={() => setSelectedMedia(null)}
                          style={{
                            position:'absolute', top:'0.75rem', right:'0.75rem',
                            background:'rgba(10,10,10,0.7)', border:'none',
                            borderRadius:'50%', width:'32px', height:'32px',
                            color:'white', cursor:'pointer', fontSize:'0.8rem',
                          }}
                        >✕</button>
                      </div>

                      {/* Aspect ratio — Inspira doesn't force square like Instagram used to */}
                      <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                        Aspect ratio
                      </div>
                      <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                        {[
                          { label:'1:1', value:'1/1' },
                          { label:'4:5', value:'4/5' },
                          { label:'16:9', value:'16/9' },
                          { label:'9:16', value:'9/16' },
                          { label:'Original', value:'auto' },
                        ].map(r => (
                          <button
                            key={r.value}
                            onClick={() => setAspectRatio(r.value)}
                            style={{
                              background: aspectRatio === r.value ? '#e8c97e' : '#111',
                              color: aspectRatio === r.value ? '#0a0a0a' : '#555',
                              border: aspectRatio === r.value ? 'none' : '1px solid #2a2a2a',
                              borderRadius:'100px', padding:'0.3rem 0.85rem',
                              fontSize:'0.75rem', cursor:'pointer',
                              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                            }}
                          >{r.label}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1 — Edit */}
              {step === 1 && selectedMedia && (
                <div>
                  <div style={{
                    borderRadius:'16px', overflow:'hidden',
                    background: selectedMedia.bg, aspectRatio:'1',
                    display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'6rem',
                    marginBottom:'1.5rem',
                  }}>
                    {selectedMedia.emoji}
                  </div>

                  {/* Filters */}
                  <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                    Filters
                  </div>
                  <div style={{
                    display:'flex', gap:'0.65rem', overflowX:'auto',
                    paddingBottom:'0.5rem', marginBottom:'1.5rem',
                  }}>
                    {[
                      { name:'None', filter:'none' },
                      { name:'Warm', filter:'sepia(0.3) saturate(1.2)' },
                      { name:'Cool', filter:'hue-rotate(20deg) saturate(0.9)' },
                      { name:'Fade', filter:'opacity(0.8) brightness(1.1)' },
                      { name:'Drama', filter:'contrast(1.3) saturate(1.4)' },
                      { name:'Noir', filter:'grayscale(1) contrast(1.2)' },
                    ].map(f => (
                      <div key={f.name} style={{
                        flexShrink:0, textAlign:'center', cursor:'pointer',
                      }}>
                        <div style={{
                          width:'64px', height:'64px', borderRadius:'10px',
                          background: selectedMedia.bg,
                          display:'flex', alignItems:'center',
                          justifyContent:'center', fontSize:'1.5rem',
                          filter: f.filter, marginBottom:'0.35rem',
                          border:'2px solid', borderColor: f.name === 'None' ? '#e8c97e' : 'transparent',
                          transition:'border-color 0.15s',
                        }}>{selectedMedia.emoji}</div>
                        <span style={{ fontSize:'0.65rem', color:'#555' }}>{f.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Adjustments */}
                  <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                    Adjustments
                  </div>
                  {[
                    { label:'Brightness', value:50 },
                    { label:'Contrast', value:50 },
                    { label:'Saturation', value:50 },
                    { label:'Sharpness', value:30 },
                  ].map(adj => (
                    <div key={adj.label} style={{ marginBottom:'0.85rem' }}>
                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        fontSize:'0.78rem', color:'#888', marginBottom:'0.35rem',
                      }}>
                        <span>{adj.label}</span>
                        <span style={{ color:'#555' }}>{adj.value}</span>
                      </div>
                      <input type="range" min="0" max="100" defaultValue={adj.value} style={{
                        width:'100%', accentColor:'#e8c97e',
                      }}/>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 2 — Details */}
              {step === 2 && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

                  {/* Caption */}
                  <div>
                    <div style={{
                      display:'flex', justifyContent:'space-between',
                      fontSize:'0.72rem', color:'#555',
                      textTransform:'uppercase', letterSpacing:'0.1em',
                      marginBottom:'0.5rem',
                    }}>
                      <span>Caption</span>
                      <span style={{ color: captionLength > 2000 ? '#c96f6f' : '#555' }}>
                        {captionLength}/{maxCaption}
                      </span>
                    </div>
                    <textarea
                      value={caption}
                      onChange={e => setCaption(e.target.value)}
                      maxLength={maxCaption}
                      placeholder="Write a caption... (Inspira supports up to 2,200 characters — Instagram truncates at 125)"
                      rows={5}
                      style={{
                        width:'100%', background:'#111',
                        border:'1px solid #2a2a2a', borderRadius:'12px',
                        padding:'0.85rem 1rem', color:'#f0ede8',
                        fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                        outline:'none', resize:'vertical', lineHeight:1.6,
                        boxSizing:'border-box', transition:'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor='#e8c97e'}
                      onBlur={e => e.target.style.borderColor='#2a2a2a'}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                      Tags ({tags.length}/30)
                    </div>
                    <div style={{
                      background:'#111', border:'1px solid #2a2a2a',
                      borderRadius:'12px', padding:'0.75rem',
                      minHeight:'60px',
                    }}>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom: tags.length > 0 ? '0.5rem' : 0 }}>
                        {tags.map(tag => (
                          <span key={tag} style={{
                            background:'rgba(232,201,126,0.1)',
                            border:'1px solid rgba(232,201,126,0.2)',
                            borderRadius:'100px', padding:'0.2rem 0.65rem',
                            fontSize:'0.75rem', color:'#e8c97e',
                            display:'flex', alignItems:'center', gap:'0.4rem',
                          }}>
                            #{tag}
                            <button onClick={() => removeTag(tag)} style={{
                              background:'transparent', border:'none',
                              color:'#888', cursor:'pointer', fontSize:'0.7rem',
                              padding:0, lineHeight:1,
                            }}>✕</button>
                          </span>
                        ))}
                      </div>
                      <input
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addTag() } }}
                        placeholder="Add tags... (press Enter or Space)"
                        style={{
                          background:'transparent', border:'none',
                          color:'#f0ede8', fontSize:'0.82rem',
                          fontFamily:"'Outfit',sans-serif", outline:'none',
                          width:'100%',
                        }}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                      Location
                    </div>
                    <input
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Add location..."
                      style={{
                        width:'100%', background:'#111',
                        border:'1px solid #2a2a2a', borderRadius:'12px',
                        padding:'0.75rem 1rem', color:'#f0ede8',
                        fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                        outline:'none', boxSizing:'border-box',
                        transition:'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor='#e8c97e'}
                      onBlur={e => e.target.style.borderColor='#2a2a2a'}
                    />
                  </div>

                  {/* Alt text — accessibility, Instagram added this late */}
                  <div>
                    <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                      Alt text <span style={{ color:'#e8c97e', fontSize:'0.65rem' }}>♿ Accessibility</span>
                    </div>
                    <input
                      value={altText}
                      onChange={e => setAltText(e.target.value)}
                      placeholder="Describe your image for screen readers..."
                      style={{
                        width:'100%', background:'#111',
                        border:'1px solid #2a2a2a', borderRadius:'12px',
                        padding:'0.75rem 1rem', color:'#f0ede8',
                        fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                        outline:'none', boxSizing:'border-box',
                        transition:'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor='#e8c97e'}
                      onBlur={e => e.target.style.borderColor='#2a2a2a'}
                    />
                  </div>

                  {/* Advanced settings */}
                  <div style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                  }}>
                    <div style={{ fontSize:'0.72rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>
                      Advanced settings
                    </div>

                    {/* Audience */}
                    <div style={{ marginBottom:'1rem' }}>
                      <div style={{ fontSize:'0.82rem', color:'#888', marginBottom:'0.5rem' }}>
                        Audience
                      </div>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        {['everyone', 'followers', 'close friends'].map(a => (
                          <button
                            key={a}
                            onClick={() => setAudience(a)}
                            style={{
                              background: audience === a ? '#e8c97e' : '#1a1a1a',
                              color: audience === a ? '#0a0a0a' : '#555',
                              border: audience === a ? 'none' : '1px solid #2a2a2a',
                              borderRadius:'100px', padding:'0.3rem 0.85rem',
                              fontSize:'0.75rem', cursor:'pointer',
                              fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                              textTransform:'capitalize',
                            }}
                          >{a}</button>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    {[
                      { label:'Hide like count', sublabel:'Viewers won\'t see likes — Inspira fix', value:hideStats, set:setHideStats },
                      { label:'Disable comments', sublabel:'Turn off comments for this post', value:disableComments, set:setDisableComments },
                      { label:'Content warning', sublabel:'Add sensitivity label to your post', value:contentWarning, set:setContentWarning },
                    ].map((toggle, i) => (
                      <div key={toggle.label} style={{
                        display:'flex', alignItems:'center', justifyContent:'space-between',
                        padding:'0.65rem 0',
                        borderTop: i > 0 ? '1px solid #1a1a1a' : '1px solid #1a1a1a',
                      }}>
                        <div>
                          <div style={{ fontSize:'0.82rem', color:'#888' }}>{toggle.label}</div>
                          <div style={{ fontSize:'0.7rem', color:'#444', marginTop:'1px' }}>{toggle.sublabel}</div>
                        </div>
                        <div
                          onClick={() => toggle.set(!toggle.value)}
                          style={{
                            width:'36px', height:'20px', borderRadius:'100px',
                            background: toggle.value ? 'rgba(232,201,126,0.3)' : '#2a2a2a',
                            position:'relative', cursor:'pointer',
                            border: toggle.value ? '1px solid rgba(232,201,126,0.4)' : '1px solid #3a3a3a',
                            transition:'all 0.2s', flexShrink:0,
                          }}
                        >
                          <div style={{
                            width:'14px', height:'14px', borderRadius:'50%',
                            background: toggle.value ? '#e8c97e' : '#555',
                            position:'absolute', top:'2px',
                            left: toggle.value ? '18px' : '2px',
                            transition:'all 0.2s',
                          }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 — Schedule */}
              {step === 3 && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

                  {/* Inspira advantage */}
                  <div style={{
                    background:'rgba(232,201,126,0.04)',
                    border:'1px solid rgba(232,201,126,0.1)',
                    borderRadius:'12px', padding:'0.85rem 1rem',
                    display:'flex', gap:'0.75rem',
                  }}>
                    <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
                    <p style={{ fontSize:'0.78rem', color:'#555', margin:0, lineHeight:1.6 }}>
                      Instagram only added scheduling via third-party tools. Inspira has it built in natively — schedule up to 90 days in advance, for free.
                    </p>
                  </div>

                  {/* Post now or schedule */}
                  <div style={{
                    display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem',
                  }}>
                    {[
                      { id:'now', label:'Post now', icon:'⚡', desc:'Publish immediately' },
                      { id:'schedule', label:'Schedule', icon:'🗓', desc:'Pick a date & time' },
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setScheduledDate(opt.id === 'now' ? '' : scheduledDate)}
                        style={{
                          background: (opt.id === 'now' && !scheduledDate) || (opt.id === 'schedule' && scheduledDate) ? 'rgba(232,201,126,0.08)' : '#111',
                          border: (opt.id === 'now' && !scheduledDate) || (opt.id === 'schedule' && scheduledDate) ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                          borderRadius:'14px', padding:'1.25rem',
                          cursor:'pointer', transition:'all 0.2s', textAlign:'center',
                        }}
                      >
                        <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{opt.icon}</div>
                        <div style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>{opt.label}</div>
                        <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'0.25rem' }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Date + time pickers */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                    <div>
                      <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                        Date
                      </div>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={e => setScheduledDate(e.target.value)}
                        style={{
                          width:'100%', background:'#111',
                          border:'1px solid #2a2a2a', borderRadius:'12px',
                          padding:'0.75rem 1rem', color:'#f0ede8',
                          fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                          outline:'none', boxSizing:'border-box',
                          colorScheme:'dark',
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>
                        Time
                      </div>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={e => setScheduledTime(e.target.value)}
                        style={{
                          width:'100%', background:'#111',
                          border:'1px solid #2a2a2a', borderRadius:'12px',
                          padding:'0.75rem 1rem', color:'#f0ede8',
                          fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                          outline:'none', boxSizing:'border-box',
                          colorScheme:'dark',
                        }}
                      />
                    </div>
                  </div>

                  {/* Best time to post — Inspira exclusive */}
                  <div style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'14px', padding:'1.25rem',
                  }}>
                    <div style={{
                      fontSize:'0.65rem', color:'#e8c97e', fontWeight:500,
                      textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem',
                    }}>✦ Best times to post for your audience</div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.5rem' }}>
                      {[
                        { time:'8:00 AM', day:'Mon', score:'92%' },
                        { time:'6:00 PM', day:'Wed', score:'88%' },
                        { time:'9:00 PM', day:'Fri', score:'95%' },
                      ].map(slot => (
                        <div
                          key={slot.time}
                          onClick={() => { setScheduledTime(slot.time.replace(' AM','').replace(' PM','')); }}
                          style={{
                            background:'#1a1a1a', borderRadius:'10px',
                            padding:'0.75rem', textAlign:'center', cursor:'pointer',
                            border:'1px solid #2a2a2a', transition:'border-color 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
                          onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                        >
                          <div style={{ fontSize:'0.85rem', fontWeight:600, color:'#f0ede8' }}>{slot.time}</div>
                          <div style={{ fontSize:'0.68rem', color:'#555', marginTop:'2px' }}>{slot.day}</div>
                          <div style={{ fontSize:'0.72rem', color:'#6fcf97', marginTop:'4px', fontWeight:500 }}>{slot.score}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize:'0.72rem', color:'#444', marginTop:'0.75rem', lineHeight:1.5 }}>
                      Based on when your followers are most active. Instagram never tells you this for free.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right — preview */}
            <div style={{ position:'sticky', top:'2rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                Preview
              </div>
              <div style={{
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'16px', overflow:'hidden',
              }}>
                {/* Post header */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', padding:'0.85rem 1rem' }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'50%',
                    background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.6rem', fontWeight:700, color:'#0a0a0a',
                  }}>You</div>
                  <div>
                    <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8' }}>your.handle</div>
                    <div style={{ fontSize:'0.68rem', color:'#555' }}>
                      {scheduledDate ? `Scheduled: ${scheduledDate}` : 'Just now'}
                      {location && ` · ${location}`}
                    </div>
                  </div>
                </div>

                {/* Image preview */}
                <div style={{
                  width:'100%', aspectRatio:'1',
                  background: selectedMedia ? selectedMedia.bg : '#1a1a1a',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize: selectedMedia ? '4rem' : '1.5rem',
                  color: selectedMedia ? 'inherit' : '#2a2a2a',
                }}>
                  {selectedMedia ? selectedMedia.emoji : '📷'}
                </div>

                {/* Preview caption */}
                <div style={{ padding:'0.75rem 1rem' }}>
                  <div style={{ display:'flex', gap:'1rem', color:'#888', fontSize:'0.9rem', marginBottom:'0.5rem' }}>
                    <span>♡</span><span>💬</span><span>↗</span>
                    <span style={{ marginLeft:'auto' }}>☆</span>
                  </div>
                  {caption ? (
                    <p style={{ fontSize:'0.78rem', color:'#f0ede8', lineHeight:1.5, margin:0 }}>
                      <strong>your.handle</strong> {caption.slice(0, 100)}{caption.length > 100 ? '...' : ''}
                    </p>
                  ) : (
                    <p style={{ fontSize:'0.75rem', color:'#444', margin:0 }}>Your caption will appear here...</p>
                  )}
                  {tags.length > 0 && (
                    <div style={{ marginTop:'0.35rem', display:'flex', flexWrap:'wrap', gap:'0.25rem' }}>
                      {tags.map(t => (
                        <span key={t} style={{ fontSize:'0.72rem', color:'#e8c97e' }}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'center', marginTop:'2rem',
            paddingTop:'1.5rem', borderTop:'1px solid #2a2a2a',
          }}>
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.65rem 1.5rem',
                color: step === 0 ? '#333' : '#888', fontSize:'0.85rem',
                cursor: step === 0 ? 'default' : 'pointer',
                fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
              }}
            >← Back</button>

            <div style={{ display:'flex', gap:'0.75rem' }}>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  style={{
                    background: canProceed() ? '#e8c97e' : '#2a2a2a',
                    color: canProceed() ? '#0a0a0a' : '#555',
                    border:'none', borderRadius:'100px',
                    padding:'0.65rem 1.75rem', fontSize:'0.85rem',
                    fontWeight:600, cursor: canProceed() ? 'pointer' : 'default',
                    fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                  }}
                >Continue →</button>
              ) : (
                <button
                  onClick={publish}
                  style={{
                    background:'#e8c97e', color:'#0a0a0a',
                    border:'none', borderRadius:'100px',
                    padding:'0.65rem 1.75rem', fontSize:'0.85rem',
                    fontWeight:600, cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}
                >{scheduledDate ? '📅 Schedule post' : '⚡ Publish now'}</button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Right tips panel */}
      <aside style={{
        width:'260px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            ✦ Inspira create fixes
          </div>
          {[
            ['📐', 'Any aspect ratio — no forced square'],
            ['📝', '2,200 char captions — full length'],
            ['🗓', 'Native scheduling — no third-party tools'],
            ['♿', 'Alt text for accessibility'],
            ['👁', 'Hide like counts per post'],
            ['⏰', 'Best time to post suggestions'],
            ['💾', 'Auto-save drafts'],
            ['⚠️', 'Content warnings built in'],
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
      </aside>
    </div>
  )
}