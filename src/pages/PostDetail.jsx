import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { getPostById, toggleLike, addComment, deleteComment } from '../config/api'

export default function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [sortBy, setSortBy] = useState('top')
  const [expandedReplies, setExpandedReplies] = useState({})
  const [showReach, setShowReach] = useState(false)
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await getPostById(postId)
        if (res.data.success) {
          const postData = res.data.post
          setPost(postData)
          setComments(postData.comments || [])
          setLikes(postData.likes?.length || 0)
          // Check if current user liked the post
          const currentUserId = localStorage.getItem('userId')
          setLiked(postData.likes?.includes(currentUserId))
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Post not found')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId])

  const toggleLike = async () => {
    try {
      const res = await toggleLike(postId)
      if (res.success) {
        setLiked(res.liked)
        setLikes(res.likes)
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

  const submitComment = async () => {
    if (!commentText.trim()) return
    try {
      const res = await addComment(postId, commentText)
      if (res.success) {
        setPost(res.post)
        setComments(res.post.comments || [])
        setCommentText('')
        setReplyingTo(null)
      }
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    if (sortBy === 'top') return b.likes - a.likes
    if (sortBy === 'recent') return a.time === 'just now' ? -1 : 1
    return 0
  })

  if (loading) {
    return (
      <div style={{
        minHeight:'100vh', background:'#0a0a0a',
        display:'flex', justifyContent:'center', alignItems:'center',
        color:'#fff', fontSize:'22px'
      }}>
        Loading Post...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight:'100vh', background:'#0a0a0a',
        display:'flex', justifyContent:'center', alignItems:'center',
        color:'#ff5c5c', fontSize:'20px'
      }}>
        {error}
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{
        minHeight:'100vh', background:'#0a0a0a',
        display:'flex', justifyContent:'center', alignItems:'center',
        color:'#666', fontSize:'20px'
      }}>
        Post not found
      </div>
    )
  }

  const filteredComments = sortedComments.filter(c => {
    if (filterBy === 'all') return true
    if (filterBy === 'creator') return c.isCreator || c.replies.some(r => r.isCreator)
    if (filterBy === 'verified') return c.verified
    return true
  })

  return (
    <div style={{
      display:'flex', minHeight:'100vh',
      background:'#0a0a0a', fontFamily:"'Outfit',sans-serif",
    }}>
      <Sidebar />

      <div style={{
        flex:1, display:'grid',
        gridTemplateColumns:'1fr 1fr',
        maxHeight:'100vh', overflow:'hidden',
      }}>

        {/* Left — Post */}
        <div style={{
          borderRight:'1px solid #2a2a2a',
          display:'flex', flexDirection:'column',
          overflowY:'auto',
        }}>
          {/* Back button */}
          <div style={{
            padding:'1rem 1.5rem', borderBottom:'1px solid #2a2a2a',
            display:'flex', alignItems:'center', gap:'0.75rem',
            position:'sticky', top:0, background:'#0a0a0a', zIndex:10,
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background:'transparent', border:'none',
                color:'#555', cursor:'pointer', fontSize:'1.1rem', padding:0,
              }}
            >←</button>
            <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>Post</span>
          </div>

          {/* Post header */}
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between', padding:'1rem 1.5rem',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <div style={{
                width:'42px', height:'42px', borderRadius:'50%',
                background: post.user.gradient, display:'flex',
                alignItems:'center', justifyContent:'center',
                fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
              }}>{post.user.avatar}</div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                  <span style={{ fontSize:'0.9rem', fontWeight:600, color:'#f0ede8' }}>
                    {post.user.name}
                  </span>
                  {post.user.verified && (
                    <span style={{
                      background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                      width:'15px', height:'15px', display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'0.5rem', fontWeight:700,
                    }}>✓</span>
                  )}
                </div>
                <div style={{ fontSize:'0.72rem', color:'#555' }}>
                  @{post.user.username} · {post.postedAt}
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button style={{
                background:'#e8c97e', color:'#0a0a0a', border:'none',
                borderRadius:'100px', padding:'0.4rem 1rem',
                fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",
              }}>Follow</button>
              <button style={{
                background:'transparent', border:'1px solid #2a2a2a',
                borderRadius:'8px', padding:'0.4rem 0.65rem',
                color:'#555', cursor:'pointer', fontSize:'0.9rem',
              }}>⋯</button>
            </div>
          </div>

          {/* Post image */}
          <div style={{
            width:'100%', aspectRatio:'1',
            background: post.bg, display:'flex',
            alignItems:'center', justifyContent:'center',
            fontSize:'7rem', position:'relative',
          }}>
            {post.emoji}

            {/* Reach badge — Inspira exclusive */}
            <div
              onClick={() => setShowReach(!showReach)}
              style={{
                position:'absolute', top:'12px', right:'12px',
                background:'rgba(10,10,10,0.75)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(232,201,126,0.25)',
                borderRadius:'100px', padding:'0.3rem 0.7rem',
                fontSize:'0.7rem', color:'#e8c97e', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'0.35rem',
              }}
            >👁 {post.reach}</div>

            {showReach && (
              <div style={{
                position:'absolute', top:'44px', right:'12px',
                background:'#111', border:'1px solid #2a2a2a',
                borderRadius:'12px', padding:'0.85rem 1rem',
                fontSize:'0.75rem', color:'#888', maxWidth:'200px', zIndex:10,
              }}>
                <div style={{ color:'#e8c97e', fontWeight:600, marginBottom:'0.3rem' }}>✦ Reach</div>
                {post.reach} unique accounts saw this post. Instagram never shows creators this number per post.
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ padding:'0.75rem 1.5rem 0' }}>
            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'0.75rem',
            }}>
              <div style={{ display:'flex', gap:'0.25rem' }}>
                <button onClick={toggleLike} style={{
                  background:'transparent', border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', gap:'0.4rem',
                  color: liked ? '#e8557a' : '#888', fontSize:'0.88rem',
                  fontFamily:"'Outfit',sans-serif", padding:'0.4rem 0.6rem',
                  borderRadius:'8px', transition:'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#111'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <span style={{ fontSize:'1.2rem' }}>{liked ? '♥' : '♡'}</span>
                  <span style={{ fontWeight: liked ? 600 : 400 }}>{likes.toLocaleString()}</span>
                </button>
                <button style={{
                  background:'transparent', border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', gap:'0.4rem',
                  color:'#888', fontSize:'0.88rem', fontFamily:"'Outfit',sans-serif",
                  padding:'0.4rem 0.6rem', borderRadius:'8px',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#111'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <span style={{ fontSize:'1.1rem' }}>💬</span>
                  <span>{comments.length}</span>
                </button>
                <button style={{
                  background:'transparent', border:'none', cursor:'pointer',
                  color:'#888', fontSize:'1.1rem', padding:'0.4rem 0.6rem', borderRadius:'8px',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#111'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >↗</button>
              </div>
              <button onClick={() => setSaved(!saved)} style={{
                background:'transparent', border:'none', cursor:'pointer',
                color: saved ? '#e8c97e' : '#888', fontSize:'1.1rem',
                padding:'0.4rem 0.6rem', borderRadius:'8px', transition:'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background='#111'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >{saved ? '★' : '☆'}</button>
            </div>

            {/* Caption */}
            <div style={{ marginBottom:'0.75rem' }}>
              <p style={{ fontSize:'0.88rem', color:'#f0ede8', lineHeight:1.65, margin:0 }}>
                <strong style={{ marginRight:'0.4rem' }}>{post.user.username}</strong>
                {post.caption.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < post.caption.split('\n').length - 1 && <br/>}</span>
                ))}
              </p>
            </div>

            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'0.75rem' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ fontSize:'0.78rem', color:'#e8c97e', cursor:'pointer' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Location */}
            {post.location && (
              <div style={{ fontSize:'0.75rem', color:'#555', marginBottom:'0.5rem' }}>
                📍 {post.location}
              </div>
            )}

            {/* Stats row */}
            <div style={{
              display:'flex', gap:'1.5rem', padding:'0.75rem 0',
              borderTop:'1px solid #1a1a1a', borderBottom:'1px solid #1a1a1a',
              marginBottom:'0.75rem',
            }}>
              {[
                { label:'Likes', value: likes.toLocaleString() },
                { label:'Comments', value: comments.length },
                { label:'Saves', value: post.saves },
                { label:'Shares', value: post.shares },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'1.1rem', fontWeight:600, color:'#f0ede8', lineHeight:1,
                  }}>{stat.value}</div>
                  <div style={{ fontSize:'0.65rem', color:'#555', marginTop:'1px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Comments */}
        <div style={{
          display:'flex', flexDirection:'column',
          maxHeight:'100vh', overflow:'hidden',
        }}>
          {/* Comments header */}
          <div style={{
            padding:'1rem 1.5rem', borderBottom:'1px solid #2a2a2a',
            position:'sticky', top:0, background:'#0a0a0a', zIndex:10,
          }}>
            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'0.75rem',
            }}>
              <span style={{ fontSize:'0.88rem', fontWeight:500, color:'#f0ede8' }}>
                Comments ({comments.length})
              </span>
              {/* Sort — Inspira lets you sort comments, Instagram doesn't */}
              <div style={{ display:'flex', gap:'0.4rem' }}>
                {['top','recent'].map(s => (
                  <button key={s} onClick={() => setSortBy(s)} style={{
                    background: sortBy === s ? 'rgba(232,201,126,0.1)' : 'transparent',
                    color: sortBy === s ? '#e8c97e' : '#555',
                    border: sortBy === s ? '1px solid rgba(232,201,126,0.2)' : '1px solid transparent',
                    borderRadius:'100px', padding:'0.25rem 0.65rem',
                    fontSize:'0.72rem', cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", textTransform:'capitalize',
                    transition:'all 0.2s',
                  }}>{s === 'top' ? '↑ Top' : '🕐 Recent'}</button>
                ))}
              </div>
            </div>

            {/* Filter chips — Inspira exclusive */}
            <div style={{ display:'flex', gap:'0.4rem' }}>
              {[
                { id:'all', label:'All' },
                { id:'creator', label:'Creator replies ✦' },
                { id:'verified', label:'Verified only' },
              ].map(f => (
                <button key={f.id} onClick={() => setFilterBy(f.id)} style={{
                  background: filterBy === f.id ? '#e8c97e' : '#111',
                  color: filterBy === f.id ? '#0a0a0a' : '#555',
                  border: filterBy === f.id ? 'none' : '1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.25rem 0.75rem',
                  fontSize:'0.72rem', fontWeight: filterBy === f.id ? 600 : 400,
                  cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                  transition:'all 0.2s', whiteSpace:'nowrap',
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          {/* Comments list */}
          <div style={{ flex:1, overflowY:'auto', padding:'1rem 1.5rem' }}>
            {filteredComments.map(comment => (
              <div key={comment.id} style={{ marginBottom:'1.25rem' }}>
                {/* Pinned badge */}
                {comment.pinned && (
                  <div style={{
                    display:'flex', alignItems:'center', gap:'0.4rem',
                    fontSize:'0.65rem', color:'#e8c97e', marginBottom:'0.35rem',
                  }}>
                    <span>📌</span> Pinned by {post.user.username}
                  </div>
                )}

                <div style={{
                  display:'flex', gap:'0.75rem',
                  background: comment.pinned ? 'rgba(232,201,126,0.04)' : 'transparent',
                  borderRadius:'10px', padding: comment.pinned ? '0.75rem' : '0',
                  border: comment.pinned ? '1px solid rgba(232,201,126,0.1)' : 'none',
                }}>
                  <div style={{
                    width:'34px', height:'34px', borderRadius:'50%',
                    background: comment.gradient, display:'flex',
                    alignItems:'center', justifyContent:'center',
                    fontSize:'0.65rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                  }}>{comment.avatar}</div>

                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', marginBottom:'0.25rem' }}>
                      <span style={{ fontSize:'0.85rem', fontWeight:600, color:'#f0ede8' }}>
                        {comment.user}
                      </span>
                      {comment.verified && (
                        <span style={{
                          background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                          width:'13px', height:'13px', display:'flex', alignItems:'center',
                          justifyContent:'center', fontSize:'0.45rem', fontWeight:700,
                        }}>✓</span>
                      )}
                      {comment.isCreator && (
                        <span style={{
                          background:'rgba(232,201,126,0.1)', color:'#e8c97e',
                          fontSize:'0.6rem', padding:'0.1rem 0.4rem',
                          borderRadius:'100px', border:'1px solid rgba(232,201,126,0.2)',
                        }}>Creator</span>
                      )}
                      <span style={{ fontSize:'0.68rem', color:'#444', marginLeft:'auto' }}>
                        {comment.time}
                      </span>
                    </div>

                    <p style={{ fontSize:'0.85rem', color:'#d0cdc8', lineHeight:1.6, margin:'0 0 0.5rem' }}>
                      {comment.text}
                    </p>

                    {/* Comment actions */}
                    <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                      <button style={{
                        background:'transparent', border:'none', cursor:'pointer',
                        display:'flex', alignItems:'center', gap:'0.3rem',
                        color:'#555', fontSize:'0.75rem',
                        fontFamily:"'Outfit',sans-serif", padding:0,
                        transition:'color 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.color='#888'}
                        onMouseLeave={e => e.currentTarget.style.color='#555'}
                      >
                        <span>♡</span> {comment.likes}
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        style={{
                          background:'transparent', border:'none', cursor:'pointer',
                          color: replyingTo === comment.id ? '#e8c97e' : '#555',
                          fontSize:'0.75rem', fontFamily:"'Outfit',sans-serif",
                          padding:0, transition:'color 0.2s',
                        }}
                      >Reply</button>
                      {comment.replies.length > 0 && (
                        <button
                          onClick={() => setExpandedReplies(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                          style={{
                            background:'transparent', border:'none', cursor:'pointer',
                            color:'#e8c97e', fontSize:'0.75rem',
                            fontFamily:"'Outfit',sans-serif", padding:0,
                          }}
                        >
                          {expandedReplies[comment.id] ? '▲' : '▼'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                        </button>
                      )}
                    </div>

                    {/* Reply input */}
                    {replyingTo === comment.id && (
                      <div style={{
                        display:'flex', gap:'0.5rem', marginTop:'0.75rem',
                        alignItems:'center',
                      }}>
                        <div style={{
                          width:'24px', height:'24px', borderRadius:'50%',
                          background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'0.5rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                        }}>You</div>
                        <input
                          placeholder={`Reply to @${comment.user}...`}
                          autoFocus
                          style={{
                            flex:1, background:'#111', border:'1px solid #2a2a2a',
                            borderRadius:'100px', padding:'0.5rem 0.85rem',
                            color:'#f0ede8', fontSize:'0.78rem',
                            fontFamily:"'Outfit',sans-serif", outline:'none',
                          }}
                          onFocus={e => e.target.style.borderColor='#e8c97e'}
                          onBlur={e => e.target.style.borderColor='#2a2a2a'}
                          onKeyDown={e => { if (e.key === 'Enter') { setReplyingTo(null) } }}
                        />
                      </div>
                    )}

                    {/* Threaded replies — Inspira has proper threading, Instagram doesn't */}
                    {expandedReplies[comment.id] && comment.replies.length > 0 && (
                      <div style={{
                        marginTop:'0.75rem', paddingLeft:'0.75rem',
                        borderLeft:'2px solid #2a2a2a',
                        display:'flex', flexDirection:'column', gap:'0.75rem',
                      }}>
                        {comment.replies.map(reply => (
                          <div key={reply.id} style={{ display:'flex', gap:'0.6rem' }}>
                            <div style={{
                              width:'28px', height:'28px', borderRadius:'50%',
                              background: reply.gradient, display:'flex',
                              alignItems:'center', justifyContent:'center',
                              fontSize:'0.55rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
                            }}>{reply.avatar}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ display:'flex', alignItems:'center', gap:'0.35rem', marginBottom:'0.2rem' }}>
                                <span style={{ fontSize:'0.8rem', fontWeight:600, color:'#f0ede8' }}>
                                  {reply.user}
                                </span>
                                {reply.verified && (
                                  <span style={{ background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%', width:'12px', height:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.4rem', fontWeight:700 }}>✓</span>
                                )}
                                {reply.isCreator && (
                                  <span style={{ background:'rgba(232,201,126,0.1)', color:'#e8c97e', fontSize:'0.6rem', padding:'0.05rem 0.35rem', borderRadius:'100px', border:'1px solid rgba(232,201,126,0.2)' }}>Creator</span>
                                )}
                                <span style={{ fontSize:'0.65rem', color:'#444', marginLeft:'auto' }}>{reply.time}</span>
                              </div>
                              <p style={{ fontSize:'0.82rem', color:'#d0cdc8', lineHeight:1.6, margin:'0 0 0.3rem' }}>
                                {reply.text}
                              </p>
                              <button style={{
                                background:'transparent', border:'none', cursor:'pointer',
                                color:'#555', fontSize:'0.72rem',
                                fontFamily:"'Outfit',sans-serif", padding:0,
                                display:'flex', alignItems:'center', gap:'0.3rem',
                              }}>♡ {reply.likes}</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Inspira comment moderation note */}
            <div style={{
              background:'rgba(232,201,126,0.04)',
              border:'1px solid rgba(232,201,126,0.1)',
              borderRadius:'10px', padding:'0.75rem 1rem',
              fontSize:'0.72rem', color:'#555', lineHeight:1.6,
              marginTop:'0.5rem',
            }}>
              ✦ Inspira gives creators full comment moderation — pin, filter by type, sort by top or recent. Instagram has none of this.
            </div>
          </div>

          {/* Comment input */}
          <div style={{
            padding:'1rem 1.5rem', borderTop:'1px solid #2a2a2a',
            background:'#0d0d0d', flexShrink:0,
          }}>
            {replyingTo && (
              <div style={{
                fontSize:'0.72rem', color:'#e8c97e', marginBottom:'0.5rem',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <span>Replying to @{comments.find(c => c.id === replyingTo)?.user}</span>
                <button onClick={() => setReplyingTo(null)} style={{
                  background:'transparent', border:'none', color:'#555',
                  cursor:'pointer', fontSize:'0.75rem',
                }}>✕</button>
              </div>
            )}

            <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
              <div style={{
                width:'32px', height:'32px', borderRadius:'50%',
                background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.6rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
              }}>You</div>
              <input
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment() } }}
                placeholder="Add a comment..."
                style={{
                  flex:1, background:'#111', border:'1px solid #2a2a2a',
                  borderRadius:'100px', padding:'0.65rem 1rem',
                  color:'#f0ede8', fontSize:'0.85rem',
                  fontFamily:"'Outfit',sans-serif", outline:'none',
                  transition:'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor='#e8c97e'}
                onBlur={e => e.target.style.borderColor='#2a2a2a'}
              />
              {commentText && (
                <button
                  onClick={submitComment}
                  style={{
                    background:'#e8c97e', color:'#0a0a0a', border:'none',
                    borderRadius:'100px', padding:'0.6rem 1.1rem',
                    fontSize:'0.82rem', fontWeight:600, cursor:'pointer',
                    fontFamily:"'Outfit',sans-serif", flexShrink:0,
                    transition:'all 0.2s',
                  }}
                >Post</button>
              )}
            </div>

            {/* Quick reactions */}
            <div style={{ display:'flex', gap:'0.4rem', marginTop:'0.6rem' }}>
              {['🔥','❤️','😍','👏','💯','✨'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => { setCommentText(prev => prev + emoji) }}
                  style={{
                    background:'#111', border:'1px solid #2a2a2a',
                    borderRadius:'100px', padding:'0.2rem 0.55rem',
                    fontSize:'0.82rem', cursor:'pointer', transition:'transform 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >{emoji}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
