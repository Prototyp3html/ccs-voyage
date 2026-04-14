export default function FooterSection() {
  return (
    <footer className="relative py-16 px-4">
      {/* Glowing divider */}
      <div className="max-w-3xl mx-auto mb-12 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.18 230 / 50%), oklch(0.65 0.25 300 / 50%), transparent)" }} />

      <div className="text-center">
        <div className="font-display text-sm tracking-[0.25em] gradient-text font-bold mb-2">
          WMSU CCS
        </div>
        <p className="text-muted-foreground text-xs font-mono-alt tracking-wider">
          College of Computing Studies - Bachelor of Science in Information Technology
        </p>
        <p className="text-muted-foreground/50 text-[10px] font-mono-alt mt-4 tracking-wider">
          OJT Educational Tour / Industry Visit and Educational Tour (IVET)
        </p>
      </div>
    </footer>
  );
}
