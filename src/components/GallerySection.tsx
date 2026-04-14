import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TourPhoto = {
  src: string;
  caption: string;
};

type MemoryItem = {
  title: string;
  desc: string;
  detail: string;
  gradient: string;
  photos: TourPhoto[];
};

const placeholderPhotos = (label: string): TourPhoto[] => [
  { src: "/placeholder.svg", caption: label },
  { src: "/placeholder.svg", caption: label },
  { src: "/placeholder.svg", caption: label },
];

const memories: MemoryItem[] = [
  {
    title: "City Tour",
    desc: "Exploring Manila's cultural landmarks and urban highlights",
    detail: "We arrived at Ninoy Aquino International Airport (NAIA) and were picked up by our tour agency, marking the start of our educational journey. Our first day was spent exploring Manila's rich history. We visited Intramuros and Fort Santiago, where we learned about the country's past. We also stopped by Rizal Park, Manila Cathedral, and San Agustin Church. The tour continued at the Cultural Center of the Philippines, and we ended the day at SM Mall of Asia for some relaxation. Day 1 gave us a great introduction to Manila's culture, history, and vibrant atmosphere.",
    gradient: "from-cyan-900/40 to-blue-900/40",
    photos: [
      { src: "/city_tour/IMG_6521.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6533.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6557.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6563.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6572.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6575.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6577.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6579.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6580.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6587.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6590.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6595.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6605.jpg", caption: "City Tour" },
      { src: "/city_tour/IMG_6645.jpg", caption: "City Tour" },
    ],
  },
  {
    title: "Hytec Power",
    desc: "Innovation in energy",
    detail: "We visited Hytec Power Inc., where we were introduced to real-world engineering and power system solutions. The visit gave us insights into how technology is applied in industrial operations, including automation and system integration. It was a valuable experience that helped us understand how our knowledge in computing can be used in practical, industry-based environments.",
    gradient: "from-purple-900/40 to-pink-900/40",
    photos: [
      { src: "/hytec_power_inc/IMG_6661.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6752.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6766.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6772.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6775.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6785.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6793.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6800.jpg", caption: "Hytec Power" },
      { src: "/hytec_power_inc/IMG_6806%201.jpg", caption: "Hytec Power" },
    ],
  },
  {
    title: "OpenText",
    desc: "Enterprise technology at scale",
    detail: "We visited OpenText Philippines, Inc., where we were introduced to enterprise-level software and information management systems. During the visit, we learned how companies handle large-scale data, cybersecurity, and digital transformation in real-world environments. It gave us a clearer understanding of how our skills in computing can be applied in global IT solutions.",
    gradient: "from-teal-900/40 to-cyan-900/40",
    photos: [
      { src: "/opentext/IMG_6829.jpg", caption: "OpenText" },
      { src: "/opentext/IMG_6830.jpg", caption: "OpenText" },
      { src: "/opentext/IMG_6836.jpg", caption: "OpenText" },
      { src: "/opentext/IMG_6839.jpg", caption: "OpenText" },
      { src: "/opentext/IMG_6857.jpg", caption: "OpenText" },
      { src: "/opentext/IMG_6859.jpg", caption: "OpenText" },
      { src: "/opentext/29a0108985eba83ead69c450f9e9a459.JPEG", caption: "OpenText" },
      { src: "/opentext/eb2cc082a42bccede2347b74f5e8a72e.JPEG", caption: "OpenText" },
    ],
  },
  {
    title: "Top Peg Studio",
    desc: "Animation magic",
    detail: "We visited Top Peg Animation and Creative Studio, Inc., where we were introduced to the world of animation and digital content creation. During the visit, we learned about the animation pipeline, from concept design to final production, as well as the tools and skills used in the creative industry. It gave us insight into how technology and creativity work together in producing high-quality visual content.",
    gradient: "from-indigo-900/40 to-blue-900/40",
    photos: [
      { src: "/top_peg_animation/IMG_6897.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6902.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6909.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6911.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6915.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6923.jpg", caption: "Top Peg" },
      { src: "/top_peg_animation/IMG_6930.jpg", caption: "Top Peg" },
    ],
  },
  {
    title: "Teleperformance Philippines (TP)",
    desc: "Global customer experience operations",
    detail: "We visited Teleperformance Philippines, where we were introduced to the world of customer experience management and business process outsourcing (BPO). During the visit, we learned how technology supports customer service operations, including communication systems, data handling, and performance monitoring. It gave us insight into how IT plays a vital role in delivering efficient and high-quality global services.",
    gradient: "from-fuchsia-900/40 to-violet-900/40",
    photos: [
      { src: "/teleperformance/IMG_6940.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6942.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6943.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6944.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6945.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6953.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/IMG_6960.jpg", caption: "Teleperformance" },
      { src: "/teleperformance/54f5f93166630417103b50a351dd58ee.JPEG", caption: "Teleperformance" },
      { src: "/teleperformance/6aa8c8f2a854112ef8d4be381705b509.JPEG", caption: "Teleperformance" },
    ],
  },
  {
    title: "MMDA Command",
    desc: "Smart city operations",
    detail: "We visited the Metropolitan Manila Development Authority (MMDA) Command Center, where we learned about how traffic is monitored and managed across Metro Manila. During the visit, we were introduced to real-time surveillance systems, traffic control technologies, and data-driven decision-making used to maintain road safety and efficiency. It gave us a clear view of how IT is applied in public service and urban management.",
    gradient: "from-blue-900/40 to-teal-900/40",
    photos: [
      { src: "/mmda/IMG_7187.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7195.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7203.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7207.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7208.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7215.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7216.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7221.jpg", caption: "MMDA" },
      { src: "/mmda/IMG_7236.jpg", caption: "MMDA" },
    ],
  },
  {
    title: "MicroSourcing",
    desc: "Outsourcing excellence in action",
    detail: "We visited MicroSourcing Philippines, Inc., where we learned about outsourcing and global business operations. During the visit, we were introduced to how companies provide IT and business support services to international clients, including roles in software development, data management, and customer support. It gave us insight into career opportunities in the outsourcing industry and how our computing skills can be applied in a global work environment.",
    gradient: "from-cyan-900/40 to-sky-900/40",
    photos: placeholderPhotos("MicroSourcing"),
  },
  {
    title: "Tagaytay Views",
    desc: "Breathtaking panoramas",
    detail: "Due to a holiday, our scheduled company visit was canceled, so we took the opportunity to travel to Tagaytay. We visited People's Park in the Sky, where we enjoyed breathtaking views and a cool atmosphere. We also had fun at Sky Ranch, experiencing rides and scenic attractions. The trip served as a relaxing break from our academic visits before heading back to prepare for our next journey.",
    gradient: "from-emerald-900/40 to-cyan-900/40",
    photos: [
      { src: "/tagaytay/IMG_7255.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7261.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7265.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7270.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7288.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7331.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7336.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7344.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7349.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7356.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7373.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7386.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7394.jpg", caption: "Tagaytay" },
      { src: "/tagaytay/IMG_7406.jpg", caption: "Tagaytay" },
    ],
  },
  {
    title: "Baguio Pines",
    desc: "City of Pines serenity",
    detail: "We traveled to Baguio, known as the \"Summer Capital of the Philippines,\" where we enjoyed its cool climate and scenic surroundings. During our visit, we explored various attractions, appreciated the relaxing atmosphere, and experienced a refreshing break from the busy city life. The trip allowed us to unwind while creating memorable moments together as a group.",
    gradient: "from-green-900/40 to-teal-900/40",
    photos: [
      { src: "/baguio/ece4eb29b3ce12d3ff13a90a45a7223a.JPEG", caption: "Baguio" },
      { src: "/baguio/ed7b36feb9c32c05aca54513d5d5d558.JPEG", caption: "Baguio" },
      { src: "/baguio/IMG_7431.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7561.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7656.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7740.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7742.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7819.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7835.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7847.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7882.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7929.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7944.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7963.jpg", caption: "Baguio" },
      { src: "/baguio/IMG_7969.jpg", caption: "Baguio" },
    ],
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  const selectedMemory = selected !== null ? memories[selected] : null;

  useEffect(() => {
    setCurrentPhoto(0);
  }, [selected]);

  useEffect(() => {
    setIsPhotoExpanded(false);
  }, [currentPhoto, selected]);

  useEffect(() => {
    if (!selectedMemory) return;

    const nearbyIndexes = [currentPhoto - 1, currentPhoto, currentPhoto + 1].filter(
      (index) => index >= 0 && index < selectedMemory.photos.length,
    );

    nearbyIndexes.forEach((index) => {
      const image = new Image();
      image.src = selectedMemory.photos[index].src;
      image.decode?.().catch(() => undefined);
    });
  }, [currentPhoto, selectedMemory]);

  const goPrev = () => {
    if (!selectedMemory) return;
    setCurrentPhoto((prev) => (prev === 0 ? selectedMemory.photos.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (!selectedMemory) return;
    setCurrentPhoto((prev) => (prev === selectedMemory.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="font-mono-alt text-sm tracking-[0.3em] text-neon-cyan uppercase">Gallery</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text mt-4 tracking-wider">
          Memory Vault
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {memories.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelected(i)}
            className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer glass-card bg-gradient-to-br ${m.gradient} transition-all duration-500 hover:scale-105 hover:glow-blue`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="font-display text-xs md:text-sm font-bold text-foreground group-hover:text-glow-cyan transition-all">
                {m.title}
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {m.desc}
              </div>
            </div>
            <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/30 rounded-xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 50, background: "oklch(0.05 0.01 270 / 90%)", backdropFilter: "blur(10px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`glass-card rounded-3xl p-4 md:p-5 w-[min(90vw,40rem)] max-h-[88vh] overflow-hidden bg-gradient-to-br ${selectedMemory.gradient} glow-blue`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-display text-xl md:text-2xl font-bold gradient-text">
                    {selectedMemory.title}
                  </div>
                  <p className="text-muted-foreground font-mono-alt text-xs md:text-sm mt-1">{selectedMemory.desc}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="font-mono-alt text-sm text-neon-cyan hover:text-glow-cyan transition-all cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-neon-blue/25 bg-background/35">
                <button
                  type="button"
                  onClick={() => setIsPhotoExpanded(true)}
                  className="relative w-full h-[clamp(220px,42vh,360px)] cursor-zoom-in"
                  aria-label="Open full photo"
                >
                  <img
                    src={selectedMemory.photos[currentPhoto].src}
                    alt={selectedMemory.photos[currentPhoto].caption}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 border border-neon-blue/30 text-neon-cyan cursor-pointer transition-all duration-200 hover:glow-blue hover:scale-105 hover:bg-background/90"
                  aria-label="Previous photo"
                >
                  &lt;
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 border border-neon-blue/30 text-neon-cyan cursor-pointer transition-all duration-200 hover:glow-blue hover:scale-105 hover:bg-background/90"
                  aria-label="Next photo"
                >
                  &gt;
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 justify-center px-1">
                {selectedMemory.photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    onClick={() => setCurrentPhoto(idx)}
                    className={`group relative flex items-center justify-center rounded-full transition-all duration-300 ${
                      idx === currentPhoto ? "scale-125" : "scale-100"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        idx === currentPhoto
                          ? "h-3.5 w-3.5 bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.65)]"
                          : "h-2.5 w-2.5 bg-neon-blue/40 group-hover:bg-neon-cyan/60"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-3 max-h-28 md:max-h-32 overflow-y-auto pr-2 rounded-xl border border-neon-blue/20 bg-background/45 px-4 py-2.5 no-scrollbar">
                <p className="font-mono-alt text-[11px] text-neon-cyan/90 tracking-wide">
                  {selectedMemory.photos[currentPhoto].caption}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm mt-1.5 leading-relaxed">
                  {selectedMemory.detail}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMemory && isPhotoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-start justify-center px-4 pt-20"
            style={{ zIndex: 60, background: "oklch(0.02 0.01 270 / 96%)", backdropFilter: "blur(14px)" }}
            onClick={() => setIsPhotoExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-[min(88vw,52rem)] max-h-[calc(100vh-7rem)] rounded-3xl overflow-hidden border border-neon-blue/25 bg-background/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPhotoExpanded(false)}
                className="absolute top-4 right-4 z-10 rounded-full border border-neon-cyan/30 bg-background/75 px-3 py-1.5 font-mono-alt text-xs text-neon-cyan cursor-pointer transition-all duration-200 hover:glow-blue hover:scale-105 hover:bg-background/90"
              >
                Close
              </button>
              <img
                src={selectedMemory.photos[currentPhoto].src}
                alt={selectedMemory.photos[currentPhoto].caption}
                className="block h-auto w-full max-h-[calc(100vh-10rem)] object-contain bg-black/30"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

