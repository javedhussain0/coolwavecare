import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Snowflake, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { pathname } = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      sections.forEach((section) => observerRef.current?.unobserve(section));
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  const isRouteActive = (path: string) => pathname === path;
  const isSectionActive = (sectionId: string) => activeSection === sectionId;

  const getLinkClasses = (to: string, isSection: boolean = false) => {
    let active = false;
    if (isSection) {
      active = isSectionActive(to);
    } else {
      active = isRouteActive(to);
    }
    return `transition-all duration-300 ${
      active
        ? "text-cyan-300 font-semibold drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
        : "text-white/80 hover:text-cyan-300"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      {!isScrolled && (
        <div className="absolute inset-0 ice-wave-bg opacity-40 pointer-events-none"></div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <div className="flex items-center gap-1 sm:gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
              <span className="text-white">COOL</span>{" "}
              <span className="text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]">
                WAVE CARE
              </span>
            </h1>
            <Snowflake
              size={20}
              className="text-cyan-300 snowflake-chill hidden sm:inline-block"
              strokeWidth={1.8}
            />
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-lg lg:text-xl">
            <Link to="/" className={getLinkClasses("/")} onClick={closeMenu}>
              Home
            </Link>
            
            <Link
              to="/works"
              className={getLinkClasses("/works")}
              onClick={closeMenu}
            >
              Our Work
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 text-center">
            <Link
              to="/"
              className={`block py-2 rounded-lg transition ${getLinkClasses("/")}`}
              onClick={closeMenu}
            >
              Home
            </Link>
      
            <Link
              to="/works"
              className={`block py-2 rounded-lg transition ${getLinkClasses("/works")}`}
              onClick={closeMenu}
            >
              Our Work
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .ice-wave-bg {
          background: linear-gradient(90deg, #0f172a, #1e3a5f, #0f172a);
          background-size: 200% 100%;
          animation: iceFlow 8s ease infinite;
        }
        @keyframes iceFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .snowflake-chill {
          animation: chillFloat 3s ease-in-out infinite, chillSpin 4s linear infinite;
          transform-origin: center;
        }
        @keyframes chillFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(10deg); }
        }
        @keyframes chillSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .snowflake-chill:hover {
          animation: chillFloat 1s ease-in-out infinite, chillSpin 2s linear infinite;
          filter: drop-shadow(0 0 8px #22d3ee);
        }
      `}</style>
    </nav>
  );
}