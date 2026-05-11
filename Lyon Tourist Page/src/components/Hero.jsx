import { useRef } from 'react'
import '../styles/Hero.css'
import coverLarge from '../assets/images/cover.jpg'
import coverSmall from '../assets/images/cover-low-res.jpg'

export default function Hero() {
  const btnRef = useRef(null)

  // Shining border-growing mouse follow effect
  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    btn.style.setProperty('--x', `${x}px`)
    btn.style.setProperty('--y', `${y}px`)
  }

  return (
    <section className="hero" aria-label="Call to action">
      <picture>
        <source media="(min-width: 760px)" srcSet={coverLarge} />
        <img
          src={coverSmall}
          alt="Lyon city street view"
          className="hero-bg"
        />
      </picture>
      <div className="hero-content">
        <button
          ref={btnRef}
          className="cta-btn"
          onMouseMove={handleMouseMove}
          aria-label="Explore Lyon"
        >
          Call to Action
        </button>
      </div>
    </section>
  )
}