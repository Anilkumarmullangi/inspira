import { useState, useEffect } from 'react'
import { navLinks } from '../constants/data'
import Button from '../components/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.25rem 5vw', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #2a2a2a' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 600, color: '#f0ede8' }}>
        Insp<em style={{ color: '#e8c97e', fontStyle: 'italic' }}>i</em>ra
      </div>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0 }} className="desktop-nav">
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href} style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Button variant="smallGhost" href="#">Log in</Button>
        <Button variant="small" href="#">Sign up free</Button>
      </div>
    </nav>
  )
}