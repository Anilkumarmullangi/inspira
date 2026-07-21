export default function InputField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
      <label style={{
        fontSize:'0.78rem', fontWeight:500, color:'#888',
        textTransform:'uppercase', letterSpacing:'0.08em',
      }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          background:'#111', border:'1px solid #2a2a2a',
          borderRadius:'10px', padding:'0.85rem 1rem',
          color:'#f0ede8', fontSize:'0.95rem',
          fontFamily:"'Outfit', sans-serif",
          outline:'none', transition:'border-color 0.2s', width:'100%',
        }}
        onFocus={e => e.target.style.borderColor = '#e8c97e'}
        onBlur={e => e.target.style.borderColor = '#2a2a2a'}
      />
    </div>
  )
}