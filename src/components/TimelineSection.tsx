import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const days = [
  {
    day: 1,
    title: "Arrival & Historic Manila",
    location: "Manila",
    icon: "🏛️",
    color: "oklch(0.8 0.15 195)",
    summary: "Touched down at NAIA and dove into Manila's rich history.",
    details: "Explored Intramuros, Fort Santiago, Rizal Park, Manila Cathedral, San Agustin Church, the Cultural Center of the Philippines, and ended the day at SM Mall of Asia.",
  },
  {
    day: 2,
    title: "Industry Immersion",
    location: "Manila",
    icon: "⚡",
    color: "oklch(0.7 0.18 230)",
    summary: "Inside the engines of Philippine tech industry.",
    details: "Visited Hytec Power Inc. to explore power solutions and OpenText Philippines, Inc. to learn about enterprise information management.",
  },
  {
    day: 3,
    title: "Creative Studios",
    location: "Manila",
    icon: "🎨",
    color: "oklch(0.65 0.25 300)",
    summary: "Where imagination meets technology.",
    details: "Visited Top Peg Animation and Creative Studio, Inc. and Teleperformance Philippines — witnessing how Filipino creatives and service professionals deliver world-class work through technology.",
  },
  {
    day: 4,
    title: "Smart City & Outsourcing",
    location: "Manila",
    icon: "🌐",
    color: "oklch(0.8 0.15 195)",
    summary: "Technology powering a megacity.",
    details: "Toured the MMDA Command Center — the nerve center of Metro Manila's traffic management — and MicroSourcing Philippines, Inc. for insights into the BPO industry.",
  },
  {
    day: 5,
    title: "Tagaytay Escape",
    location: "Tagaytay",
    icon: "🏔️",
    color: "oklch(0.75 0.15 160)",
    summary: "Breathing fresh air above the clouds.",
    details: "A holiday adjustment brought us to Tagaytay — People's Park in the Sky for panoramic views and Sky Ranch for thrilling rides with a view of Taal Volcano.",
  },
  {
    day: 6,
    title: "Baguio City",
    location: "Baguio",
    icon: "🌲",
    color: "oklch(0.7 0.18 230)",
    summary: "The City of Pines welcomed us.",
    details: "Explored the cool mountain city of Baguio — a blend of culture, nature, and heritage. A refreshing contrast to the urban intensity of Manila.",
  },
  {
    day: 7,
    title: "Departure & Reflection",
    location: "Home",
    icon: "✈️",
    color: "oklch(0.65 0.25 300)",
    summary: "Carrying memories and knowledge home.",
    details: "Said goodbye to new friends and familiar places. Departed with hearts full of gratitude, minds expanded by experience, and bonds strengthened by the journey.",
  },
];

function DayCard({ day, index }: { day: typeof days[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="md:w-5/12 w-full"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="glass-card rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] group"
          style={{
            boxShadow: expanded
              ? `0 0 30px ${day.color.replace(")", " / 25%)")}, 0 0 80px ${day.color.replace(")", " / 8%)")}`
              : `0 0 15px ${day.color.replace(")", " / 10%)")}`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{day.icon}</span>
            <div>
              <span className="font-display text-xs tracking-widest uppercase" style={{ color: day.color }}>
                Day {day.day}
              </span>
              <span className="text-xs text-muted-foreground ml-2">• {day.location}</span>
            </div>
          </div>
          <h3 className="font-mono-alt text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-glow-blue transition-all">
            {day.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{day.summary}</p>
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 text-sm mt-3 pt-3 border-t border-glass-border leading-relaxed">
              {day.details}
            </p>
          </motion.div>
          <div className="mt-3 text-xs font-mono-alt" style={{ color: day.color }}>
            {expanded ? "Click to collapse ↑" : "Click to expand ↓"}
          </div>
        </div>
      </motion.div>

      {/* Center node */}
      <div className="hidden md:flex flex-col items-center md:w-2/12">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: day.color,
            boxShadow: `0 0 12px ${day.color.replace(")", " / 50%)")}`,
            background: day.color,
          }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
}

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="relative py-24 md:py-32 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24"
      >
        <span className="font-mono-alt text-sm tracking-[0.3em] text-neon-cyan uppercase">The Journey</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text mt-4 tracking-wider">
          7 Days of Discovery
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        {/* Glowing vertical line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, oklch(0.7 0.18 230 / 40%), oklch(0.65 0.25 300 / 40%), transparent)" }} />

        <div className="space-y-12 md:space-y-16">
          {days.map((day, i) => (
            <DayCard key={day.day} day={day} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
