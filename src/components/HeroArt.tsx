// Simple illustrated pool scene (placeholder until real photography is supplied).
export function HeroArt() {
  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" role="img" aria-label="Illustration of a pool by the sea" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="420" fill="#dfe9e6" />
      <circle cx="470" cy="90" r="38" fill="#f2e3b3" />
      <rect y="170" width="600" height="60" fill="#a9cfd0" />
      <rect y="230" width="600" height="190" fill="#e9dcc3" />
      <rect x="90" y="120" width="230" height="110" fill="#f4efe6" />
      <rect x="110" y="140" width="190" height="55" fill="#6f98a0" />
      <g fill="#c9dadb">
        <rect x="125" y="146" width="40" height="43" />
        <rect x="175" y="146" width="40" height="43" />
        <rect x="225" y="146" width="40" height="43" />
      </g>
      <path d="M180 300 L520 300 L560 380 L140 380 Z" fill="#f4efe6" />
      <path d="M200 312 L500 312 L532 368 L168 368 Z" fill="#1aa3ad" />
      <path d="M215 330 q40 -12 80 0 t80 0 t80 0" fill="none" stroke="#7fd3d8" strokeWidth="3" />
      <g stroke="#2d5b57" strokeWidth="6" fill="none">
        <path d="M60 330 V230" />
      </g>
      <g fill="#2f7a66">
        <path d="M60 232 q-45 -10 -50 28 q35 -25 50 -28Z" />
        <path d="M60 232 q40 -25 55 10 q-35 -12 -55 -10Z" />
        <path d="M60 232 q-10 -45 25 -45 q-12 22 -25 45Z" />
      </g>
    </svg>
  );
}
