import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { exploreCategories, explorePosts, trendingTopics, suggestedCreators } from '../constants/data'

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)

  const filtered = explorePosts.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesSearch = search === '' || p.user.includes(search.toLowerCase()) || p.category.includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatNum = n => {
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n/1000).toFixed(1) + 'k'
    return n
  }

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <main style={{ flex:1, padding:'2rem 2vw', borderRight:'1px solid #2a2a2a', overflowY:'auto' }}>

        {/* Search bar — full width, prominent */}
        <div style={{ marginBottom:'1.5rem', position:'relative' }}>
          <div style={{
            position:'relative',
            border: searchFocused ? '1px solid #e8c97e' : '1px solid #2a2a2a',
            borderRadius:'14px', transition:'border-color 0.2s',
            background:'#111',
          }}>
            <span style={{
              position:'absolute', left:'1.1rem', top:'50%',
              transform:'translateY(-50%)', color:'#555', fontSize:'1rem',
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search creators, tags, aesthetics..."
              style={{
                width:'100%', background:'transparent', border:'none',
                padding:'0.9rem 1rem 0.9rem 2.8rem',
                color:'#f0ede8', fontSize:'0.95rem',
                fontFamily:"'Outfit',sans-serif", outline:'none',
                boxSizing:'border-box',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{
                position:'absolute', right:'1rem', top:'50%',
                transform:'translateY(-50%)', background:'transparent',
                border:'none', color:'#555', cursor:'pointer', fontSize:'1rem',
              }}>✕</button>
            )}
          </div>

          {/* Search suggestions — Inspira fix: Instagram search is terrible */}
          {searchFocused && !search && (
            <div style={{
              position:'absolute', top:'calc(100% + 8px)', left:0, right:0,
              background:'#111', border:'1px solid #2a2a2a',
              borderRadius:'14px', padding:'1rem', zIndex:50,
            }}>
              <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                Recent searches
              </div>
              {['golden hour photography', 'urban architecture', 'analog film'].map(s => (
                <div key={s} onClick={() => setSearch(s)} style={{
                  display:'flex', alignItems:'center', gap:'0.75rem',
                  padding:'0.5rem 0', cursor:'pointer', borderRadius:'8px',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <span style={{ color:'#555', fontSize:'0.85rem' }}>🕐</span>
                  <span style={{ fontSize:'0.85rem', color:'#888' }}>{s}</span>
                </div>
              ))}
              <div style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0.75rem 0' }}>
                Trending now
              </div>
              {trendingTopics.slice(0,3).map(t => (
                <div key={t.tag} onClick={() => setSearch(t.tag)} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'0.5rem 0.5rem', cursor:'pointer', borderRadius:'8px',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <span style={{ fontSize:'0.85rem', color:'#e8c97e' }}>{t.tag}</span>
                  <span style={{ fontSize:'0.72rem', color:'#555' }}>{t.posts} posts</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category chips — Instagram has no proper category filtering */}
        <div style={{
          display:'flex', gap:'0.5rem', marginBottom:'1.5rem',
          overflowX:'auto', paddingBottom:'0.25rem',
        }}>
          {exploreCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? '#e8c97e' : '#111',
                color: activeCategory === cat.id ? '#0a0a0a' : '#555',
                border: activeCategory === cat.id ? 'none' : '1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.4rem 1rem',
                fontSize:'0.78rem', fontWeight: activeCategory === cat.id ? 600 : 400,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                display:'flex', alignItems:'center', gap:'0.4rem',
                flexShrink:0, transition:'all 0.2s', whiteSpace:'nowrap',
              }}
              onMouseEnter={e => { if (activeCategory !== cat.id) e.currentTarget.style.borderColor='#555' }}
              onMouseLeave={e => { if (activeCategory !== cat.id) e.currentTarget.style.borderColor='#2a2a2a' }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Inspira advantage */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'12px', padding:'0.75rem 1rem',
          marginBottom:'1.5rem',
          display:'flex', alignItems:'center', gap:'0.75rem',
        }}>
          <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
          <p style={{ fontSize:'0.75rem', color:'#555', margin:0 }}>
            Instagram shows you what the algorithm wants. Inspira lets you explore by category, trending tags, and creators you actually care about.
          </p>
        </div>

        {/* Results count */}
        <div style={{
          fontSize:'0.75rem', color:'#555', marginBottom:'1rem',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <span>{filtered.length} posts {activeCategory !== 'all' ? `in ${activeCategory}` : ''}</span>
          <div style={{ display:'flex', gap:'0.5rem' }}>
            {['⊞ Grid', '☰ List'].map((view, i) => (
              <button key={view} style={{
                background: i === 0 ? '#111' : 'transparent',
                border: i === 0 ? '1px solid #2a2a2a' : '1px solid transparent',
                borderRadius:'6px', padding:'0.25rem 0.6rem',
                color: i === 0 ? '#f0ede8' : '#555',
                fontSize:'0.72rem', cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>{view}</button>
            ))}
          </div>
        </div>

        {/* Masonry-style grid */}
        <div style={{
          columns:'3', columnGap:'3px',
          marginBottom:'2rem',
        }}>
          {filtered.map(post => (
            <div
              key={post.id}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              style={{
                breakInside:'avoid', marginBottom:'3px',
                position:'relative', cursor:'pointer',
                borderRadius:'4px', overflow:'hidden',
              }}
            >
              <div style={{
                background: post.bg,
                height: post.size === 'large' ? '320px' : '200px',
                display:'flex', alignItems:'center',
                justifyContent:'center', fontSize: post.size === 'large' ? '4rem' : '2.5rem',
                transition:'transform 0.2s',
                transform: hoveredPost === post.id ? 'scale(1.02)' : 'scale(1)',
              }}>
                {post.emoji}
              </div>

              {/* Hover overlay */}
              {hoveredPost === post.id && (
                <div style={{
                  position:'absolute', inset:0,
                  background:'rgba(10,10,10,0.65)',
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  gap:'0.5rem',
                }}>
                  <div style={{ display:'flex', gap:'1.5rem' }}>
                    <span style={{ color:'white', fontSize:'0.88rem', fontWeight:600 }}>
                      ♥ {formatNum(post.likes)}
                    </span>
                    <span style={{ color:'white', fontSize:'0.88rem', fontWeight:600 }}>
                      💬 {post.comments}
                    </span>
                  </div>
                  <span style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.6)' }}>
                    @{post.user}
                  </span>
                </div>
              )}

              {/* Large post label */}
              {post.size === 'large' && (
                <div style={{
                  position:'absolute', top:'8px', right:'8px',
                  background:'rgba(10,10,10,0.7)', borderRadius:'4px',
                  padding:'0.15rem 0.4rem', fontSize:'0.6rem', color:'#888',
                }}>⊞</div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'4rem 0', color:'#555' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔍</div>
            <p style={{ fontSize:'0.9rem' }}>No posts found for "{search}"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all') }} style={{
              background:'transparent', border:'1px solid #2a2a2a',
              borderRadius:'100px', padding:'0.5rem 1.25rem',
              color:'#888', fontSize:'0.82rem', cursor:'pointer',
              fontFamily:"'Outfit',sans-serif", marginTop:'1rem',
            }}>Clear filters</button>
          </div>
        )}
      </main>

      {/* Right panel */}
      <aside style={{
        width:'300px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.5rem',
        overflowY:'auto',
      }}>
        {/* Trending topics — Inspira shows real trends with data */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#888', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem',
          }}>🔥 Trending now</div>
          {trendingTopics.map((topic, i) => (
            <div key={topic.tag} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.6rem 0',
              borderBottom: i < trendingTopics.length - 1 ? '1px solid #1a1a1a' : 'none',
              cursor:'pointer',
            }}
              onClick={() => setSearch(topic.tag)}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div>
                <div style={{ fontSize:'0.85rem', color:'#e8c97e', fontWeight:500 }}>
                  {topic.tag}
                </div>
                <div style={{ fontSize:'0.7rem', color:'#555', marginTop:'2px' }}>
                  {topic.posts} posts
                </div>
              </div>
              <span style={{
                fontSize:'0.72rem', color:'#6fcf97', fontWeight:500,
                background:'rgba(111,207,151,0.1)', padding:'0.2rem 0.5rem',
                borderRadius:'100px',
              }}>{topic.growth}</span>
            </div>
          ))}
        </div>

        {/* Suggested creators */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#888', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem',
          }}>Creators to discover</div>
          {suggestedCreators.map((creator, i) => (
            <div key={creator.username} style={{
              display:'flex', alignItems:'center', gap:'0.75rem',
              padding:'0.65rem 0',
              borderBottom: i < suggestedCreators.length - 1 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{
                width:'42px', height:'42px', borderRadius:'50%',
                background: creator.gradient, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'0.72rem', fontWeight:700, color:'#f0ede8', flexShrink:0,
              }}>{creator.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.82rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {creator.name}
                </div>
                <div style={{ fontSize:'0.7rem', color:'#555' }}>
                  {creator.category} · {creator.followers}
                </div>
              </div>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'100px', padding:'0.3rem 0.75rem',
                color:'#e8c97e', fontSize:'0.72rem', fontWeight:500,
                cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                flexShrink:0, transition:'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background='rgba(232,201,126,0.1)'; e.target.style.borderColor='#e8c97e' }}
                onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='#2a2a2a' }}
              >Follow</button>
            </div>
          ))}
        </div>

        {/* Inspira vs Instagram */}
        <div style={{
          background:'rgba(232,201,126,0.04)',
          border:'1px solid rgba(232,201,126,0.1)',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#e8c97e', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.85rem',
          }}>✦ Explore improvements</div>
          {[
            ['🔍', 'Real search with suggestions'],
            ['🏷', 'Filter by category'],
            ['📈', 'Trending with growth data'],
            ['👤', 'Discover by creator type'],
            ['🚫', 'No promoted posts in explore'],
            ['✦', 'Algorithm-free browsing mode'],
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