// Add your photos inside the public/images folder (e.g. public/images/photo1.jpg)
const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const birthdayContent = {
  name: 'Benny',
  senderName: 'Tannu',
  dateLabel: 'HAPPY BIRTHDAY',
  year: '2026',
  heroPhoto: {
    src: publicAsset('/images/hero-couple.jpg'),
    alt: 'Our favorite photo together',
    caption: 'our favorite photo together',
  },
  finalImage: publicAsset('/images/gallery-eyes-1.jpg'),
  heroSubtitle: 'Happy birthday, benny my love — you are my favorite person, my peace, and my forever.',
  loveLine: 'I love you, my pyari Mannu ♥',
  timeline: [
    {
      title: 'Your eyes',
      date: 'A little spark that changed everything',
      note: 'Every time I look into your eyes, I feel something soft and unforgettable — like the whole world slows down and only you remain.',
      image: publicAsset('/images/gallery-car-selfie.jpg'),
    },
    {
      title: 'Your innocence',
      date: 'The start of it all',
      note: 'There is something so pure and innocent about you that makes my heart feel gentle and full; it is one of the many reasons I love you so deeply.',
      image: publicAsset('/images/gallery-portrait.jpg'),
    },
    {
      title: 'Your little details',
      date: 'Every ordinary day',
      note: 'The way you look, the way you glow, the way you make everything feel calmer — I notice it all and I love it more than I can say.',
      image: publicAsset('/images/gallery-closeup-1.jpg'),
    },
    {
      title: 'My forever favorite',
      date: 'And always',
      note: 'Some people admire beauty from afar; I never get tired of looking at you and feeling lucky to love you.',
      image: publicAsset('/images/gallery-closeup-2.jpg'),
    },
  ],
  photos: [
    { src: publicAsset('/images/gallery-portrait.jpg'), alt: 'Her portrait in a red outfit', caption: 'my favorite girl' },
    { src: publicAsset('/images/gallery-closeup-1.jpg'), alt: 'Her in a blue outfit', caption: 'your lovely glow' },
    { src: publicAsset('/images/gallery-closeup-2.jpg'), alt: 'A cozy close-up of her', caption: 'softest moments' },
    { src: publicAsset('/images/gallery-car-selfie.jpg'), alt: 'Her smiling in the car', caption: 'that smile' },
    { src: publicAsset('/images/gallery-eyes-1.jpg'), alt: 'A black-and-white collage highlighting her eyes', caption: 'your beautiful eyes' },
    { src: publicAsset('/images/gallery-eyes-2.jpg'), alt: 'A close-up portrait of her eyes', caption: 'the way you look at me' },
    { src: publicAsset('/images/gallery-lips-1.jpg'), alt: 'A close-up portrait of her lips', caption: 'your lovely smile' },
    { src: publicAsset('/images/gallery-lips-2.jpg'), alt: 'A close-up portrait detail of her', caption: 'every little detail' },
  ],
  reasons: [
    { icon: '✳', title: 'Your smile', note: 'The kind that makes my whole world pause and feel beautiful.' },
    { icon: '♡', title: 'Your laugh', note: 'My favorite sound, especially when you are laughing because of me.' },
    { icon: '✧', title: 'The way you care', note: 'You make love feel gentle, warm, and effortless.' },
    { icon: '∞', title: 'All of you', note: 'You are my peace, my dream, and my favorite person in every universe.' },
  ],
  letterDate: '5 October, 2026',
  letter: `Happy birthday, my pyari Benny. Humne 2 July ko kiss ki raat ko 12 bje, vo raat hum kabhi nahi bhool sakte, pyari Manu. Love from your payara Tannu.

You are my favorite person, my comfort, and the most beautiful part of my everyday life. Every second with you feels like a memory I want to hold forever. I am so lucky to have you in my life.

Aaj ka din sirf birthday nahi hai, ek aur naya chapter hai — ek chapter jahan main tumhe aur bhi pyaar karun, aur tumhe aur bhi khush rakho. I love you more than words can say, my love.`,
  surpriseLineOne: 'You are my favorite person, my sweetest memory, and my forever…',
  surpriseLineTwo: 'Always yours, my pyari Mannu.',
  finalWish: 'I hope this year brings you endless happiness, soft sunsets, warm hugs, and all the love you deserve.',
  finalMessage: 'Love from your payara Tannu ♥',
}