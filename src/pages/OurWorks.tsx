import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Akash from "../assets/ourWorks/akash.mp4";
import AkashImg from "../assets/ourWorks/AkashImg.png";
import technician from "../assets/ourWorks/Ac-reapairing.mp4";
import service from "../assets/ourWorks/services.mp4";
import ourWorks from "../assets/ourWorks/Ourwork.mp4";

import capacitor from "../assets/sparePart/capcitor.png";
import compresser from "../assets/sparePart/compressor.png";
import pcb from "../assets/sparePart/PCB.png";
import coolinCoil from "../assets/sparePart/cooling-coil.png";
import heatCoil from "../assets/sparePart/heat-coil.png";
import dranage from "../assets/sparePart/dranage.png";
import fanMotor from "../assets/sparePart/fan-motor.png";
import copperCoil from "../assets/sparePart/copper-coil.png";


import acService from "../assets/ourWorks/ac servuces.jpg"
import indoor from "../assets/ourWorks/indoor.jpg"
import outdoor from "../assets/ourWorks/outdoor.jpg"
import project  from "../assets/ourWorks/projectPlaning.jpg"

interface ProjectStats {
  customers: string;
  services: string;
  cities: string;
}

interface Project {
  title: string;
  author: string;
  description: string;
  images: string[];
  videos: string[];
  stats: ProjectStats;
}

const projects: Project[] = [
  {
    title: "Muthoot Finance",
    author: "By CoolWave Care",
    description:
      "Professional finance company website with modern UI, responsive layouts, enquiry forms, customer support integration, and optimized performance.",
    images: [
      "https://lscdn.azureedge.net/biz-live/img/11551498-11551498-6c49e622.jpeg",
    ],
    videos: [technician],
    stats: {
      customers: "50K+",
      services: "100K+",
      cities: "120+",
    },
  },
  {
    title: "CoolWaveCare Service Platform",
    author: "By CoolWave Care",
    description:
      "Enterprise-grade HVAC service management platform for AC installation, repair, maintenance, and AMC operations. Features online booking, technician dispatch, service tracking, warranty management, automated AMC reminders, invoicing, and mobile-first customer experience.",
    images: [AkashImg],
    videos: [Akash],
    stats: {
      customers: "10K+",
      services: "25K+",
      cities: "20+",
    },
  },
  {
    title: "Original Spare Parts",
    author: "By CoolWave Care",
    description:
      "One-stop inventory & e-commerce platform for genuine AC and HVAC spare parts. Real-time stock tracking, OEM verification, B2B bulk orders, and fast delivery integration.",
    images: [
      capacitor,
      coolinCoil,
      compresser,
      copperCoil,
      dranage,
      fanMotor,
      heatCoil,
      pcb,
    ],
    videos: [],
    stats: {
      customers: "8K+",
      services: "50K+",
      cities: "35+",
    },
  },
  {
    title: "AC Technician On-Demand",
    author: "By CoolWave Care",
    description:
      "On‑demand AC repair & maintenance service connecting certified technicians to customers. Real-time booking, live tracking, digital invoicing, and service history.",
    images: [
     acService,
    ],
    videos: [service, ourWorks],
    stats: {
      customers: "15K+",
      services: "40K+",
      cities: "60+",
    },
  },
];

const galleryImages: string[] = [
  acService,
  indoor,
  outdoor,
  project
];

const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numeric));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numeric]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isHovered]);

  const goTo = (index: number) => setCurrent(index);

  return (
    <div
      className="relative overflow-hidden h-72 bg-black/80 group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide ${idx + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === current ? "bg-cyan-400 scale-125" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const VideoSliderModal = ({ videos, onClose }: { videos: string[]; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const currentVideo = videos[current];
  const isYouTube = currentVideo?.includes("youtube") || currentVideo?.includes("youtu.be");

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((p) => (p === 0 ? videos.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === videos.length - 1 ? 0 : p + 1));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white text-3xl transition-colors duration-200 z-20"
          aria-label="Close video"
        >
          ✕
        </button>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          {isYouTube ? (
            <iframe
              src={currentVideo}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video src={currentVideo} controls autoPlay className="w-full h-full object-contain" />
          )}
        </div>

        {videos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition z-20"
              aria-label="Previous video"
            >
              ◀
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition z-20"
              aria-label="Next video"
            >
              ▶
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); goTo(idx); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === current ? "bg-cyan-400 scale-125" : "bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to video ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function OurWorks() {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <section ref={sectionRef} className="py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 opacity-0 animate-slideUp">
            <span className="text-cyan-400 uppercase tracking-[6px] text-sm font-medium">Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-black mt-4 tracking-tight">
              Our Recent{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Delivering enterprise-grade web applications, service platforms, and business solutions with exceptional user experience, performance, and scalability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl hover:border-cyan-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 opacity-0 animate-slideUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ImageSlider images={project.images} />
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Enterprise Project</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">Live Platform</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">{project.author}</p>
                  <p className="text-slate-400 leading-relaxed mb-8 line-clamp-3">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-cyan-400 tabular-nums">
                        <Counter value={project.stats?.customers ?? "0"} suffix="+" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">Customers</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-cyan-400 tabular-nums">
                        <Counter value={project.stats?.services ?? "0"} suffix="+" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">Services</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-cyan-400 tabular-nums">
                        <Counter value={project.stats?.cities ?? "0"} suffix="+" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">Cities</p>
                    </div>
                  </div>
                  {project.videos.length > 0 && (
                    <button
                      onClick={() => setSelectedVideos(project.videos)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
                    >
                      Watch Live Demo{project.videos.length > 1 ? ` (${project.videos.length} videos)` : ""} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 opacity-0 animate-slideUp" style={{ animationDelay: "400ms" }}>
            <div className="text-center mb-12">
              <span className="text-cyan-400 uppercase tracking-[6px] text-sm font-medium">Gallery</span>
              <h3 className="text-4xl md:text-5xl font-bold mt-3">Project Snapshots</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl cursor-pointer">
                  <img
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedVideos.length > 0 && (
        <VideoSliderModal videos={selectedVideos} onClose={() => setSelectedVideos([])} />
      )}

      <Footer />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slideUp { animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}