import { useNavigate } from 'react-router-dom'

export default function Stories({ stories = [] }) {
  const navigate = useNavigate()

  const defaultStories = [
    { id:1, username:'nisha.creates', avatar:'NK', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)', seen:false },
    { id:2, username:'arjun.lens', avatar:'AL', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)', seen:false },
    { id:3, username:'maya.art', avatar:'MA', gradient:'linear-gradient(135deg,#9b8ede,#6a5acd)', seen:true },
    { id:4, username:'rohan.travels', avatar:'RT', gradient:'linear-gradient(135deg,#c96f6f,#8e4a4a)', seen:false },
    { id:5, username:'ananya.studio', avatar:'AS', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)', seen:true },
    { id:6, username:'cosmos.lens', avatar:'CL', gradient:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', seen:false },
  ]

  const storyList = stories.length > 0 ? stories : defaultStories

  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', padding:'1.1rem 1.25rem',
      marginBottom:'1.5rem', overflowX:'auto',
    }}>
      <div style={{ display:'flex', gap:'1.25rem', alignItems:'center' }}>
        {/* Add your own story */}
        <div style={{
          display:'flex', flexDirection:'column',
          alignItems:'center', gap:'0.4rem', flexShrink:0, cursor:'pointer',
        }}>
          <div style={{
            width:'56px', height:'56px', borderRadius:'50%',
            background:'#1a1a1a', border:'2px dashed #2a2a2a',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.4rem', transition:'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor='#e8c97e'}
            onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a2a'}
          >+</div>
          <span style={{ fontSize:'0.65rem', color:'#555' }}>Add story</span>
        </div>

        {/* Story rings */}
        {storyList.map(story => (
          <div
            key={story.id}
            onClick={() => navigate(`/stories/${story.username}`)}
            style={{
              display:'flex', flexDirection:'column',
              alignItems:'center', gap:'0.4rem',
              flexShrink:0, cursor:'pointer',
            }}
          >
            <div style={{
              width:'60px', height:'60px', borderRadius:'50%',
              padding:'2px',
              background: story.seen
                ? '#2a2a2a'
                : 'linear-gradient(135deg,#e8c97e,#c96f6f,#9b8ede)',
              transition:'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >
              <div style={{
                width:'100%', height:'100%', borderRadius:'50%',
                background: story.gradient,
                border:'2px solid #111',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.75rem', fontWeight:700, color:'#0a0a0a',
              }}>{story.avatar}</div>
            </div>
            <span style={{
              fontSize:'0.65rem',
              color: story.seen ? '#444' : '#888',
              maxWidth:'56px', overflow:'hidden',
              textOverflow:'ellipsis', whiteSpace:'nowrap',
            }}>{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}