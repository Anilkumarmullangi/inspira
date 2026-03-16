import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const categories = ['Photography','Architecture','Fashion','Travel','Art & Design','Food & Culture','Nature','Interiors']
const features = [
  { icon:'📸', title:'Curated Feed', desc:'An algorithm that actually learns your taste. The more you explore, the more precisely Inspira surfaces content that moves you.' },
  { icon:'✨', title:'Stories & Reels', desc:'Ephemeral moments and short-form video, beautifully presented. Your daily life, elevated.' },
  { icon:'🗂', title:'Collections', desc:'Save and organise posts that inspire you into private or public mood boards.' },
  { icon:'🔍', title:'Explore & Discover', desc:'Dive into trending aesthetics, rising creators, and niche communities you never knew you needed.' },
  { icon:'💬', title:'DMs & Collabs', desc:'Message creators you admire, co-author posts, and build real creative relationships.' },
  { icon:'📊', title:'Creator Analytics', desc:'Understand your audience — reach, saves, and follower growth in one clean dashboard.' },
]
const testimonials = [
  { initials:'PK', name:'Priya Kapoor', handle:'@priya.frames', followers:'84k', quote:'Inspira changed how I share my photography. The community here actually appreciates craft — not just likes.', gradient:'linear-gradient(135deg,#e8c97e,#c96f6f)' },
  { initials:'RS', name:'Rohan Sharma', handle:'@rohan.travels', followers:'41k', quote:'I grew from 200 to 40,000 followers in six months. The algorithm actually rewards quality over quantity.', gradient:'linear-gradient(135deg,#7eb8e8,#5a7a9e)' },
  { initials:'AM', name:'Ananya Mehta', handle:'@ananya.studio', followers:'120k', quote:'Finally a platform that treats creators like adults. Clean interface, real analytics, zero clutter.', gradient:'linear-gradient(135deg,#6fcf97,#4a9e6a)' },
]
const gridCells = [
  { bg:'linear-gradient(135deg,#1a1208,#3d2b10)', emoji:'🌅' },
  { bg:'linear-gradient(135deg,#0a1520,#1e3a5f)', emoji:'🌃' },
  { bg:'linear-gradient(135deg,#0f1a0f,#1e3a1e)', emoji:'🌿' },
  { bg:'linear-gradient(135deg,#1a0f0f,#3a1e1e)', emoji:'🌺' },
  { bg:'linear-gradient(135deg,#12120a,#2a2a10)', emoji:'🏛' },
  { bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', emoji:'🌌' },
  { bg:'linear-gradient(135deg,#1a1210,#3a2218)', emoji:'☕' },
  { bg:'linear-gradient(135deg,#0a1a15,#1e3a30)', emoji:'🌊' },
  { bg:'linear-gradient(135deg,#1a1a12,#3a3a20)', emoji:'🏙' },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const marqueeItems = [...categories, ...categories]

  return (
    <>
      {/* NAVBAR */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">Insp<em>i</em>ra</div>
        <ul className="nav-links">
          {['Features','Explore','Stories'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-btns">
          <a href="/login" className="btn btn-sm-ghost">Log in</a>
          <a href="/signup" className="btn btn-sm">Sign up free</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-text">
          <div className="hero-tag">✦ Your visual world awaits</div>
          <h1>
            <strong>Share</strong> what<br/>
            <em>moves</em> you.<br/>
            <strong>Inspire</strong> others.
          </h1>
          <p className="hero-sub">Inspira is the home for visual storytellers. Discover beauty, share your perspective, and connect with a community that lives for aesthetics.</p>
          <div className="hero-actions">
            <a href="#" className="btn btn-primary">Create your profile</a>
            <a href="#features" className="btn btn-ghost">Explore feed</a>
          </div>
          <div className="hero-proof">
            <span className="stars">★★★★★</span>
            <span>4.9 rating · 2M+ creators · 180 countries</span>
          </div>
        </div>

        <div className="phone-wrap">
          <div className="float-card float-card-left">
            <div className="float-label">New followers</div>
            <div className="float-val">+248</div>
            <div className="float-trend">↑ 18% this week</div>
          </div>
          <div className="float-card float-card-right">
            <div className="float-label">Post reach</div>
            <div className="float-val">14.2k</div>
            <div className="float-trend">↑ Going viral</div>
          </div>
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-header">
              <span className="phone-logo">Insp<em>i</em>ra</span>
              <div className="phone-icons"><span>♡</span><span>✉</span></div>
            </div>
            <div className="stories">
              {[['🌿','yours'],['🏙','maya'],['🎨','studio'],['✈️','rohan']].map(([icon,name]) => (
                <div key={name} className="story">
                  <div className="story-ring">{icon}</div>
                  <span className="story-name">{name}</span>
                </div>
              ))}
            </div>
            <div className="post">
              <div className="post-header">
                <div className="post-avatar">NS</div>
                <span className="post-user">nisha.creates</span>
              </div>
              <div className="post-img">🌅</div>
              <div className="post-actions">
                <span>♡</span><span>💬</span><span>↗</span>
                <span style={{marginLeft:'auto'}}>🔖</span>
              </div>
              <div className="post-likes">1,842 likes</div>
              <div className="post-caption"><strong>nisha.creates</strong> golden hour never gets old ✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.map((cat, i) => (
            <span key={i} className="marquee-item">
              {cat}<span className="marquee-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label"><span className="section-label-line"/>Everything you need</div>
        <h2 className="section-h2" style={{maxWidth:'520px'}}>
          Built for creators who <em>refuse</em> to be ordinary
        </h2>
        <div className="features-bento">
          {features.map((f, i) => (
            <div key={f.title} className={`bento-item${i === 0 || i === 4 ? ' bento-wide' : ''}`}>
              <div className="bento-icon">{f.icon}</div>
              <div className="bento-title">{f.title}</div>
              <div className="bento-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GRID PREVIEW */}
      <section className="grid-preview" id="explore">
        <div className="insta-grid">
          {gridCells.map((cell, i) => (
            <div key={i} className="grid-cell" style={{background:cell.bg}}>{cell.emoji}</div>
          ))}
        </div>
        <div className="grid-text">
          <div className="section-label"><span className="section-label-line"/>Your profile</div>
          <h2 className="section-h2">A gallery that tells your <em>story</em></h2>
          <p>Your Inspira grid is your visual identity. Every post becomes part of a living portfolio — a curated window into how you see the world.</p>
          <a href="#" className="btn btn-primary">Start sharing</a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="stories">
        <div className="testimonials-header">
          <div className="section-label" style={{justifyContent:'center'}}>
            <span className="section-label-line"/>Creator stories
          </div>
          <h2 className="section-h2" style={{maxWidth:'480px',margin:'0 auto'}}>
            Made for people who <em>see</em> differently
          </h2>
        </div>
        <div className="testi-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <div className="testi-quote">"{t.quote}"</div>
              <div className="testi-author">
                <div className="testi-avatar" style={{background:t.gradient}}>{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-handle">{t.handle} · {t.followers} followers</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"/>
        <div className="section-label" style={{justifyContent:'center',position:'relative',zIndex:1}}>
          <span className="section-label-line"/>Join the community
        </div>
        <h2 style={{position:'relative',zIndex:1}}>Your audience is <em>waiting.</em></h2>
        <p className="cta-sub" style={{position:'relative',zIndex:1}}>
          2 million creators are already sharing what moves them. It's your turn.
        </p>
        <div className="cta-actions" style={{position:'relative',zIndex:1}}>
          <a href="#" className="btn btn-primary">Create free account</a>
          <a href="#" className="btn btn-ghost">Browse without signing up</a>
        </div>
        <div className="store-btns" style={{position:'relative',zIndex:1}}>
          {[['','Download on the','App Store'],['▶','Get it on','Google Play']].map(([icon,sub,name]) => (
            <a key={name} href="#" className="store-btn">
              <span style={{fontSize:'1.2rem'}}>{icon}</span>
              <div>
                <div className="store-btn-sub">{sub}</div>
                <div className="store-btn-name">{name}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Insp<em>i</em>ra</div>
        <div className="footer-links">
          {['About','Blog','Careers','Privacy','Terms'].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
        <div className="footer-copy">© 2026 Inspira, Inc.</div>
      </footer>
    </>
  )
}