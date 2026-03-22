import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Post({ post }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes || 0)
  const [showReachInfo, setShowReachInfo] = useState(false)

  const toggleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const toggleSave = (e) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  const goToPost = () => navigate(`/post/${post.id}`)
  const goToUser = () => navigate(`/user/${post.username || 'nisha.creates'}`)

  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', overflow:'hidden',
      marginBottom:'1.25rem', fontFamily:"'Outfit',sans-serif",
    }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'1rem 1.25rem',
      }}>
        <div
          onClick={goToUser}
          style={{ display:'flex', alignItems:'center', gap:'0.75rem', cursor:'pointer' }}
        >
          <div style={{
            width:'38px', height:'38px', borderRadius:'50%',
            background: post.gradient || 'linear-gradient(135deg,#e8c97e,#c96f6f)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.7rem', fontWeight:700, color:'#0a0a0a', flexShrink:0,
          }}>{post.avatar || 'NK'}</div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
              <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#f0ede8' }}>
                {post.username || 'nisha.creates'}
              </span>
              {post.verified && (
                <span style={{
                  background:'#e8c97e', color:'#0a0a0a', borderRadius:'50%',
                  width:'14px', height:'14px', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'0.5rem', fontWeight:700,
                }}>✓</span>
              )}
            </div>
            <div style={{ fontSize:'0.7rem', color:'#555' }}>
              {post.location || post.time || '2h ago'}
            </div>
          </div>
        </div>
        <button style={{
          background:'transparent', border:'none',
          color:'#555', cursor:'pointer', fontSize:'1.1rem',
        }}>⋯</button>
      </div>

      {/* Post image — clickable → post detail */}
      <div
        onClick={goToPost}
        style={{
          width:'100%', aspectRatio:'1',
          background: post.bg || 'linear-gradient(135deg,#1a1208,#3d2b10)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'5rem', cursor:'pointer', position:'relative',
          transition:'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity='0.92'}
        onMouseLeave={e => e.currentTarget.style.opacity='1'}
      >
        {post.emoji || '🌅'}

        {/* Reach badge — Inspira exclusive */}
        <div
          onClick={e => { e.stopPropagation(); setShowReachInfo(!showReachInfo) }}
          style={{
            position:'absolute', top:'10px', right:'10px',
            background:'rgba(10,10,10,0.75)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(232,201,126,0.25)',
            borderRadius:'100px', padding:'0.25rem 0.65rem',
            fontSize:'0.68rem', color:'#e8c97e', cursor:'pointer',
            display:'flex', alignItems:'center', gap:'0.3rem',
          }}
        >👁 {post.reach || '14.2k'}</div>

        {showReachInfo && (
          <div style={{
            position:'absolute', top:'40px', right:'10px',
            background:'#111', border:'1px solid #2a2a2a',
            borderRadius:'10px', padding:'0.75rem',
            fontSize:'0.72rem', color:'#888', maxWidth:'180px', zIndex:10,
          }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ color:'#e8c97e', fontWeight:600, marginBottom:'0.25rem' }}>✦ Reach</div>
            {post.reach || '14.2k'} unique accounts saw this. Instagram never shows creators this.
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding:'0.75rem 1.25rem 0' }}>
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:'0.6rem',
        }}>
          <div style={{ display:'flex', gap:'0.1rem' }}>
            {/* Like */}
            <button
              onClick={toggleLike}
              style={{
                background:'transparent', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'0.35rem',
                color: liked ? '#e8557a' : '#888', fontSize:'0.85rem',
                fontFamily:"'Outfit',sans-serif", padding:'0.4rem 0.6rem',
                borderRadius:'8px', transition:'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'1.15rem' }}>{liked ? '♥' : '♡'}</span>
              <span style={{ fontWeight: liked ? 600 : 400 }}>{likes.toLocaleString()}</span>
            </button>

            {/* Comment — navigates to post */}
            <button
              onClick={goToPost}
              style={{
                background:'transparent', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'0.35rem',
                color:'#888', fontSize:'0.85rem',
                fontFamily:"'Outfit',sans-serif", padding:'0.4rem 0.6rem',
                borderRadius:'8px', transition:'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'1rem' }}>💬</span>
              <span>{post.comments || 0}</span>
            </button>

            {/* Share */}
            <button style={{
              background:'transparent', border:'none', cursor:'pointer',
              color:'#888', fontSize:'1rem', padding:'0.4rem 0.6rem',
              borderRadius:'8px', transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >↗</button>
          </div>

          {/* Save */}
          <button
            onClick={toggleSave}
            style={{
              background:'transparent', border:'none', cursor:'pointer',
              color: saved ? '#e8c97e' : '#888', fontSize:'1.1rem',
              padding:'0.4rem 0.6rem', borderRadius:'8px', transition:'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >{saved ? '★' : '☆'}</button>
        </div>

        {/* Caption */}
        <div style={{ marginBottom:'0.6rem' }}>
          <span
            onClick={goToUser}
            style={{ fontSize:'0.85rem', fontWeight:600, color:'#f0ede8', cursor:'pointer', marginRight:'0.4rem' }}
          >{post.username || 'nisha.creates'}</span>
          <span style={{ fontSize:'0.85rem', color:'#888', lineHeight:1.5 }}>
            {post.caption || 'Golden hour never gets old ✨'}
          </span>
        </div>

        {/* View comments — navigates to post */}
        {post.comments > 0 && (
          <button
            onClick={goToPost}
            style={{
              background:'transparent', border:'none', cursor:'pointer',
              color:'#555', fontSize:'0.78rem', padding:0,
              fontFamily:"'Outfit',sans-serif", marginBottom:'0.5rem',
            }}
          >View all {post.comments} comments</button>
        )}

        {/* Tags */}
        {post.tags && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem', marginBottom:'0.6rem' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize:'0.75rem', color:'#e8c97e', cursor:'pointer' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ fontSize:'0.7rem', color:'#444', paddingBottom:'0.85rem' }}>
          {post.time || '2 hours ago'}
        </div>
      </div>
    </div>
  )
}