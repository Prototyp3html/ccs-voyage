import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Journey", target: "timeline" },
  { label: "Route", target: "map" },
  { label: "Gallery", target: "gallery" },
  { label: "Reflections", target: "reflections" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = navItems.map((n) => ({
        id: n.target,
        el: document.getElementById(n.target),
      }));
      let current = "";
      for (const s of sections) {
        if (s.el && s.el.getBoundingClientRect().top <= 200) {
          current = s.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        scrolled ? "glass-card shadow-lg" : "bg-transparent"
      }`}
      style={{ zIndex: 50 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-14 md:h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-sm md:text-base tracking-[0.2em] gradient-text font-bold cursor-pointer"
        >
          WMSU CCS
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`relative font-mono-alt text-xs tracking-wider px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                active === item.target
                  ? "text-neon-cyan"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === item.target && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-full glow-border"
                  style={{ background: "oklch(0.7 0.18 230 / 8%)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative" style={{ zIndex: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-neon-cyan rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-neon-cyan rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-neon-cyan rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-glass-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className={`block w-full text-left font-mono-alt text-sm tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                    active === item.target
                      ? "text-neon-cyan glow-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={active === item.target ? { background: "oklch(0.7 0.18 230 / 8%)" } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
