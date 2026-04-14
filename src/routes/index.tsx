import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import MouseSpotlight from "../components/MouseSpotlight";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import MapSection from "../components/MapSection";
import GallerySection from "../components/GallerySection";
import ReflectionSection from "../components/ReflectionSection";
import FooterSection from "../components/FooterSection";
import BackToTop from "../components/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WMSU CCS OJT / IVET Tour — 7 Days of Discovery" },
      { name: "description", content: "An immersive digital journal of the College of Computing Studies' 7-day educational tour across Manila, Tagaytay, and Baguio." },
      { property: "og:title", content: "WMSU CCS OJT / IVET Tour" },
      { property: "og:description", content: "7 Days. 3 Cities. Endless Learning. Experience the journey." },
    ],
  }),
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <ParticleBackground />
      <MouseSpotlight />
      <div className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <TimelineSection />
        <MapSection />
        <GallerySection />
        <ReflectionSection />
        <FooterSection />
      </div>
      <BackToTop />
    </>
  );
}
