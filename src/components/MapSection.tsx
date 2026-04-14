import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stops = [
  { name: "MANILA", days: "Day 1–4", desc: "Historic sites, tech companies, creative studios", x: 226, y: 345, lat: "14.60°N", lng: "120.98°E" },
  { name: "TAGAYTAY", days: "Day 5", desc: "People's Park, Sky Ranch, Taal views", x: 214, y: 372, lat: "14.12°N", lng: "120.96°E" },
  { name: "BAGUIO", days: "Day 6", desc: "City of Pines exploration", x: 208, y: 228, lat: "16.40°N", lng: "120.60°E" },
];

// Hand-tuned silhouette based on Luzon reference shape
const luzonOutline = `
  M 252 72
  C 236 75, 220 86, 210 106
  C 199 126, 194 150, 196 173
  C 198 197, 191 217, 182 232
  C 172 249, 167 266, 170 284
  C 173 302, 183 318, 197 328
  C 209 337, 213 347, 207 356
  C 201 366, 201 375, 213 381
  C 224 387, 231 396, 232 408
  C 233 420, 240 432, 252 434
  C 265 436, 274 429, 276 417
  C 278 404, 286 395, 300 390
  C 315 385, 325 374, 327 361
  C 330 345, 323 330, 313 316
  C 303 302, 300 292, 307 281
  C 315 269, 327 255, 336 239
  C 345 220, 347 200, 339 186
  C 331 172, 330 159, 337 147
  C 344 134, 342 120, 331 108
  C 318 95, 301 87, 286 80
  C 273 74, 261 71, 252 72
  Z
`;

// Bicol peninsula extension
const bicolPeninsula = `
  M 300 390
  C 318 396, 334 409, 346 427
  C 357 445, 365 464, 364 478
  C 363 488, 356 493, 348 490
  C 339 486, 332 476, 327 464
  C 321 450, 314 438, 306 425
  C 299 414, 295 402, 300 390
  Z
`;

// Mindoro and nearby islets included in the Luzon island group reference
const southwestIslands = `
  M 194 396
  C 182 402, 174 414, 174 426
  C 174 440, 184 452, 198 454
  C 212 456, 224 446, 226 432
  C 228 418, 220 405, 208 398
  C 203 395, 198 394, 194 396
  Z
  M 236 448
  C 231 452, 231 460, 238 463
  C 245 466, 252 462, 253 455
  C 253 449, 246 445, 240 446
  C 238 446, 237 447, 236 448
  Z
  M 216 466
  C 211 470, 211 478, 217 482
  C 223 486, 231 484, 234 478
  C 236 472, 232 465, 226 463
  C 222 462, 218 463, 216 466
  Z
`;

// Route connecting Manila -> Tagaytay -> Baguio
const routePath = `M 226 345 C 223 352, 218 362, 214 372`;
const routePath2 = `M 214 372 C 213 342, 210 292, 208 228`;

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-_";

function ScrambleText({ value, shouldAnimate, className }: { value: string; shouldAnimate: boolean; className?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) {
      setDisplayValue(value);
      return;
    }

    hasAnimated.current = true;

    let active = true;
    const start = performance.now();

    const intervalId = window.setInterval(() => {
      const progress = Math.min((performance.now() - start) / 900, 1);
      const revealedLength = Math.floor(progress * value.length);

      const nextValue = value
        .split("")
        .map((character, index) => {
          if (index < revealedLength) return character;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      if (active) {
        setDisplayValue(nextValue);
      }

      if (progress >= 1) {
        window.clearInterval(intervalId);
        if (active) setDisplayValue(value);
      }
    }, 45);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [value, shouldAnimate]);

  return <span className={className}>{displayValue}</span>;
}

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [startStatsScramble, setStartStatsScramble] = useState(false);

  return (
    <section id="map" className="relative py-24 md:py-32 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="font-mono-alt text-sm tracking-[0.3em] text-neon-cyan uppercase">Route Map</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text mt-4 tracking-wider">
          Our Path Across Luzon
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-md lg:max-w-lg flex-shrink-0"
          >
            <div className="relative p-4 md:p-6 overflow-visible">
              {/* Soft ambient fields to blend the map with the page background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 56% 50%, oklch(0.3 0.12 270 / 15%) 0%, transparent 72%)",
                }}
              />
              <div
                className="absolute -inset-8 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 52%, oklch(0.18 0.06 235 / 22%) 0%, transparent 68%)",
                  filter: "blur(26px)",
                }}
              />

              <svg viewBox="120 40 260 450" className="w-full h-auto relative z-10">
                <defs>
                  <filter id="mapGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="heavyGlow" x="-65%" y="-65%" width="230%" height="230%">
                    <feGaussianBlur stdDeviation="5.2" result="softBlur" />
                    <feMerge>
                      <feMergeNode in="softBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="markerPulse" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="4.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="routeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="routeGradientGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.24" />
                  </linearGradient>
                  {/* Terrain texture */}
                  <radialGradient id="terrainGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#1a1a2e" />
                    <stop offset="60%" stopColor="#0f0f1a" />
                    <stop offset="100%" stopColor="#080810" />
                  </radialGradient>
                </defs>

                {/* Island fill with subtle terrain */}
                <motion.path
                  d={luzonOutline}
                  fill="url(#terrainGrad)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Island outline glow */}
                <motion.path
                  d={luzonOutline}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                />
                {/* Island outline main */}
                <motion.path
                  d={luzonOutline}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                  transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Bicol peninsula fill */}
                <motion.path
                  d={bicolPeninsula}
                  fill="url(#terrainGrad)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                {/* Bicol peninsula outline glow */}
                <motion.path
                  d={bicolPeninsula}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />
                <motion.path
                  d={bicolPeninsula}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />

                {/* Southwest island group */}
                <motion.path
                  d={southwestIslands}
                  fill="url(#terrainGrad)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
                <motion.path
                  d={southwestIslands}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1"
                  strokeOpacity="0.12"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
                />
                <motion.path
                  d={southwestIslands}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                  transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
                />

                {/* Terrain ridges */}
                {isInView && (
                  <g opacity="0.08">
                    <motion.path d="M 200 125 Q 246 112 294 128" fill="none" stroke="#64748b" strokeWidth="0.8"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
                    <motion.path d="M 196 192 Q 246 183 301 198" fill="none" stroke="#64748b" strokeWidth="0.6"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }} />
                    <motion.path d="M 198 268 Q 238 260 286 273" fill="none" stroke="#64748b" strokeWidth="0.5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }} />
                    <motion.path d="M 316 418 Q 340 444 350 478" fill="none" stroke="#64748b" strokeWidth="0.5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }} />
                  </g>
                )}

                {/* Route glow layer */}
                <motion.path
                  d={routePath}
                  fill="none"
                  stroke="url(#routeGradientGlow)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#heavyGlow)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.1, delay: 2.5, ease: "easeInOut" }}
                />
                <motion.path
                  d={routePath2}
                  fill="none"
                  stroke="url(#routeGradientGlow)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#heavyGlow)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.1, delay: 3.6, ease: "easeInOut" }}
                />

                {/* Route main line */}
                <motion.path
                  d={routePath}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.1, delay: 2.5, ease: "easeInOut" }}
                />
                <motion.path
                  d={routePath2}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.1, delay: 3.6, ease: "easeInOut" }}
                />

                {/* City markers */}
                {stops.map((stop, i) => {
                  const color = stop.name === "BAGUIO" ? "#A855F7" : "#22D3EE";
                  const isActive = activeStop === i;
                  const labelX = stop.name === "MANILA" ? stop.x + 18 : stop.name === "TAGAYTAY" ? stop.x - 78 : stop.x - 68;
                  const labelY = stop.y + 5;

                  return (
                    <g
                      key={stop.name}
                      onMouseEnter={() => setActiveStop(i)}
                      onMouseLeave={() => setActiveStop(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Outer pulse */}
                      <motion.circle
                        cx={stop.x} cy={stop.y} r="14"
                        fill="none"
                        stroke={color}
                        strokeWidth="0.9"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? {
                          opacity: [0.25, 0, 0.25],
                          scale: [1, 1.7, 1],
                        } : {}}
                        transition={{ duration: 4, repeat: Infinity, delay: 3 + i * 0.6 }}
                        style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
                      />
                      {/* Glow circle */}
                      <motion.circle
                        cx={stop.x} cy={stop.y}
                        r={isActive ? 10 : 7}
                        fill={color}
                        opacity={isActive ? 0.25 : 0.14}
                        filter="url(#markerPulse)"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ type: "spring", delay: 3 + i * 0.6 }}
                        style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
                      />
                      {/* Core dot */}
                      <motion.circle
                        cx={stop.x} cy={stop.y}
                        r={isActive ? 5 : 3.5}
                        fill={color}
                        stroke="#030712"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ type: "spring", delay: 3 + i * 0.6 }}
                        style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
                      />
                      {/* Label */}
                      <motion.text
                        x={labelX}
                        y={labelY}
                        fill={color}
                        fontSize="10"
                        fontFamily="'Space Grotesk', monospace"
                        fontWeight="700"
                        letterSpacing="0.15em"
                        textAnchor={stop.name === "MANILA" ? "start" : "start"}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: isActive ? 1 : 0.8 } : {}}
                        transition={{ delay: 3.5 + i * 0.5 }}
                      >
                        {stop.name}
                      </motion.text>

                      {/* Tooltip on hover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.g
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <rect
                              x={stop.x - 55}
                              y={stop.y - 40}
                              width="110"
                              height="26"
                              rx="6"
                              fill="#0f172a"
                              stroke={color}
                              strokeWidth="0.8"
                              strokeOpacity="0.5"
                            />
                            <text
                              x={stop.x}
                              y={stop.y - 23}
                              fill="#94a3b8"
                              fontSize="8"
                              fontFamily="'Space Grotesk', monospace"
                              textAnchor="middle"
                            >
                              {stop.lat}, {stop.lng}
                            </text>
                          </motion.g>
                        )}
                      </AnimatePresence>
                    </g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Stop detail cards */}
          <div className="flex flex-col gap-5 w-full lg:max-w-sm">
            {stops.map((stop, i) => {
              const color = stop.name === "BAGUIO" ? "#A855F7" : "#22D3EE";
              const glowColor = stop.name === "BAGUIO" ? "oklch(0.65 0.25 300 / 25%)" : "oklch(0.8 0.15 195 / 25%)";
              const isActive = activeStop === i;

              return (
                <motion.div
                  key={stop.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 3.5 + i * 0.3 }}
                  onMouseEnter={() => setActiveStop(i)}
                  onMouseLeave={() => setActiveStop(null)}
                  className="glass-card rounded-2xl p-5 transition-all duration-300 cursor-default"
                  style={{
                    boxShadow: isActive ? `0 0 30px ${glowColor}` : `0 0 10px ${glowColor}`,
                    borderColor: isActive ? `${color}66` : `${color}26`,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 10px ${color}88` }} />
                    <h3 className="font-display text-base font-bold tracking-wider" style={{ color }}>
                      {stop.name}
                    </h3>
                    <span
                      className="ml-auto font-mono-alt text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${color}1a`, color, border: `1px solid ${color}40` }}
                    >
                      {stop.days}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2 pl-5">{stop.desc}</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono-alt text-muted-foreground/50 pl-5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span>{stop.lat}, {stop.lng}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 4.5 }}
          onAnimationComplete={() => {
            if (isInView && !startStatsScramble) {
              setStartStatsScramble(true);
            }
          }}
          className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {[
            { label: "Total Distance", value: "~500 km" },
            { label: "Cities Visited", value: "3" },
            { label: "Days of Travel", value: "7" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-xl md:text-2xl font-bold gradient-text tracking-wider">
                <ScrambleText value={stat.value} shouldAnimate={startStatsScramble} />
              </div>
              <div className="font-mono-alt text-[10px] tracking-wider text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
