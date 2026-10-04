import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight, Heart, Sparkles, X } from 'lucide-react'
import IntroScreen from './components/IntroScreen'
import MemoryLightbox from './components/MemoryLightbox'
import MusicControl from './components/MusicControl'
import { birthdayContent } from './data/birthdayContent'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function SectionHeading({ eyebrow, children, note }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {note && <p>{note}</p>}
    </div>
  )
}

function PhotoCard({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-portrait', // 'aspect-portrait' (4:5) or 'aspect-square' (1:1)
  placeholderText = 'your memory goes here',
  placeholderHint = 'replace in /public/images',
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`photo-container ${aspectRatio} ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className="photo-img"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-placeholder">
          <div className="photo-placeholder__label">
            <span>{placeholderText}</span>
            {placeholderHint && <small>{placeholderHint}</small>}
          </div>
        </div>
      )}
    </div>
  )
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      <div className="timeline__track" aria-hidden="true">
        <span />
      </div>
      {items.map((item, index) => (
        <article
          className={`timeline-item ${index % 2 ? 'timeline-item--right' : ''}`}
          key={item.title}
        >
          <div className="timeline-item__dot">
            <Heart size={14} fill="currentColor" />
          </div>
          <div className="timeline-card reveal">
            <span className="timeline-card__date">{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            {item.image && (
              <PhotoCard
                src={item.image}
                alt={item.title}
                aspectRatio="aspect-portrait"
                className="timeline-card__photo"
                placeholderText={item.title}
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function Gallery({ photos, onSelect }) {
  return (
    <div className="gallery-grid">
      {photos.map((photo, index) => (
        <button
          className={`gallery-tile gallery-tile--${index + 1} reveal`}
          key={photo.src + index}
          onClick={() => onSelect(index)}
          aria-label={`Open memory: ${photo.caption}`}
        >
          <PhotoCard
            src={photo.src}
            alt={photo.alt}
            aspectRatio="aspect-portrait"
            className="gallery-tile__img-wrap"
            placeholderText={photo.caption}
          />
          <span className="gallery-tile__caption">
            <span>{photo.caption}</span>
            <ArrowUpRight size={16} />
          </span>
        </button>
      ))}
    </div>
  )
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const siteRef = useRef(null)
  const surpriseRef = useRef(null)
  const celebrationTimer = useRef(null)

  useEffect(() => {
    if (!isOpen || !siteRef.current) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo(
        '.hero-couple-photo__frame',
        { clipPath: 'inset(0 0 100% 0)', y: 24, autoAlpha: 0 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, autoAlpha: 1, duration: 1.1, ease: 'power4.inOut', delay: 0.35 }
      )

      gsap.utils.toArray('.reveal:not(.gallery-tile):not(.reason-card)').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })

      gsap.fromTo(
        '.timeline__track span',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        }
      )

      gsap.utils.toArray('.gallery-tile').forEach((tile, index) => {
        gsap.fromTo(
          tile,
          { y: 40, rotate: index % 2 ? 1.5 : -1.5, autoAlpha: 0 },
          {
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: tile, start: 'top 92%', once: true },
          }
        )
      })

      gsap.utils.toArray('.reason-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: (index % 4) * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        )
      })

      gsap.fromTo(
        '.letter-paper',
        { y: 50, rotate: 1.2, autoAlpha: 0 },
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.letter-paper', start: 'top 82%', once: true },
        }
      )

      ScrollTrigger.create({
        trigger: '#birthday-finale',
        start: 'top 68%',
        once: true,
        onEnter: () => {
          celebrationTimer.current = window.setTimeout(() => setCelebrating(true), 1200)
        },
      })
    }, siteRef)

    return () => {
      context.revert()
      window.clearTimeout(celebrationTimer.current)
    }
  }, [isOpen])

  useEffect(() => {
    if (!surpriseOpen || !surpriseRef.current) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(
        '.surprise-card',
        { y: 26, scale: 0.96, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
      )
    }, surpriseRef)
    return () => context.revert()
  }, [surpriseOpen])

  useEffect(() => {
    if (selectedPhoto === null && !surpriseOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null)
        setSurpriseOpen(false)
      }
      if (selectedPhoto !== null && event.key === 'ArrowRight') {
        setSelectedPhoto((cur) => (cur + 1) % birthdayContent.photos.length)
      }
      if (selectedPhoto !== null && event.key === 'ArrowLeft') {
        setSelectedPhoto((cur) => (cur - 1 + birthdayContent.photos.length) % birthdayContent.photos.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedPhoto, surpriseOpen])

  return (
    <>
      <div className={`site ${isOpen ? 'site--open' : ''}`} ref={siteRef}>
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Back to the beginning">
            <Heart size={16} fill="currentColor" /> us, always
          </a>
          <nav aria-label="Main navigation">
            <a href="#our-story">Our story</a>
            <a href="#memories">Memories</a>
            <a href="#letter">A letter</a>
          </nav>
          <span className="header-date">{birthdayContent.dateLabel}</span>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="hero__grain" aria-hidden="true" />
            <div className="hero__halo hero__halo--one" aria-hidden="true" />
            <div className="hero__halo hero__halo--two" aria-hidden="true" />

            <div className="hero-copy">
              <span className="eyebrow">
                <span className="eyebrow__line" /> a little love story <span className="eyebrow__line" />
              </span>
              <h1>
                Happy birthday,<br />
                <em>{birthdayContent.name}</em>
                <span className="hero-heart"> ♥</span>
              </h1>
              <p>{birthdayContent.heroSubtitle}</p>
              <p className="hero-love-line">
                {birthdayContent.loveLine}
                <span> ♥</span>
              </p>
              <a className="text-link" href="#our-story">
                Our story <ArrowDown size={15} />
              </a>
            </div>

            <div className="hero-couple-photo" aria-label="A photo of the two of you together">
              <div className="hero-couple-photo__backing" aria-hidden="true" />
              <div className="hero-couple-photo__frame">
                <PhotoCard
                  src={birthdayContent.heroPhoto.src}
                  alt={birthdayContent.heroPhoto.alt}
                  aspectRatio="aspect-portrait"
                  className="hero-couple-photo__image"
                  placeholderText={birthdayContent.heroPhoto.caption}
                  placeholderHint="add /public/images/hero-couple.jpg"
                />
              </div>
              <span className="collage-tape" aria-hidden="true" />
              <span className="collage-note">ours, always</span>
              <span className="collage-heart" aria-hidden="true">
                ♥
              </span>
            </div>

            <span className="hero-index">
              01 <span /> 06
            </span>
            <span className="hero-side-note">made with all my heart</span>
          </section>

          <section className="story-section section-wrap" id="our-story">
            <SectionHeading eyebrow="chapter one · where it began" note="Somehow, every little moment led me right here.">
              The moments that<br />
              <em>became us.</em>
            </SectionHeading>
            <Timeline items={birthdayContent.timeline} />
            <div className="story-end reveal">
              <span>and my favorite part?</span>
              <Heart size={16} fill="currentColor" />
              <strong>we're still writing it.</strong>
            </div>
          </section>

          <section className="memories-section section-wrap" id="memories">
            <SectionHeading eyebrow="chapter two · kept close" note="A few little glimpses of what makes you so unforgettable.">
              Her beauty,<br />
              <em>in every frame.</em>
            </SectionHeading>
            <Gallery photos={birthdayContent.photos} onSelect={setSelectedPhoto} />
            <p className="gallery-note">
              <Sparkles size={14} /> Tap any photograph to view full memory.
            </p>
          </section>

          <section className="reasons-section section-wrap" id="reasons">
            <div className="reasons-intro">
              <SectionHeading eyebrow="chapter three · the little things">
                A thousand reasons.<br />
                <em>Here are four.</em>
              </SectionHeading>
              <p>And somehow, not one list could ever hold them all.</p>
            </div>
            <div className="reasons-grid">
              {birthdayContent.reasons.map((reason, index) => (
                <article className="reason-card" key={reason.title}>
                  <span className="reason-card__number">0{index + 1}</span>
                  <span className="reason-card__icon">{reason.icon}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.note}</p>
                  <span className="reason-card__glow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="letter-section section-wrap" id="letter">
            <div className="letter-heading reveal">
              <span className="eyebrow">chapter four · just for you</span>
              <h2>
                A letter, from<br />
                <em>my heart to yours.</em>
              </h2>
            </div>
            <article className="letter-paper">
              <span className="letter-paper__mark">a little keepsake</span>
              <p className="letter-salutation">Dear {birthdayContent.name},</p>
              <div className="letter-copy">
                {birthdayContent.letter.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <p className="letter-signoff">
                With all my love <span>♥</span>
              </p>
              <span className="letter-paper__date">{birthdayContent.letterDate}</span>
            </article>
          </section>

          <section className="one-more-section">
            <div className="one-more-orbit one-more-orbit--a" aria-hidden="true" />
            <div className="one-more-orbit one-more-orbit--b" aria-hidden="true" />
            <span className="eyebrow reveal">just one more thing</span>
            <p className="one-more-quote reveal">“You are not just a part of my story…”</p>
            <button className="glow-button reveal" onClick={() => setSurpriseOpen(true)}>
              <Heart size={15} /> One more thing... <ArrowUpRight size={15} />
            </button>
          </section>

          <section
            className={`finale-section ${celebrating ? 'finale-section--celebrating' : ''}`}
            id="birthday-finale"
          >
            <div className="finale-glow" aria-hidden="true" />
            {celebrating && (
              <div className="celebration" aria-hidden="true">
                {Array.from({ length: 28 }, (_, index) => (
                  <span
                    key={index}
                    style={{
                      '--x': `${(index * 37 + 5) % 100}%`,
                      '--hue': 340 + (index % 25),
                      '--delay': `${index * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            )}
            <div className="finale-content">
              <span className="eyebrow reveal">the best is still ahead</span>
              <h2 className="reveal">
                Happy birthday,<br />
                <em>{birthdayContent.name}</em>
                <span className="hero-heart"> ♥</span>
              </h2>
              <p className="finale-wish reveal">{birthdayContent.finalWish}</p>
              <PhotoCard
                src={birthdayContent.finalImage}
                alt="A black-and-white collage highlighting Benny's eyes"
                aspectRatio="aspect-portrait"
                className="finale-photo reveal"
                placeholderText="you & me forever"
              />
              <p className="finale-note reveal">{birthdayContent.finalMessage}</p>
              <span className="finale-signature reveal">
                Always yours <span>♥</span>
              </span>
            </div>
            <span className="finale-footer">made for you, with love · {birthdayContent.year}</span>
          </section>
        </main>

        <footer className="site-footer">
          <a href="#top">
            <Heart size={13} fill="currentColor" /> back to the beginning
          </a>
          <span>a story by {birthdayContent.senderName}</span>
        </footer>
      </div>

      {!isOpen && <IntroScreen name={birthdayContent.name} onOpen={() => setIsOpen(true)} />}
      <MusicControl />

      {selectedPhoto !== null && (
        <MemoryLightbox
          photos={birthdayContent.photos}
          index={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onChange={setSelectedPhoto}
        />
      )}

      {surpriseOpen && (
        <div
          className="surprise-overlay"
          ref={surpriseRef}
          role="dialog"
          aria-modal="true"
          aria-label="One more thing"
        >
          <div className="surprise-hearts" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span
                key={index}
                style={{
                  '--x': `${(index * 67 + 4) % 100}%`,
                  '--delay': `${index * 0.15}s`,
                }}
              >
                ♥
              </span>
            ))}
          </div>
          <button
            className="lightbox-close surprise-close"
            onClick={() => setSurpriseOpen(false)}
            aria-label="Close surprise"
          >
            <X size={22} />
          </button>
          <div className="surprise-card">
            <span className="surprise-card__eyebrow">
              <Sparkles size={14} /> one last little secret
            </span>
            <p>{birthdayContent.surpriseLineOne}</p>
            <span className="surprise-pause">and the truth is…</span>
            <h2>
              {birthdayContent.surpriseLineTwo}
              <span>♥</span>
            </h2>
            <button className="text-link" onClick={() => setSurpriseOpen(false)}>
              keep this close <Heart size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App