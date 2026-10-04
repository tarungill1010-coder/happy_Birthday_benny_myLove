# A Little Love Story

An editable birthday experience built with React, Vite, Tailwind CSS, GSAP + ScrollTrigger, and Lucide.

## Make it yours

1. Edit `src/data/birthdayContent.js` first. Replace the name, sender, dates, timeline memories, reasons, letter, surprise reveal, and birthday wishes.
2. Add your one photo together as `public/images/our-photo.jpg`. Add her solo photos as `photo1.jpg`–`photo5.jpg` (and optionally `final.jpg`) for the timeline, gallery, and birthday finale. See `public/images/README.md` for details. Until you add them, the page shows designed placeholders; no stock or real-person photos are bundled.
3. Optionally add `our-song.mp3` to `public/music/`. The music button is off by default and only plays after a click.
4. Run `npm run dev` to preview locally. Use `npm run build` for a production build.

The single-page experience starts with a cinematic opening screen and unfolds into a relationship timeline, tap-to-open memory gallery, personal notes, handwritten-style letter, interactive surprise, and birthday finale. It is responsive and supports lightbox keyboard arrows, Escape, and mobile swipes.

## Deploy to GitHub Pages

The GitHub Actions workflow builds and deploys this site to GitHub Pages whenever changes are pushed to `main`. Enable Pages for the repository with **Settings → Pages → Build and deployment → Source → GitHub Actions** if it is not already enabled. The published site will be available at `https://tarungill1010-coder.github.io/happy_Birthday_benny_myLove/`.
