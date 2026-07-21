const shimmer = `
  @keyframes shimmer {
    0% { background-position: -468px 0 }
    100% { background-position: 468px 0 }
  }
`

const skeletonBase = {
  background:'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
  backgroundSize:'936px 100%',
  animation:'shimmer 1.5s infinite linear',
  borderRadius:'6px',
}

export function SkeletonBox({ width='100%', height='16px', radius='6px', style={} }) {
  return (
    <>
      <style>{shimmer}</style>
      <div style={{ ...skeletonBase, width, height, borderRadius:radius, ...style }}/>
    </>
  )
}

export function SkeletonCircle({ size='40px', style={} }) {
  return (
    <>
      <style>{shimmer}</style>
      <div style={{ ...skeletonBase, width:size, height:size, borderRadius:'50%', flexShrink:0, ...style }}/>
    </>
  )
}

export function SkeletonPost() {
  return (
    <div style={{
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', overflow:'hidden', marginBottom:'1.25rem',
    }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'1rem 1.25rem' }}>
        <SkeletonCircle size='38px'/>
        <div style={{ flex:1 }}>
          <SkeletonBox width='140px' height='12px' style={{ marginBottom:'6px' }}/>
          <SkeletonBox width='100px' height='10px'/>
        </div>
      </div>
      {/* Image */}
      <SkeletonBox width='100%' height='400px' radius='0'/>
      {/* Actions */}
      <div style={{ padding:'0.75rem 1.25rem' }}>
        <div style={{ display:'flex', gap:'1rem', marginBottom:'0.75rem' }}>
          <SkeletonBox width='60px' height='12px'/>
          <SkeletonBox width='60px' height='12px'/>
          <SkeletonBox width='40px' height='12px'/>
        </div>
        <SkeletonBox width='80px' height='12px' style={{ marginBottom:'8px' }}/>
        <SkeletonBox width='100%' height='12px' style={{ marginBottom:'6px' }}/>
        <SkeletonBox width='75%' height='12px'/>
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div style={{ padding:'0 2rem', maxWidth:'900px', margin:'0 auto' }}>
      {/* Cover */}
      <SkeletonBox width='100%' height='200px' radius='0' style={{ marginBottom:'0' }}/>
      {/* Avatar + actions */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginTop:'-30px', marginBottom:'1.25rem' }}>
        <SkeletonCircle size='96px'/>
        <div style={{ display:'flex', gap:'0.6rem', paddingBottom:'0.5rem' }}>
          <SkeletonBox width='90px' height='36px' radius='100px'/>
          <SkeletonBox width='90px' height='36px' radius='100px'/>
        </div>
      </div>
      {/* Name */}
      <SkeletonBox width='180px' height='18px' style={{ marginBottom:'8px' }}/>
      <SkeletonBox width='120px' height='12px' style={{ marginBottom:'12px' }}/>
      <SkeletonBox width='100%' height='12px' style={{ marginBottom:'6px' }}/>
      <SkeletonBox width='80%' height='12px' style={{ marginBottom:'1.5rem' }}/>
      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'1px', marginBottom:'1.5rem' }}>
        {Array.from({length:5}).map((_,i) => (
          <SkeletonBox key={i} width='100%' height='64px' radius='0'/>
        ))}
      </div>
      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px' }}>
        {Array.from({length:9}).map((_,i) => (
          <SkeletonBox key={i} width='100%' height='200px' radius='0'/>
        ))}
      </div>
    </div>
  )
}

export function SkeletonNotification() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.85rem 1rem', marginBottom:'2px' }}>
      <SkeletonCircle size='40px'/>
      <div style={{ flex:1 }}>
        <SkeletonBox width='80%' height='12px' style={{ marginBottom:'6px' }}/>
        <SkeletonBox width='60px' height='10px'/>
      </div>
      <SkeletonBox width='42px' height='42px' radius='8px'/>
    </div>
  )
}

export function SkeletonStories() {
  return (
    <div style={{
      display:'flex', gap:'1.25rem', padding:'1.25rem',
      background:'#111', border:'1px solid #2a2a2a',
      borderRadius:'16px', marginBottom:'1.5rem',
    }}>
      {Array.from({length:5}).map((_,i) => (
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
          <SkeletonCircle size='56px'/>
          <SkeletonBox width='48px' height='8px'/>
        </div>
      ))}
    </div>
  )
}

export function SkeletonMessage() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.85rem 1.25rem' }}>
      <SkeletonCircle size='44px'/>
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
          <SkeletonBox width='120px' height='12px'/>
          <SkeletonBox width='40px' height='10px'/>
        </div>
        <SkeletonBox width='80%' height='10px'/>
      </div>
    </div>
  )
}