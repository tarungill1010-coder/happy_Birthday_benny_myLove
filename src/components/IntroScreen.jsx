import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Heart, Sparkles } from 'lucide-react'

function IntroScreen({ name, onOpen }) {
  const screenRef = useRef(null)
  const [opening, setOpening] = useState(false)

  const openStory = () => {
    if (opening) return
    setOpening(true)
    const screen = screenRef.current
    const timeline = gsap.timeline({
      onComplete: onOpen,
    })

    timeline
      .to('.intro-screen__content > *', {
        y: -20,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.in',
      })
      .to(
        '.intro-screen__particles span',
        {
          x: (i) => (i % 2 ? 1 : -1) * (140 + (i % 5) * 40),
          y: (i) => (i % 3 - 1) * 160,
          scale: 2.2,
          autoAlpha: 0,
          duration: 0.9,
          stagger: { each: 0.008, from: 'random' },
          ease: 'power3.in',
        },
        '-=0.2'
      )
      .to(
        screen,
        {
          scale: 1.05,
          autoAlpha: 0,
          duration: 0.95,
          ease: 'power3.inOut',
        },
        '-=0.6'
      )
  }

  return (
    <section className="intro-screen" ref={screenRef} aria-label="Birthday surprise introduction">
      <div className="intro-screen__particles" aria-hidden="true">
        {Array.from({ length: 42 }, (_, index) => (
          <span
            key={index}
            style={{
              '--x': `${(index * 71 + 11) % 100}%`,
              '--y': `${(index * 47 + 9) % 100}%`,
              '--size': `${1.5 + (index % 3)}px`,
              '--duration': `${3.5 + (index % 4)}s`,
              '--delay': `${index * -0.3}s`,
            }}
          />
        ))}
      </div>
      <div className="intro-screen__content">
        <span className="intro-mark">
          <Heart size={20} fill="currentColor" />
        </span>
        <span className="eyebrow">a little something, just for you</span>
        <h1>
          Hey, <em>{name}</em> <span className="hero-heart">♥</span>
        </h1>
        <p>I made something special for you...</p>
        <button className="intro-button" onClick={openStory} disabled={opening}>
          Open your surprise <Sparkles size={16} />
        </button>
      </div>
      <span className="intro-screen__footnote">a story made with love · take your time</span>
    </section>
  )
}

export default IntroScreen