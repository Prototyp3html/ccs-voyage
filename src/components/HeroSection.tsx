import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const subtexts = ["7 Days.", "3 Cities.", "Endless Learning."];

export default function HeroSection() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (typedIndex >= subtexts.length) {
      const t = setTimeout(() => {
        setTypedIndex(0);
        setCharIndex(0);
        setCurrentText("");
      }, 1200);
      return () => clearTimeout(t);
    }

    const target = subtexts[typedIndex];
    if (charIndex <= target.length) {
      const t = setTimeout(() => {
        setCurrentText(target.slice(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTypedIndex(typedIndex + 1);
        setCharIndex(0);
        setCurrentText("");
      }, 800);
      return () => clearTimeout(t);
    }
  }, [typedIndex, charIndex]);

  const fullSubtext = subtexts.slice(0, typedIndex).join(" ") + (typedIndex < subtexts.length ? " " + currentText : "");

  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "oklch(0.7 0.18 230)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "oklch(0.65 0.25 300)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: "oklch(0.8 0.15 195)" }} />

      <div className="relative text-center max-w-5xl mx-auto" style={{ zIndex: 2 }}>
        {/* Themed watermark behind hero copy */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(110vw,900px)] aspect-square pointer-events-none select-none">
          <img
            src="/ccs-seal.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              opacity: 0.16,
              filter: "hue-rotate(140deg) saturate(1.22) brightness(1.04) contrast(1.05) blur(0.45px)",
              maskImage: "radial-gradient(circle at center, black 42%, transparent 88%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 42%, transparent 88%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, oklch(0.13 0.02 270 / 52%) 88%)",
              filter: "blur(8px)",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <span className="font-mono-alt text-sm md:text-base tracking-[0.3em] text-neon-cyan uppercase">
              Educational Tour 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight tracking-wider"
          >
            CCS - BSIT
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">OJT / IVET Tour</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 font-mono-alt text-lg md:text-2xl text-muted-foreground tracking-wide min-h-[2em]"
          >
            {fullSubtext}
            <span className="animate-[pulse-glow_1s_infinite] text-neon-cyan">|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-12"
          >
            <button
              onClick={scrollToTimeline}
              className="group relative font-display text-sm md:text-base tracking-widest uppercase px-10 py-4 rounded-full glow-border text-neon-cyan transition-all duration-500 hover:glow-blue hover:scale-105 cursor-pointer"
              style={{ background: "oklch(0.15 0.02 270 / 60%)" }}
            >
              <span className="relative" style={{ zIndex: 1 }}>Start Journey</span>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, oklch(0.7 0.18 230 / 15%), oklch(0.65 0.25 300 / 15%))" }} />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-neon-blue/40 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-neon-blue/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
