import { useState } from 'react'

export default function Post({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)
  const [likes, setLikes] = useState(post.likes)
  const [showReach, setShowReach] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', overflow:'hidden', marginBottom:'1.5rem',
    }}>
      {/* Post header */}
      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'1rem 1.25rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{
            width:'38px', height:'38px', borderRadius:'50%',
            background: post.user.gradient, display:'flex',
            alignItems:'center', justifyContent:'center',
            fontSize:'0.78rem', fontWeight:600, color:'#0a0a0a',
            flexShrink:0,
          }}>
            {post.user.avatar}
          </div>
          <div>
            <div style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8' }}>
              {post.user.name}
            </div>
            <div style={{ fontSize:'0.72rem', color:'#555' }}>
              @{post.user.username} · {post.time}
            </div>
          </div>
        </div>
        <button style={{
          background:'transparent', border:'none', color:'#555',
          fontSize:'1.2rem', cursor:'pointer', padding:'0.25rem',
        }}>⋯</button>
      </div>

      {/* Post image */}
      <div style={{
        width:'100%', aspectRatio:'1',
        background: post.imageBg,
        display:'flex', alignItems:'center',
        justifyContent:'center', fontSize:'5rem',
        position:'relative',
      }}>
        {post.image}

        {/* Inspira feature: reach indicator — Instagram hides this */}
        <div
          onClick={() => setShowReach(!showReach)}
          style={{
            position:'absolute', bottom:'12px', right:'12px',
            background:'rgba(10,10,10,0.7)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(232,201,126,0.2)',
            borderRadius:'100px', padding:'0.3rem 0.75rem',
            fontSize:'0.7rem', color:'#e8c97e', cursor:'pointer',
            display:'flex', alignItems:'center', gap:'0.4rem',
          }}
        >
          👁 {post.reach} reach
        </div>

        {showReach && (
          <div style={{
            position:'absolute', bottom:'44px', right:'12px',
            background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'12px', padding:'0.75rem 1rem',
            fontSize:'0.75rem', color:'#888', maxWidth:'180px',
          }}>
            <div style={{ color:'#e8c97e', fontWeight:600, marginBottom:'0.25rem' }}>
              ✦ Inspira Reach
            </div>
            This post reached {post.reach} people — including followers and explore. Instagram hides this from you.
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding:'0.75rem 1.25rem' }}>
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:'0.75rem',
        }}>
          <div style={{ display:'flex', gap:'1.25rem', alignItems:'center' }}>
            {/* Like */}
            <button onClick={toggleLike} style={{
              background:'transparent', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:'0.4rem',
              color: liked ? '#e8c97e' : '#888', fontSize:'0.88rem',
              fontFamily:"'Outfit', sans-serif", transition:'color 0.2s',
            }}>
              <span style={{ fontSize:'1.1rem' }}>{liked ? '♥' : '♡'}</span>
              {likes.toLocaleString()}
            </button>
            {/* Comment */}
            <button style={{
              background:'transparent', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:'0.4rem',
              color:'#888', fontSize:'0.88rem', fontFamily:"'Outfit', sans-serif",
            }}>
              <span style={{ fontSize:'1.1rem' }}>💬</span>
              {post.comments}
            </button>
            {/* Share */}
            <button style={{
              background:'transparent', border:'none', cursor:'pointer',
              color:'#888', fontSize:'1.1rem',
            }}>↗</button>
          </div>
          {/* Save */}
          <button onClick={() => setSaved(!saved)} style={{
            background:'transparent', border:'none', cursor:'pointer',
            color: saved ? '#e8c97e' : '#888', fontSize:'1.1rem',
            transition:'color 0.2s',
          }}>
            {saved ? '🔖' : '🔖'}
          </button>
        </div>

        {/* Caption */}
        <p style={{ fontSize:'0.88rem', color:'#f0ede8', lineHeight:1.6, marginBottom:'0.5rem' }}>
          <strong style={{ color:'#f0ede8' }}>{post.user.username}</strong>{' '}
          {post.caption}
        </p>

        {/* Tags */}
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'0.5rem' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              fontSize:'0.78rem', color:'#e8c97e', cursor:'pointer',
            }}>{tag}</span>
          ))}
        </div>

        {/* View comments */}
        <button style={{
          background:'transparent', border:'none', cursor:'pointer',
          color:'#555', fontSize:'0.78rem', fontFamily:"'Outfit', sans-serif",
          padding:0,
        }}>
          View all {post.comments} comments
        </button>
      </div>
    </div>
  )
}