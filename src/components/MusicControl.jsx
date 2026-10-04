import { useRef, useState } from 'react'
import { Music2 } from 'lucide-react'

function MusicControl() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/our-song.mpeg`}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <button
        className={`music-control ${playing ? 'music-control--playing' : ''}`}
        onClick={toggleMusic}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        <span className="music-control__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <Music2 size={14} />
        <span>{playing ? 'now playing' : 'our song'}</span>
      </button>
    </>
  )
}

export default MusicControl