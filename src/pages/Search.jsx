import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { searchUsers, searchTags, searchPlaces, explorePosts } from '../constants/data'

const TABS = ['Top', 'People', 'Tags', 'Places']

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Top')
  const [focused, setFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState([
    'golden hour photography',
    'nisha.creates',
    '#urbanminimal',
    'Hyderabad',
  ])
  const [followStates, setFollowStates] = useState(
    Object.fromEntries(searchUsers.map(u => [u.id, u.following]))
  )
  const navigate = useNavigate()

  const toggleFollow = (id) => {
    setFollowStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const removeRecent = (item) => {
    setRecentSearches(prev => prev.filter(s => s !== item))
  }

  const addRecent = (item) => {
    setRecentSearches(prev => [item, ...prev.filter(s => s !== item)].slice(0, 8))
  }

  const filteredUsers = searchUsers.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.category.toLowerCase().includes(query.toLowerCase())
  )

  const filteredTags = searchTags.filter(t =>
    t.tag.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  )

  const filteredPlaces = searchPlaces.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const showResults = query.length > 0
  const showEmpty = showResults && filteredUsers.length === 0 && filteredTags.length === 0 && filteredPlaces.length === 0

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
        <div style={{ maxWidth:'680px', margin:'0 auto' }}>

          {/* Header */}
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:'1.8rem', fontWeight:600, color:'#f0ede8',
            marginBottom:'1.5rem',
          }}>Search</h1>

          {/* Search input */}
          <div style={{
            position:'relative', marginBottom:'1.5rem',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:'0.75rem',
              background:'#111', border: focused ? '1px solid #e8c97e' : '1px solid #2a2a2a',
              borderRadius:'14px', padding:'0.85rem 1.1rem',
              transition:'border-color 0.2s',
            }}>
              <span style={{ color:'#555', fontSize:'1rem', flexShrink:0 }}>🔍</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search people, tags, places..."
                style={{
                  flex:1, background:'transparent', border:'none',
                  color:'#f0ede8', fontSize:'0.95rem',
                  fontFamily:"'Outfit',sans-serif", outline:'none',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{
                  background:'#2a2a2a', border:'none', borderRadius:'50%',
                  width:'20px', height:'20px', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  color:'#888', fontSize:'0.7rem', cursor:'pointer', flexShrink:0,
                }}>✕</button>
              )}
            </div>

            {/* Dropdown — recent + suggestions when focused and no query */}
            {focused && !query && (
              <div style={{
                position:'absolute', top:'calc(100% + 8px)', left:0, right:0,
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'14px', padding:'1rem', zIndex:50,
                boxShadow:'0 20px 40px rgba(0,0,0,0.5)',
              }}>
                {/* Recent searches — Inspira lets you manage these, Instagram doesn't */}
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:'0.75rem',
                }}>
                  <span style={{ fontSize:'0.68rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                    Recent
                  </span>
                  <button
                    onClick={() => setRecentSearches([])}
                    style={{
                      background:'transparent', border:'none',
                      color:'#e8c97e', fontSize:'0.72rem', cursor:'pointer',
                      fontFamily:"'Outfit',sans-serif",
                    }}
                  >Clear all</button>
                </div>

                {recentSearches.length === 0 ? (
                  <p style={{ fontSize:'0.82rem', color:'#555', textAlign:'center', padding:'1rem 0' }}>
                    No recent searches
                  </p>
                ) : (
                  recentSearches.map(s => (
                    <div key={s} style={{
                      display:'flex', alignItems:'center', gap:'0.75rem',
                      padding:'0.55rem 0.5rem', borderRadius:'8px', cursor:'pointer',
                      transition:'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <span style={{ color:'#555', fontSize:'0.85rem', flexShrink:0 }}>🕐</span>
                      <span
                        onClick={() => { setQuery(s); addRecent(s) }}
                        style={{ flex:1, fontSize:'0.85rem', color:'#888' }}
                      >{s}</span>
                      <button
                        onClick={e => { e.stopPropagation(); removeRecent(s) }}
                        style={{
                          background:'transparent', border:'none',
                          color:'#555', cursor:'pointer', fontSize:'0.75rem',
                          padding:'0.2rem 0.4rem', borderRadius:'4px',
                        }}
                        onMouseEnter={e => e.target.style.color='#888'}
                        onMouseLeave={e => e.target.style.color='#555'}
                      >✕</button>
                    </div>
                  ))
                )}

                {/* Inspira privacy note */}
                <div style={{
                  marginTop:'0.75rem', padding:'0.6rem 0.75rem',
                  background:'rgba(232,201,126,0.05)',
                  border:'1px solid rgba(232,201,126,0.1)',
                  borderRadius:'8px',
                  display:'flex', alignItems:'center', gap:'0.5rem',
                }}>
                  <span style={{ color:'#e8c97e', fontSize:'0.75rem' }}>✦</span>
                  <span style={{ fontSize:'0.68rem', color:'#555', lineHeight:1.5 }}>
                    Your search history stays on your device. Inspira never uses it to target ads.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Filter tabs — only show when searching */}
          {showResults && (
            <div style={{
              display:'flex', borderBottom:'1px solid #2a2a2a',
              marginBottom:'1.5rem',
            }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background:'transparent', border:'none',
                  borderBottom: activeTab === tab ? '2px solid #e8c97e' : '2px solid transparent',
                  padding:'0.65rem 1.25rem', fontSize:'0.82rem',
                  color: activeTab === tab ? '#f0ede8' : '#555',
                  fontWeight: activeTab === tab ? 500 : 400,
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  marginBottom:'-1px', transition:'all 0.2s',
                }}>{tab}</button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div style={{ textAlign:'center', padding:'4rem 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔍</div>
              <p style={{ fontSize:'0.9rem', color:'#555' }}>
                No results for "<span style={{ color:'#f0ede8' }}>{query}</span>"
              </p>
              <p style={{ fontSize:'0.78rem', color:'#444', marginTop:'0.5rem' }}>
                Try searching for people, tags, or places
              </p>
            </div>
          )}

          {/* Default state — no search query */}
          {!showResults && (
            <div>
              {/* Inspira search advantage */}
              <div style={{
                background:'rgba(232,201,126,0.04)',
                border:'1px solid rgba(232,201,126,0.1)',
                borderRadius:'12px', padding:'0.85rem 1rem',
                marginBottom:'2rem',
                display:'flex', alignItems:'center', gap:'0.75rem',
              }}>
                <span style={{ color:'#e8c97e', flexShrink:0 }}>✦</span>
                <p style={{ fontSize:'0.75rem', color:'#555', margin:0, lineHeight:1.6 }}>
                  Instagram search pushes promoted accounts to the top. Inspira search is purely organic — no paid placement, ever.
                </p>
              </div>

              {/* Trending searches */}
              <div style={{ marginBottom:'2rem' }}>
                <div style={{
                  fontSize:'0.72rem', color:'#555', fontWeight:500,
                  textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem',
                }}>Trending searches</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                  {['#goldenhour', '#urbanminimal', 'nisha.creates', '#analogfilm', 'architecture', '#slowliving', 'astrophotography', '#streetphotography'].map(item => (
                    <button
                      key={item}
                      onClick={() => { setQuery(item); addRecent(item) }}
                      style={{
                        background:'#111', border:'1px solid #2a2a2a',
                        borderRadius:'100px', padding:'0.4rem 1rem',
                        color: item.startsWith('#') ? '#e8c97e' : '#888',
                        fontSize:'0.8rem', cursor:'pointer',
                        fontFamily:"'Outfit',sans-serif", transition:'all 0.2s',
                      }}
                      onMouseEnter={e => { e.target.style.borderColor='#555'; e.target.style.color='#f0ede8' }}
                      onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color = item.startsWith('#') ? '#e8c97e' : '#888' }}
                    >{item}</button>
                  ))}
                </div>
              </div>

              {/* Suggested people */}
              <div>
                <div style={{
                  fontSize:'0.72rem', color:'#555', fontWeight:500,
                  textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem',
                }}>People you might like</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                  {searchUsers.slice(0,5).map(user => (
                    <div key={user.id} style={{
                      display:'flex', alignItems:'center', gap:'0.85rem',
                      padding:'0.75rem 0.85rem', borderRadius:'12px',
                      transition:'background 0.15s', cursor:'pointer',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background='#111'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >
                      <div style={{
                        width:'44px', height:'44px', borderRadius:'50%',
                        background: user.gradient, display:'flex',
                        alignItems:'center', justifyContent:'center',
                        fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                      }}>{user.avatar}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                          <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>
                            {user.name}
                          </span>
                          {user.verified && (
                            <span style={{
                              background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                              width:'14px', height:'14px', display:'flex',
                              alignItems:'center', justifyContent:'center',
                              fontSize:'0.5rem', fontWeight:700, flexShrink:0,
                            }}>✓</span>
                          )}
                        </div>
                        <div style={{ fontSize:'0.75rem', color:'#555', marginTop:'2px' }}>
                          @{user.username} · {user.followers} followers · {user.category}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFollow(user.id)}
                        style={{
                          background: followStates[user.id] ? 'transparent' : '#e8c97e',
                          color: followStates[user.id] ? '#555' : '#0a0a0a',
                          border: followStates[user.id] ? '1px solid #2a2a2a' : 'none',
                          borderRadius:'100px', padding:'0.35rem 1rem',
                          fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
                          fontFamily:"'Outfit',sans-serif", flexShrink:0,
                          transition:'all 0.2s',
                        }}
                      >{followStates[user.id] ? 'Following' : 'Follow'}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search results */}
          {showResults && !showEmpty && (
            <div>
              {/* TOP tab */}
              {activeTab === 'Top' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                  {/* People results */}
                  {filteredUsers.length > 0 && (
                    <div>
                      <div style={{
                        fontSize:'0.72rem', color:'#555', fontWeight:500,
                        textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem',
                      }}>People</div>
                      {filteredUsers.slice(0,3).map(user => (
                        <UserRow key={user.id} user={user} followed={followStates[user.id]} onFollow={() => toggleFollow(user.id)} />
                      ))}
                    </div>
                  )}

                  {/* Tag results */}
                  {filteredTags.length > 0 && (
                    <div>
                      <div style={{
                        fontSize:'0.72rem', color:'#555', fontWeight:500,
                        textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem',
                      }}>Tags</div>
                      {filteredTags.slice(0,3).map(tag => (
                        <TagRow key={tag.tag} tag={tag} onClick={() => addRecent(tag.tag)} />
                      ))}
                    </div>
                  )}

                  {/* Place results */}
                  {filteredPlaces.length > 0 && (
                    <div>
                      <div style={{
                        fontSize:'0.72rem', color:'#555', fontWeight:500,
                        textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem',
                      }}>Places</div>
                      {filteredPlaces.map(place => (
                        <PlaceRow key={place.name} place={place} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PEOPLE tab */}
              {activeTab === 'People' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                  {filteredUsers.length === 0 ? (
                    <EmptyTab label="people" query={query} />
                  ) : (
                    filteredUsers.map(user => (
                      <UserRow key={user.id} user={user} followed={followStates[user.id]} onFollow={() => toggleFollow(user.id)} />
                    ))
                  )}
                </div>
              )}

              {/* TAGS tab */}
              {activeTab === 'Tags' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                  {filteredTags.length === 0 ? (
                    <EmptyTab label="tags" query={query} />
                  ) : (
                    filteredTags.map(tag => (
                      <TagRow key={tag.tag} tag={tag} onClick={() => addRecent(tag.tag)} />
                    ))
                  )}
                </div>
              )}

              {/* PLACES tab */}
              {activeTab === 'Places' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                  {filteredPlaces.length === 0 ? (
                    <EmptyTab label="places" query={query} />
                  ) : (
                    filteredPlaces.map(place => (
                      <PlaceRow key={place.name} place={place} />
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside style={{
        width:'280px', flexShrink:0, padding:'2rem 1.5rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        overflowY:'auto',
      }}>
        {/* Search tips */}
        <div style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'14px', padding:'1.25rem',
        }}>
          <div style={{
            fontSize:'0.65rem', color:'#888', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1rem',
          }}>Search tips</div>
          {[
            { icon:'@', tip:'Search @username to find people' },
            { icon:'#', tip:'Search #tag to explore topics' },
            { icon:'📍', tip:'Search a city to find local creators' },
            { icon:'✦', tip:'Results are purely organic — no promoted accounts' },
          ].map(({ icon, tip }) => (
            <div key={tip} style={{
              display:'flex', gap:'0.65rem', alignItems:'flex-start',
              marginBottom:'0.65rem',
            }}>
              <span style={{
                fontSize:'0.75rem', color:'#e8c97e',
                background:'rgba(232,201,126,0.1)',
                width:'22px', height:'22px', borderRadius:'6px',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>{icon}</span>
              <span style={{ fontSize:'0.75rem', color:'#666', lineHeight:1.5 }}>{tip}</span>
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
          }}>✦ Search improvements</div>
          {[
            ['🚫', 'No paid placement in results'],
            ['🔒', 'Search history stays on device'],
            ['🏷', 'Filter by people, tags, places'],
            ['📍', 'Real location-based search'],
            ['🧹', 'Manage your search history'],
            ['📊', 'See post counts on tags'],
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

// Reusable row components
function UserRow({ user, followed, onFollow }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'0.85rem',
      padding:'0.75rem 0.85rem', borderRadius:'12px',
      transition:'background 0.15s', cursor:'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.background='#111'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      <div style={{
        width:'44px', height:'44px', borderRadius:'50%',
        background: user.gradient, display:'flex',
        alignItems:'center', justifyContent:'center',
        fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
      }}>{user.avatar}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
          <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {user.name}
          </span>
          {user.verified && (
            <span style={{
              background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
              width:'14px', height:'14px', display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:'0.5rem', fontWeight:700, flexShrink:0,
            }}>✓</span>
          )}
        </div>
        <div style={{ fontSize:'0.75rem', color:'#555', marginTop:'2px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          @{user.username} · {user.followers} followers · {user.category}
        </div>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onFollow() }}
        style={{
          background: followed ? 'transparent' : '#e8c97e',
          color: followed ? '#555' : '#0a0a0a',
          border: followed ? '1px solid #2a2a2a' : 'none',
          borderRadius:'100px', padding:'0.35rem 1rem',
          fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
          fontFamily:"'Outfit',sans-serif", flexShrink:0,
          transition:'all 0.2s',
        }}
      >{followed ? 'Following' : 'Follow'}</button>
    </div>
  )
}

function TagRow({ tag, onClick }) {
  return (
    <div onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:'0.85rem',
      padding:'0.75rem 0.85rem', borderRadius:'12px',
      transition:'background 0.15s', cursor:'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.background='#111'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      <div style={{
        width:'44px', height:'44px', borderRadius:'50%',
        background:'#1a1a1a', border:'1px solid #2a2a2a',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.1rem', flexShrink:0,
      }}>#</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:'0.88rem', fontWeight:500, color:'#e8c97e' }}>{tag.tag}</div>
        <div style={{ fontSize:'0.75rem', color:'#555', marginTop:'2px' }}>
          {tag.posts} posts · {tag.category}
        </div>
      </div>
      <span style={{ fontSize:'0.72rem', color:'#555' }}>→</span>
    </div>
  )
}

function PlaceRow({ place }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'0.85rem',
      padding:'0.75rem 0.85rem', borderRadius:'12px',
      transition:'background 0.15s', cursor:'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.background='#111'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      <div style={{
        width:'44px', height:'44px', borderRadius:'50%',
        background:'#1a1a1a', border:'1px solid #2a2a2a',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.3rem', flexShrink:0,
      }}>{place.emoji}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>{place.name}</div>
        <div style={{ fontSize:'0.75rem', color:'#555', marginTop:'2px' }}>
          {place.type} · {place.posts} posts
        </div>
      </div>
      <span style={{ fontSize:'0.72rem', color:'#555' }}>→</span>
    </div>
  )
}

function EmptyTab({ label, query }) {
  return (
    <div style={{ textAlign:'center', padding:'3rem 0', color:'#555' }}>
      <div style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>🔍</div>
      <p style={{ fontSize:'0.85rem' }}>No {label} found for "<span style={{ color:'#f0ede8' }}>{query}</span>"</p>
    </div>
  )
}