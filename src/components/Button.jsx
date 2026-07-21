export default function Button({ children, variant = 'primary', href, onClick }) {
  const styles = {
    primary: {
      background: '#e8c97e', color: '#0a0a0a', padding: '0.75rem 1.75rem',
      borderRadius: '100px', border: 'none', fontWeight: 600,
      fontSize: '0.88rem', letterSpacing: '0.04em', cursor: 'pointer',
      textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s',
      fontFamily: 'var(--sans)',
    },
    ghost: {
      background: 'transparent', color: '#f0ede8', padding: '0.75rem 1.75rem',
      borderRadius: '100px', border: '1px solid #2a2a2a', fontWeight: 500,
      fontSize: '0.88rem', letterSpacing: '0.04em', cursor: 'pointer',
      textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s',
      fontFamily: 'var(--sans)',
    },
    small: {
      background: '#e8c97e', color: '#0a0a0a', padding: '0.45rem 1.25rem',
      borderRadius: '100px', border: 'none', fontWeight: 600,
      fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'none',
      display: 'inline-block', transition: 'all 0.2s', fontFamily: 'var(--sans)',
    },
    smallGhost: {
      background: 'transparent', color: '#888', padding: '0.45rem 1.25rem',
      borderRadius: '100px', border: '1px solid #2a2a2a', fontWeight: 500,
      fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'none',
      display: 'inline-block', transition: 'all 0.2s', fontFamily: 'var(--sans)',
    },
  }
  if (href) return <a href={href} style={styles[variant]}>{children}</a>
  return <button onClick={onClick} style={styles[variant]}>{children}</button>
}