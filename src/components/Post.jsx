import { useState } from 'react'

export default function Post({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)
  const [likes, setLikes] = useState(post.likes)
  const [showReach, setShowReach] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')

  const toggleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', overflow:'hidden', marginBottom:'1.25rem',
      transition:'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#3a3a3a'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
    >
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0.9rem 1.1rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
          <div style={{
            width:'36px', height:'36px', borderRadius:'50%',
            background: post.user.gradient, display:'flex',
            alignItems:'center', justifyContent:'center',
            fontSize:'0.72rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
          }}>{post.user.avatar}</div>
          <div>
            <div style={{ fontSize:'0.85rem', fontWeight:600, color:'#f0ede8', lineHeight:1.2 }}>
              {post.user.name}
            </div>
            <div style={{ fontSize:'0.7rem', color:'#555', marginTop:'1px' }}>
              @{post.user.username} · {post.time}
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          {/* Follow button */}
          <button style={{
            background:'transparent', border:'1px solid #2a2a2a',
            borderRadius:'100px', padding:'0.25rem 0.85rem',
            color:'#e8c97e', fontSize:'0.72rem', fontWeight:500,
            cursor:'pointer', fontFamily:"'Outfit',sans-serif",
            transition:'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background='rgba(232,201,126,0.1)'; e.target.style.borderColor='#e8c97e' }}
            onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='#2a2a2a' }}
          >Follow</button>
          <button style={{
            background:'transparent', border:'none',
            color:'#555', fontSize:'1.1rem', cursor:'pointer', padding:'0.2rem',
          }}>⋯</button>
        </div>
      </div>

      {/* Image */}
<div style={{
  width:'100%', aspectRatio:'1',
  background: post.imageBg,
  display:'flex', alignItems:'center',
  justifyContent:'center', fontSize:'6rem',
  position:'relative', overflow:'hidden',
}}>
        {post.image}

        {/* Reach badge — Inspira exclusive */}
        <div style={{
          position:'absolute', top:'10px', right:'10px',
          background:'rgba(10,10,10,0.75)', backdropFilter:'blur(8px)',
          border:'1px solid rgba(232,201,126,0.25)',
          borderRadius:'100px', padding:'0.25rem 0.65rem',
          fontSize:'0.65rem', color:'#e8c97e', cursor:'pointer',
          display:'flex', alignItems:'center', gap:'0.3rem',
          transition:'all 0.2s',
        }}
          onClick={() => setShowReach(!showReach)}
          onMouseEnter={e => e.currentTarget.style.background='rgba(10,10,10,0.9)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(10,10,10,0.75)'}
        >
          <span>👁</span> {post.reach}
        </div>

        {/* Reach tooltip */}
        {showReach && (
          <div style={{
            position:'absolute', top:'38px', right:'10px',
            background:'#1a1a1a', border:'1px solid #2a2a2a',
            borderRadius:'12px', padding:'0.9rem 1rem',
            fontSize:'0.75rem', color:'#888', maxWidth:'200px',
            lineHeight:1.6, zIndex:10,
          }}>
            <div style={{ color:'#e8c97e', fontWeight:600, marginBottom:'0.4rem', fontSize:'0.78rem' }}>
              ✦ Reach Transparency
            </div>
            This post reached <strong style={{ color:'#f0ede8' }}>{post.reach}</strong> people.
            Instagram hides this from creators. Inspira never does.
          </div>
        )}
      </div>

      {/* Actions row */}
      <div style={{ padding:'0.75rem 1.1rem 0' }}>
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
        }}>
          <div style={{ display:'flex', gap:'0.25rem', alignItems:'center' }}>
            {/* Like */}
            <button onClick={toggleLike} style={{
              background:'transparent', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:'0.35rem',
              color: liked ? '#e8557a' : '#888',
              fontSize:'0.85rem', fontFamily:"'Outfit',sans-serif",
              padding:'0.4rem 0.6rem', borderRadius:'8px',
              transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'1.15rem' }}>{liked ? '♥' : '♡'}</span>
              <span style={{ fontWeight: liked ? 600 : 400 }}>{likes.toLocaleString()}</span>
            </button>

            {/* Comment */}
            <button
              onClick={() => setShowComment(!showComment)}
              style={{
                background:'transparent', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'0.35rem',
                color:'#888', fontSize:'0.85rem',
                fontFamily:"'Outfit',sans-serif",
                padding:'0.4rem 0.6rem', borderRadius:'8px',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'1.1rem' }}>💬</span>
              <span>{post.comments}</span>
            </button>

            {/* Share */}
            <button style={{
              background:'transparent', border:'none', cursor:'pointer',
              color:'#888', fontSize:'1.1rem',
              padding:'0.4rem 0.6rem', borderRadius:'8px',
              transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >↗</button>
          </div>

          {/* Save */}
          <button onClick={() => setSaved(!saved)} style={{
            background:'transparent', border:'none', cursor:'pointer',
            color: saved ? '#e8c97e' : '#888',
            fontSize:'1.1rem', padding:'0.4rem 0.6rem',
            borderRadius:'8px', transition:'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >
            {saved ? '★' : '☆'}
          </button>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding:'0.5rem 1.1rem' }}>
        <p style={{ fontSize:'0.85rem', color:'#f0ede8', lineHeight:1.65, margin:0 }}>
          <strong style={{ color:'#f0ede8', marginRight:'0.4rem' }}>
            {post.user.username}
          </strong>
          {post.caption}
        </p>
      </div>

      {/* Tags */}
      <div style={{ padding:'0.25rem 1.1rem', display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
        {post.tags.map(tag => (
          <span key={tag} style={{
            fontSize:'0.78rem', color:'#e8c97e', cursor:'pointer',
            transition:'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color='#f0d88a'}
            onMouseLeave={e => e.target.style.color='#e8c97e'}
          >{tag}</span>
        ))}
      </div>

      {/* View comments */}
      <div style={{ padding:'0.35rem 1.1rem 0.9rem' }}>
        <button style={{
          background:'transparent', border:'none', cursor:'pointer',
          color:'#555', fontSize:'0.75rem',
          fontFamily:"'Outfit',sans-serif", padding:0,
          transition:'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color='#888'}
          onMouseLeave={e => e.target.style.color='#555'}
        >
          View all {post.comments} comments
        </button>
      </div>

      {/* Comment box — shown when comment button clicked */}
      {showComment && (
        <div style={{
          borderTop:'1px solid #2a2a2a',
          padding:'0.75rem 1.1rem',
          display:'flex', gap:'0.6rem', alignItems:'center',
        }}>
          <div style={{
            width:'28px', height:'28px', borderRadius:'50%',
            background:'linear-gradient(135deg,#e8c97e,#c96f6f)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.6rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
          }}>You</div>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex:1, background:'#1a1a1a', border:'1px solid #2a2a2a',
              borderRadius:'100px', padding:'0.5rem 1rem',
              color:'#f0ede8', fontSize:'0.82rem',
              fontFamily:"'Outfit',sans-serif", outline:'none',
            }}
            onFocus={e => e.target.style.borderColor='#e8c97e'}
            onBlur={e => e.target.style.borderColor='#2a2a2a'}
          />
          {comment && (
            <button style={{
              background:'#e8c97e', color:'#0a0a0a', border:'none',
              borderRadius:'100px', padding:'0.4rem 0.9rem',
              fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Outfit',sans-serif",
            }}
              onClick={() => setComment('')}
            >Post</button>
          )}
        </div>
      )}
    </div>
  )
}