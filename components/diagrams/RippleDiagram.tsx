export default function RippleDiagram() {
  return (
    <svg
      viewBox="0 0 640 250"
      role="img"
      aria-label="A ripple passes from person to person: each one receives it, amplifies it, and passes it on. One ring is highlighted — the moment it reaches you."
      className="w-full h-auto"
    >
      {/* first emitter — the people behind us */}
      <circle cx="90" cy="115" r="5" fill="#f5f0e8" />
      <circle cx="90" cy="115" r="26" fill="none" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7" />
      <circle cx="90" cy="115" r="52" fill="none" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.45" />
      <circle cx="90" cy="115" r="78" fill="none" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.25" />

      {/* second emitter — received, re-emitted */}
      <circle cx="300" cy="115" r="5" fill="#f5f0e8" />
      <circle cx="300" cy="115" r="26" fill="none" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7" />
      <circle cx="300" cy="115" r="52" fill="none" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.4" />

      {/* third emitter — you; the red ring is the echo arriving */}
      <circle cx="490" cy="115" r="5" fill="#e74c3c" />
      <circle cx="490" cy="115" r="26" fill="none" stroke="#e74c3c" strokeWidth="2" opacity="0.9" />
      <circle cx="490" cy="115" r="52" fill="none" stroke="#e74c3c" strokeWidth="1.5" opacity="0.35" />
      <text x="490" y="90" textAnchor="middle" fill="#e74c3c" fontSize="13" fontWeight="bold">
        you
      </text>

      {/* arrow onward */}
      <line x1="548" y1="115" x2="600" y2="115" stroke="#888888" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 600 115 l -8 -5 v 10 z" fill="#888888" />

      <text x="320" y="225" textAnchor="middle" fill="#888888" fontSize="12" letterSpacing="2">
        RECEIVED → AMPLIFIED → PASSED ON
      </text>
    </svg>
  );
}
