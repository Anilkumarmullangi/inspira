import { feedStories } from '../constants/data'

export default function Stories() {
  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a', borderRadius:'16px',
      padding:'1.25rem', marginBottom:'1.5rem',
    }}>
      <div style={{ display:'flex', gap:'1.25rem', overflowX:'auto', paddingBottom:'0.25rem' }}>
        {feedStories.map(story => (
          <div key={story.id} style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            gap:'0.5rem', flexShrink:0, cursor:'pointer',
          }}>
            <div style={{
              width:'56px', height:'56px', borderRadius:'50%',
              padding:'2px',
              background: story.hasNew
                ? 'linear-gradient(135deg,#e8c97e,#c96f6f)'
                : '#2a2a2a',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <div style={{
                width:'100%', height:'100%', borderRadius:'50%',
                background: story.isYours ? '#1a1a1a' : '#111',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: story.isYours ? '1.2rem' : '0.8rem',
                fontWeight:600, color: story.isYours ? '#e8c97e' : '#f0ede8',
                border:'2px solid #0a0a0a',
              }}>
                {story.isYours ? '+' : story.avatar}
              </div>
            </div>
            <span style={{
              fontSize:'0.65rem', color: story.hasNew ? '#f0ede8' : '#555',
              maxWidth:'56px', textAlign:'center', overflow:'hidden',
              textOverflow:'ellipsis', whiteSpace:'nowrap',
            }}>
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}