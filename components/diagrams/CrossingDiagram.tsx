export default function CrossingDiagram() {
  return (
    <svg
      viewBox="0 0 640 250"
      role="img"
      aria-label="Two curves cross: the number of people falling rises with city size while the number caught before the ground falls. The crossing point is nobody's job."
      className="w-full h-auto"
    >
      {/* axes */}
      <line x1="40" y1="210" x2="610" y2="210" stroke="#222222" strokeWidth="1" />
      <line x1="40" y1="30" x2="40" y2="210" stroke="#222222" strokeWidth="1" />
      <text x="325" y="238" textAnchor="middle" fill="#888888" fontSize="12" letterSpacing="2">
        CITY SIZE →
      </text>

      {/* people falling: rises */}
      <path
        d="M 45 195 C 220 185, 440 110, 600 52"
        fill="none"
        stroke="#f5f0e8"
        strokeWidth="2"
      />
      <text x="598" y="40" textAnchor="end" fill="#f5f0e8" fontSize="13">
        people falling
      </text>

      {/* people caught: falls */}
      <path
        d="M 45 45 C 200 60, 420 150, 600 188"
        fill="none"
        stroke="#888888"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <text x="598" y="206" textAnchor="end" fill="#888888" fontSize="13">
        people caught before the ground
      </text>

      {/* the crossing */}
      <circle cx="356" cy="122" r="6" fill="#e74c3c" />
      <line x1="356" y1="128" x2="356" y2="210" stroke="#e74c3c" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
      <text x="368" y="112" fill="#e74c3c" fontSize="13" fontWeight="bold">
        the crossing — nobody&apos;s job
      </text>
    </svg>
  );
}
