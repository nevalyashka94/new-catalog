export default function HeroCar() {
  return (
    <div className="relative mx-auto aspect-[16/7] w-full max-w-4xl">
      {/* Showroom spotlight */}
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(240,201,137,0.16), rgba(240,201,137,0.04) 55%, transparent 75%)",
        }}
      />

      {/* Sweeping light beam */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <div
          className="animate-sweep absolute -top-1/2 h-[220%] w-[10%]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(242,240,234,0.10), transparent)",
          }}
        />
      </div>

      <svg
        viewBox="0 0 900 320"
        fill="none"
        className="relative h-full w-full"
        aria-hidden="true"
      >
        {/* Ground reflection line */}
        <line x1="60" y1="255" x2="840" y2="255" stroke="var(--color-cloud)" strokeOpacity="0.08" strokeWidth="1" />

        {/* Car silhouette — self-draws once on load */}
        <path
          d="M 110 220
             C 130 190, 170 168, 225 162
             C 260 140, 320 108, 400 100
             C 470 93, 520 96, 560 112
             C 610 100, 680 104, 730 130
             C 770 148, 800 170, 812 196
             L 812 218
             C 812 228, 804 234, 792 234
             L 700 234
             C 700 200, 672 176, 638 176
             C 604 176, 576 200, 576 234
             L 330 234
             C 330 200, 302 176, 268 176
             C 234 176, 206 200, 206 234
             L 128 234
             C 116 234, 110 228, 110 220 Z"
          stroke="var(--color-chrome-300)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="animate-draw-line"
        />

        {/* Cabin line */}
        <path
          d="M 240 160 C 300 118, 380 100, 450 100 C 500 100, 545 108, 560 112"
          stroke="var(--color-cloud)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="animate-draw-line"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Wheels */}
        <circle cx="268" cy="234" r="34" stroke="var(--color-chrome-300)" strokeWidth="2.5" />
        <circle cx="268" cy="234" r="14" stroke="var(--color-chrome-600)" strokeWidth="1.5" />
        <circle cx="638" cy="234" r="34" stroke="var(--color-chrome-300)" strokeWidth="2.5" />
        <circle cx="638" cy="234" r="14" stroke="var(--color-chrome-600)" strokeWidth="1.5" />

        {/* Headlight */}
        <circle cx="805" cy="188" r="6" fill="var(--color-bronze-glow)" className="animate-headlight" />
      </svg>
    </div>
  );
}
