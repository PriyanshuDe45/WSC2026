import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import '../styles/VideoSection.css'
import videoSrc from '../assets/videos/lyon.mp4'

export default function VideoSection() {
  const videoRef = useRef(null)

  const { ref: inViewRef, inView } = useInView({ threshold: 0.5 })

  // Combine refs
  const setRefs = (node) => {
    videoRef.current = node
    inViewRef(node)
  }

  // Auto play/pause based on intersection
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView])

  // Pause when tab not visible
  useEffect(() => {
    const video = videoRef.current
    const handleVisibility = () => {
      if (!video) return
      if (document.hidden) {
        video.pause()
      } else if (inView) {
        video.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [inView])

  return (
    <section className="video-section" aria-label="City video">
      <video
        ref={setRefs}
        className="city-video"
        muted
        loop
        playsInline
        aria-label="Video tour of Lyon"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  )
}