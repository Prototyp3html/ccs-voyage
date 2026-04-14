import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: Props) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-background"
          style={{ zIndex: 100 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="font-display text-3xl md:text-5xl gradient-text font-bold tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            WMSU CCS
          </motion.div>
          <div className="mt-8 w-48 h-0.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, oklch(0.8 0.15 195), oklch(0.7 0.18 230), oklch(0.65 0.25 300))" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-4 text-muted-foreground font-mono-alt text-sm tracking-wider">
            Loading Journey...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
