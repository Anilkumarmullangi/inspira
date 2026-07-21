import { useEffect, useState } from 'react'

export default function LoadingScreen({ message = 'Loading...' }) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0a',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      fontFamily:"'Outfit',sans-serif",
      gap:'1.5rem',
    }}>
      {/* Animated logo */}
      <div style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'2.5rem', fontWeight:600, color:'#f0ede8',
        animation:'pulse 2s ease-in-out infinite',
      }}>
        Insp<em style={{ color:'#e8c97e', fontStyle:'italic' }}>i</em>ra
      </div>

      {/* Spinner */}
      <div style={{ position:'relative', width:'40px', height:'40px' }}>
        <div style={{
          position:'absolute', inset:0, borderRadius:'50%',
          border:'2px solid #2a2a2a',
        }}/>
        <div style={{
          position:'absolute', inset:0, borderRadius:'50%',
          border:'2px solid transparent',
          borderTopColor:'#e8c97e',
          animation:'spin 0.8s linear infinite',
        }}/>
      </div>

      <p style={{ fontSize:'0.82rem', color:'#555' }}>
        {message}{dots}
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      `}</style>
    </div>
  )
}