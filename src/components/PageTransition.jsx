import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition:'opacity 0.25s ease, transform 0.25s ease',
    }}>
      {children}
    </div>
  )
}