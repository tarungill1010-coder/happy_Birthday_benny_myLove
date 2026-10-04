import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

function MemoryLightbox({ photos, index, onClose, onChange }) {
  const touchStart = useRef(null)
  const [imgError, setImgError] = useState(false)
  const photo = photos[index]

  useEffect(() => {
    setImgError(false)
    const context = gsap.context(() => {
      gsap.fromTo(
        '.lightbox__image-wrapper, .lightbox__caption',
        { y: 16, scale: 0.98, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    })
    return () => context.revert()
  }, [index])

  const onTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) {
      onChange((index + (distance < 0 ? 1 : -1) + photos.length) % photos.length)
    }
    touchStart.current = null
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo memories"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close photo">
        <X size={22} />
      </button>

      <button
        className="lightbox-arrow lightbox-arrow--prev"
        onClick={() => onChange((index - 1 + photos.length) % photos.length)}
        aria-label="Previous photo"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="lightbox__content" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="lightbox__image-wrapper">
          {!imgError ? (
            <img
              src={photo.src}
              alt={photo.alt}
              className="lightbox__actual-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="photo-placeholder photo-placeholder--fallback">
              <div className="photo-placeholder__label">
                <span>{photo.caption}</span>
                <small>place {photo.src} in /public/images</small>
              </div>
            </div>
          )}
        </div>

        <p className="lightbox__caption">{photo.caption}</p>
        <p className="lightbox__count">
          {String(index + 1).padStart(2, '0')} <span>—</span> {String(photos.length).padStart(2, '0')}
        </p>
      </div>

      <button
        className="lightbox-arrow lightbox-arrow--next"
        onClick={() => onChange((index + 1) % photos.length)}
        aria-label="Next photo"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  )
}

export default MemoryLightbox