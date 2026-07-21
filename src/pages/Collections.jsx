import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const collectionsData = [
  {
    id:1, name:'Photography Inspo', emoji:'📸', color:'linear-gradient(135deg,#1a1208,#3d2b10)',
    count:24, privacy:'private', description:'Reference shots and lighting ideas',
    posts:[
      { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', user:'nisha.creates', likes:1842, note:'Love this golden hour technique' },
      { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', user:'arjun.lens', likes:3291, note:'Night exposure settings reference' },
      { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', user:'ananya.studio', likes:5103, note:'' },
      { emoji:'🌺', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', user:'flora.studio', likes:2847, note:'' },
      { emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', user:'urban.frames', likes:1923, note:'Architectural framing' },
      { emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', user:'cosmos.lens', likes:4201, note:'' },
    ]
  },
  {
    id:2, name:'Architecture', emoji:'🏛', color:'linear-gradient(135deg,#12120a,#2a2a10)',
    count:18, privacy:'public', description:'Buildings and structures that inspire me',
    posts:[
      { emoji:'🏙', bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', user:'city.frames', likes:7840, note:'Lines and symmetry' },
      { emoji:'🏛', bg:'linear-gradient(135deg,#12120a,#2a2a10)', user:'urban.frames', likes:1923, note:'' },
      { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', user:'arjun.lens', likes:3291, note:'' },
      { emoji:'🌉', bg:'linear-gradient(135deg,#0a0a20,#1e1e4a)', user:'bridge.lens', likes:2140, note:'Bridge perspective' },
    ]
  },
  {
    id:3, name:'Nature & Botanicals', emoji:'🌿', color:'linear-gradient(135deg,#0f1a0f,#1e3a1e)',
    count:31, privacy:'private', description:'Plants, forests, and organic textures',
    posts:[
      { emoji:'🌿', bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', user:'ananya.studio', likes:5103, note:'' },
      { emoji:'🌺', bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', user:'flora.studio', likes:2847, note:'Color palette reference' },
      { emoji:'🍃', bg:'linear-gradient(135deg,#0a150f,#1e3a20)', user:'nature.lens', likes:3201, note:'' },
      { emoji:'🌸', bg:'linear-gradient(135deg,#1a0f15,#3a1e2a)', user:'bloom.studio', likes:6780, note:'Macro technique' },
      { emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', user:'ocean.eye', likes:9320, note:'' },
    ]
  },
  {
    id:4, name:'Colour Palettes', emoji:'🎨', color:'linear-gradient(135deg,#1a0f2a,#2a1a4a)',
    count:12, privacy:'public', description:'Posts with colour combos I want to recreate',
    posts:[
      { emoji:'🎨', bg:'linear-gradient(135deg,#1a0f2a,#2a1a4a)', user:'maya.art', likes:12400, note:'Warm earth tones' },
      { emoji:'🌅', bg:'linear-gradient(135deg,#1a1208,#3d2b10)', user:'nisha.creates', likes:1842, note:'' },
      { emoji:'🌌', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', user:'cosmos.lens', likes:4201, note:'Deep blues' },
    ]
  },
  {
    id:5, name:'Travel Goals', emoji:'✈️', color:'linear-gradient(135deg,#0a1520,#1e3a5f)',
    count:45, privacy:'private', description:'Places I want to visit and photograph',
    posts:[
      { emoji:'✈️', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', user:'rohan.travels', likes:8930, note:'Coorg in monsoon' },
      { emoji:'🌊', bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', user:'ocean.eye', likes:9320, note:'Goa beach angles' },
      { emoji:'🏔', bg:'linear-gradient(135deg,#1a1a1a,#3a3a3a)', user:'peak.frames', likes:5240, note:'Himalayas sunrise' },
    ]
  },
  {
    id:6, name:'Editing References', emoji:'✨', color:'linear-gradient(135deg,#1a1a0f,#3a3a1e)',
    count:9, privacy:'private', description:'Colour grading and editing styles to try',
    posts:[
      { emoji:'✨', bg:'linear-gradient(135deg,#1a1a0f,#3a3a1e)', user:'style.collective', likes:11200, note:'Matte finish technique' },
      { emoji:'🌃', bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', user:'arjun.lens', likes:3291, note:'Moody colour grade' },
    ]
  },
]

const allSavedPosts = collectionsData.flatMap(c => c.posts)

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState(null)
  const [viewMode, setViewMode] = useState('collections')
  const [search, setSearch] = useState('')
  const [showNewCollection, setShowNewCollection] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPrivacy, setNewPrivacy] = useState('private')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [showNoteFor, setShowNoteFor] = useState(null)
  const [sortBy, setSortBy] = useState('recent')

  const filteredCollections = collectionsData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const currentPosts = activeCollection
    ? activeCollection.posts
    : allSavedPosts

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
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', marginBottom:'1.5rem',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              {activeCollection && (
                <button
                  onClick={() => setActiveCollection(null)}
                  style={{
                    background:'transparent', border:'none',
                    color:'#555', cursor:'pointer', fontSize:'1.1rem',
                    padding:'0.25rem',
                  }}
                >←</button>
              )}
              <div>
                <h1 style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'1.8rem', fontWeight:600, color:'#f0ede8', margin:0,
                }}>
                  {activeCollection ? activeCollection.name : 'Collections'}
                </h1>
                <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.25rem' }}>
                  {activeCollection
                    ? `${activeCollection.count} saved posts · ${activeCollection.privacy}`
                    : `${collectionsData.reduce((s,c) => s + c.count, 0)} total saved posts`}
                </p>
              </div>
            </div>

            <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
              {/* Search */}
              <div style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.45rem 0.9rem',
                transition:'border-color 0.2s',
              }}>
                <span style={{ color:'#555', fontSize:'0.85rem' }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={activeCollection ? 'Search in collection...' : 'Search collections...'}
                  style={{
                    background:'transparent', border:'none',
                    color:'#f0ede8', fontSize:'0.82rem',
                    fontFamily:"'Outfit',sans-serif", outline:'none',
                    width:'160px',
                  }}
                />
              </div>

              {!activeCollection && (
                <button
                  onClick={() => setShowNewCollection(true)}
                  style={{
                    background:'#e8c97e', color:'#0a0a0a', border:'none',
                    borderRadius:'100px', padding:'0.5rem 1.25rem',
                    fontSize:'0.82rem', fontWeight:600, cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                    display:'flex', alignItems:'center', gap:'0.4rem',
                  }}
                >+ New collection</button>
              )}

              {activeCollection && (
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  <button style={{
                    background:'transparent', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.45rem 1rem',
                    color:'#888', fontSize:'0.78rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}>Share</button>
                  <button style={{
                    background:'transparent', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.45rem 1rem',
                    color:'#888', fontSize:'0.78rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}>Edit</button>
                </div>
              )}
            </div>
          </div>

          {/* Inspira advantage */}
          {!activeCollection && (
            <div style={{
              background:'rgba(232,201,126,0.04)',
              border:'1px solid rgba(232,201,126,0.1)',
              borderRadius:'12px', padding:'0.75rem 1rem',
              marginBottom:'1.5rem',
              display:'flex', alignItems:'center', gap:'0.75rem',
            }}>
              <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
              <p style={{ fontSize:'0.75rem', color:'#555', margin:0, lineHeight:1.6 }}>
                Instagram puts everything in one unsorted list. Inspira lets you organize into named collections, add notes to saved posts, search within saves, and share collections with others.
              </p>
            </div>
          )}

          {/* View toggle + sort (when in collection) */}
          {activeCollection && (
            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'1.5rem',
            }}>
              <div style={{ display:'flex', gap:'0.5rem' }}>
                {['⊞ Grid', '☰ List'].map((v, i) => (
                  <button key={v} style={{
                    background: viewMode === (i === 0 ? 'grid' : 'list') ? '#111' : 'transparent',
                    border: viewMode === (i === 0 ? 'grid' : 'list') ? '1px solid #2a2a2a' : '1px solid transparent',
                    borderRadius:'8px', padding:'0.3rem 0.75rem',
                    color: viewMode === (i === 0 ? 'grid' : 'list') ? '#f0ede8' : '#555',
                    fontSize:'0.75rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif",
                  }}
                    onClick={() => setViewMode(i === 0 ? 'grid' : 'list')}
                  >{v}</button>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                <span style={{ fontSize:'0.75rem', color:'#555' }}>Sort:</span>
                {['recent','oldest','popular'].map(s => (
                  <button key={s} onClick={() => setSortBy(s)} style={{
                    background: sortBy === s ? 'rgba(232,201,126,0.1)' : 'transparent',
                    color: sortBy === s ? '#e8c97e' : '#555',
                    border: sortBy === s ? '1px solid rgba(232,201,126,0.2)' : '1px solid transparent',
                    borderRadius:'100px', padding:'0.25rem 0.65rem',
                    fontSize:'0.72rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", textTransform:'capitalize',
                  }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* COLLECTIONS GRID */}
          {!activeCollection && (
            <>
              {/* All saved quick view */}
              <div
                onClick={() => setActiveCollection({ name:'All saved', count: allSavedPosts.length, privacy:'private', posts: allSavedPosts, description:'All your saved posts' })}
                style={{
                  display:'flex', alignItems:'center', gap:'1rem',
                  padding:'1rem 1.25rem', background:'#111',
                  border:'1px solid #2a2a2a', borderRadius:'14px',
                  marginBottom:'1rem', cursor:'pointer', transition:'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
              >
                <div style={{
                  width:'56px', height:'56px', borderRadius:'10px',
                  background:'linear-gradient(135deg,#2a2a2a,#1a1a1a)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.5rem', flexShrink:0,
                }}>🔖</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'0.92rem', fontWeight:600, color:'#f0ede8' }}>All saved posts</div>
                  <div style={{ fontSize:'0.72rem', color:'#555', marginTop:'2px' }}>
                    {allSavedPosts.length} posts · Private
                  </div>
                </div>
                <span style={{ color:'#555' }}>→</span>
              </div>

              {/* Collections grid */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                gap:'1rem',
              }}>
                {filteredCollections.map(collection => (
                  <div
                    key={collection.id}
                    onClick={() => setActiveCollection(collection)}
                    style={{
                      background:'#111', border:'1px solid #2a2a2a',
                      borderRadius:'14px', overflow:'hidden', cursor:'pointer',
                      transition:'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#3a3a3a'; e.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#2a2a2a'; e.currentTarget.style.transform='translateY(0)' }}
                  >
                    {/* Cover — 2x2 preview grid */}
                    <div style={{
                      display:'grid', gridTemplateColumns:'1fr 1fr',
                      gap:'2px', height:'120px', overflow:'hidden',
                    }}>
                      {collection.posts.slice(0,4).map((post, i) => (
                        <div key={i} style={{
                          background: post.bg,
                          display:'flex', alignItems:'center',
                          justifyContent:'center', fontSize:'1.5rem',
                        }}>{post.emoji}</div>
                      ))}
                      {collection.posts.length < 4 && Array.from({ length: 4 - collection.posts.length }).map((_, i) => (
                        <div key={`empty-${i}`} style={{ background:'#1a1a1a' }}/>
                      ))}
                    </div>

                    {/* Info */}
                    <div style={{ padding:'0.85rem' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.25rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                          <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8' }}>{collection.name}</span>
                        </div>
                        <span style={{
                          fontSize:'0.6rem', color: collection.privacy === 'public' ? '#6fcf97' : '#555',
                          background: collection.privacy === 'public' ? 'rgba(111,207,151,0.1)' : '#1a1a1a',
                          padding:'0.1rem 0.45rem', borderRadius:'100px',
                          border: collection.privacy === 'public' ? '1px solid rgba(111,207,151,0.2)' : '1px solid #2a2a2a',
                        }}>{collection.privacy}</span>
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {collection.description}
                      </div>
                      <div style={{ fontSize:'0.68rem', color:'#444' }}>{collection.count} posts</div>
                    </div>
                  </div>
                ))}

                {/* New collection card */}
                <div
                  onClick={() => setShowNewCollection(true)}
                  style={{
                    background:'transparent', border:'2px dashed #2a2a2a',
                    borderRadius:'14px', cursor:'pointer',
                    display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center',
                    minHeight:'200px', transition:'border-color 0.2s',
                    gap:'0.5rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                >
                  <div style={{
                    width:'44px', height:'44px', borderRadius:'50%',
                    background:'#111', border:'1px solid #2a2a2a',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.3rem', color:'#555',
                  }}>+</div>
                  <span style={{ fontSize:'0.82rem', color:'#555' }}>New collection</span>
                </div>
              </div>
            </>
          )}

          {/* COLLECTION DETAIL — posts */}
          {activeCollection && (
            <>
              {/* Collection info bar */}
              {activeCollection.description && (
                <div style={{
                  background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'12px', padding:'0.85rem 1rem',
                  marginBottom:'1.5rem', fontSize:'0.82rem', color:'#888',
                  display:'flex', alignItems:'center', gap:'0.75rem',
                }}>
                  <span style={{ fontSize:'1rem' }}>{activeCollection.emoji || '🔖'}</span>
                  {activeCollection.description}
                </div>
              )}

              {viewMode === 'grid' ? (
                <div style={{
                  display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                  gap:'3px', borderRadius:'8px', overflow:'hidden',
                }}>
                  {currentPosts.map((post, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredPost(i)}
                      onMouseLeave={() => setHoveredPost(null)}
                      style={{
                        aspectRatio:'1', background: post.bg,
                        display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'2.5rem',
                        cursor:'pointer', position:'relative',
                        transition:'transform 0.15s',
                        transform: hoveredPost === i ? 'scale(0.98)' : 'scale(1)',
                      }}
                    >
                      {post.emoji}
                      {hoveredPost === i && (
                        <div style={{
                          position:'absolute', inset:0,
                          background:'rgba(10,10,10,0.75)',
                          display:'flex', flexDirection:'column',
                          alignItems:'center', justifyContent:'center',
                          gap:'0.35rem',
                        }}>
                          <div style={{ display:'flex', gap:'1rem' }}>
                            <span style={{ color:'white', fontSize:'0.82rem', fontWeight:600 }}>♥ {post.likes?.toLocaleString()}</span>
                          </div>
                          <span style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.6)' }}>@{post.user}</span>
                          {post.note && (
                            <div style={{
                              background:'rgba(232,201,126,0.2)',
                              borderRadius:'6px', padding:'0.2rem 0.5rem',
                              fontSize:'0.62rem', color:'#e8c97e',
                              maxWidth:'80%', textAlign:'center',
                              overflow:'hidden', textOverflow:'ellipsis',
                              whiteSpace:'nowrap',
                            }}>📝 {post.note}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                  {currentPosts.map((post, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'center', gap:'1rem',
                      padding:'0.85rem', background:'#111',
                      border:'1px solid #2a2a2a', borderRadius:'12px',
                      transition:'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor='#3a3a3a'}
                      onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
                    >
                      <div style={{
                        width:'52px', height:'52px', borderRadius:'8px',
                        background: post.bg, display:'flex',
                        alignItems:'center', justifyContent:'center',
                        fontSize:'1.5rem', flexShrink:0,
                      }}>{post.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:'0.85rem', fontWeight:500, color:'#f0ede8' }}>
                          @{post.user}
                        </div>
                        {post.note ? (
                          <div style={{
                            display:'flex', alignItems:'center', gap:'0.4rem',
                            marginTop:'0.2rem',
                          }}>
                            <span style={{ fontSize:'0.7rem', color:'#e8c97e' }}>📝</span>
                            <span style={{ fontSize:'0.72rem', color:'#e8c97e', fontStyle:'italic' }}>{post.note}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowNoteFor(i)}
                            style={{
                              background:'transparent', border:'none',
                              color:'#444', fontSize:'0.7rem', cursor:'pointer',
                              fontFamily:"'Outfit',sans-serif", padding:0,
                              marginTop:'0.2rem', transition:'color 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.color='#e8c97e'}
                            onMouseLeave={e => e.target.style.color='#444'}
                          >+ Add note</button>
                        )}
                      </div>
                      <div style={{ fontSize:'0.75rem', color:'#555' }}>
                        ♥ {post.likes?.toLocaleString()}
                      </div>
                      <button style={{
                        background:'transparent', border:'1px solid #2a2a2a',
                        borderRadius:'8px', padding:'0.3rem 0.65rem',
                        color:'#555', fontSize:'0.72rem', cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif",
                      }}>Move</button>
                      <button style={{
                        background:'transparent', border:'1px solid rgba(201,111,111,0.2)',
                        borderRadius:'8px', padding:'0.3rem 0.65rem',
                        color:'#c96f6f', fontSize:'0.72rem', cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif",
                      }}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width:'260px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        {/* Stats */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem' }}>
            Your saves
          </div>
          {[
            { label:'Total saved', value: allSavedPosts.length },
            { label:'Collections', value: collectionsData.length },
            { label:'Public collections', value: collectionsData.filter(c => c.privacy === 'public').length },
            { label:'With notes', value: allSavedPosts.filter(p => p.note).length },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.45rem 0',
              borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
            }}>
              <span style={{ fontSize:'0.78rem', color:'#666' }}>{stat.label}</span>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'1.1rem', fontWeight:600, color:'#f0ede8',
              }}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Inspira improvements */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#e8c97e', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem' }}>
            ✦ Collections improvements
          </div>
          {[
            ['📁', 'Named collections with descriptions'],
            ['📝', 'Add notes to saved posts'],
            ['🔍', 'Search within saves'],
            ['🌐', 'Share public collections'],
            ['⊞', 'Grid or list view'],
            ['↕', 'Sort by recent, oldest, popular'],
            ['📊', '2x2 preview covers'],
            ['🚫', 'Instagram lumps everything together'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display:'flex', gap:'0.6rem', alignItems:'flex-start',
              marginBottom:'0.5rem',
            }}>
              <span style={{ fontSize:'0.8rem', flexShrink:0 }}>{icon}</span>
              <span style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Quick add */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{ fontSize:'0.65rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.85rem' }}>
            Recently saved
          </div>
          {allSavedPosts.slice(0,4).map((post, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:'0.65rem',
              padding:'0.45rem 0',
              borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{
                width:'32px', height:'32px', borderRadius:'6px',
                background: post.bg, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'0.9rem', flexShrink:0,
              }}>{post.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.75rem', color:'#888', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  @{post.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* New collection modal */}
      {showNewCollection && (
        <div style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.85)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:100, backdropFilter:'blur(12px)',
        }}
          onClick={() => setShowNewCollection(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'20px', padding:'2rem', width:'400px',
            }}
          >
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:'1.5rem', fontWeight:600, color:'#f0ede8', marginBottom:'1.5rem',
            }}>New collection</h3>

            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>Name</div>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Photography Inspo"
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

            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.35rem' }}>Description (optional)</div>
              <input
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="What's this collection for?"
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

            <div style={{ marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#555', marginBottom:'0.5rem' }}>Privacy</div>
              <div style={{ display:'flex', gap:'0.75rem' }}>
                {[
                  { id:'private', label:'🔒 Private', desc:'Only you can see' },
                  { id:'public', label:'🌐 Public', desc:'Anyone can view' },
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setNewPrivacy(opt.id)}
                    style={{
                      flex:1, padding:'0.75rem',
                      background: newPrivacy === opt.id ? 'rgba(232,201,126,0.08)' : '#1a1a1a',
                      border: newPrivacy === opt.id ? '1px solid rgba(232,201,126,0.3)' : '1px solid #2a2a2a',
                      borderRadius:'10px', cursor:'pointer', textAlign:'center',
                      transition:'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize:'0.82rem', color: newPrivacy === opt.id ? '#e8c97e' : '#888', fontWeight:500 }}>{opt.label}</div>
                    <div style={{ fontSize:'0.68rem', color:'#555', marginTop:'2px' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button
                onClick={() => setShowNewCollection(false)}
                style={{
                  flex:1, background:'transparent',
                  border:'1px solid #2a2a2a', borderRadius:'100px',
                  padding:'0.7rem', color:'#555', fontSize:'0.85rem',
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                }}
              >Cancel</button>
              <button
                onClick={() => setShowNewCollection(false)}
                style={{
                  flex:1, background: newName ? '#e8c97e' : '#2a2a2a',
                  color: newName ? '#0a0a0a' : '#555',
                  border:'none', borderRadius:'100px', padding:'0.7rem',
                  fontSize:'0.85rem', fontWeight:600,
                  cursor: newName ? 'pointer' : 'default',
                  fontFamily:"'Outfit',sans-serif",
                }}
              >Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}