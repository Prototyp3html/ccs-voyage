import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reflections = [
  {
    icon: "🎓",
    title: "Learning Beyond Walls",
    text: "Classrooms taught us theory, but seeing MMDA's command center, Hytec's power solutions, and MicroSourcing's operations showed us how computing shapes the real world.",
  },
  {
    icon: "🏢",
    title: "Industry Exposure",
    text: "From OpenText's enterprise solutions and Teleperformance Philippines' service platforms to Top Peg's animation pipelines, we witnessed firsthand the diverse careers awaiting IT graduates.",
  },
  {
    icon: "🤝",
    title: "Bonds & Memories",
    text: "Seven days of shared adventures, late-night talks, and new friendships forged a bond no classroom could create.",
  },
  {
    icon: "🌟",
    title: "Inspired Futures",
    text: "We returned home not just with photos, but with a clearer vision of who we want to become as computing professionals.",
  },
];

export default function ReflectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reflections" className="relative py-24 md:py-32 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="font-mono-alt text-sm tracking-[0.3em] text-neon-cyan uppercase">Reflections</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text mt-4 tracking-wider">
          What We Gained
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto font-mono-alt">
          More than a tour — a transformation.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {reflections.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card rounded-2xl p-6 md:p-8 group hover:glow-purple transition-all duration-500 hover:scale-[1.02]"
          >
            <span className="text-3xl mb-4 block">{r.icon}</span>
            <h3 className="font-display text-sm md:text-base font-bold tracking-wider text-neon-purple group-hover:text-glow-purple transition-all mb-3">
              {r.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
