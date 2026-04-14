import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 1,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.7 0.18 230 / 8%) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
