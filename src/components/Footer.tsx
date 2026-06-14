import { useState, useEffect } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSnowflake
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  const slogans = [
    "❄️ Chill Certified • Trusted by 10,000+ Homes",
    "🔧 24/7 Emergency AC Repair • Same Day Service",
    "⭐ 4.9 Rating • 1 Season Warranty on All Repairs",
    "🌊 India's Most Reliable Cooling Experts",
    "💸 Transparent Pricing • No Hidden Costs"
  ];

  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [animKey, setAnimKey] = useState(1);
  const [loop, setLoop] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slogans.length]);

  useEffect(() => {
    let timer;
    if (loop < 3) {
      timer = setTimeout(() => {
        setAnimKey((k) => k + 1);
        setLoop((l) => l + 1);
      }, 3000);
    } else {
      timer = setTimeout(() => {
        setAnimKey((k) => k + 1);
        setLoop(1);
      }, 15 * 60 * 1000);
    }
    return () => clearTimeout(timer);
  }, [loop]);

  const coolLetters = "COOL".split("");
  const waveLetters = "WAVE".split("");
  const lastLetters = "Care".split("");

  return (
    <footer className="bg-[#020617] text-white pt-20 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section with Animation */}
        <div className="text-center mb-16">
          <h2
            key={animKey}
            className="text-5xl md:text-7xl font-black tracking-tighter inline-flex items-center justify-center gap-1 md:gap-2"
          >
            <span className="flex">
              {coolLetters.map((char, index) => (
                <span
                  key={`cool-${index}`}
                  className="letter-anim text-white"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="flex">
              {waveLetters.map((char, index) => (
                <span
                  key={`wave-${index}`}
                  className="letter-anim text-cyan-400"
                  style={{
                    animationDelay: `${(coolLetters.length + index) * 0.15}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="flex">
              {lastLetters.map((char, index) => (
                <span
                  key={`care-${index}`}
                  className="letter-anim text-cyan-300"
                  style={{
                    animationDelay: `${(coolLetters.length + waveLetters.length + index) * 0.15}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span
              className="letter-anim ml-2"
              style={{
                animationDelay: `${(coolLetters.length + waveLetters.length + lastLetters.length) * 0.15}s`,
              }}
            >
              <FaSnowflake className="text-cyan-400 animate-spin-slow text-4xl md:text-5xl" />
            </span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
            Professional AC Repair, Installation & Maintenance Services. <br className="hidden md:block" />
            Bringing the Cool Wave to Your Home & Office.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl py-5 px-6 mb-16 text-center border border-white/10 shadow-2xl max-w-3xl mx-auto">
          <div className="slogan-container overflow-hidden h-8 flex items-center justify-center">
            <p key={currentSlogan} className="slogan-text text-cyan-300 text-lg md:text-xl font-medium tracking-wide">
              {slogans[currentSlogan]}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="text-cyan-400 text-3xl">🌊</span> CoolWave
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              India's fastest-growing AC service network. Certified technicians,
              genuine spare parts, and a 1-season service warranty.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com/company/yourhandle" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Services', path: '/works' },
                { name: 'Our Works', path: '/works' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group text-sm font-medium"
                  >
                    <MdKeyboardArrowRight
                      className="text-cyan-500/0 group-hover:text-cyan-500 transition-all -translate-x-3 group-hover:translate-x-0"
                      size={18}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {['AC Repair', 'Gas Refill', 'Annual Maintenance', 'Installation', 'Dismantling'].map((service) => (
                <li key={service}>
                  <Link
                    to="/works"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group text-sm font-medium"
                  >
                    <MdKeyboardArrowRight className="text-cyan-500/0 group-hover:text-cyan-500 transition-all -translate-x-3 group-hover:translate-x-0" size={18} />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-5">
              <li>
                <a
                  href="tel:+918279797684"
                  className="flex items-start gap-4 text-slate-400 text-sm hover:text-cyan-400 transition-colors group"
                >
                  <div className="mt-1 bg-cyan-500/10 p-2.5 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20">
                    <FaPhoneAlt size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5 group-hover:text-cyan-200">Phone</p>
                    <p>+91 82797 97684</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info.coolwavecare@gmail.com"
                  className="flex items-start gap-4 text-slate-400 text-sm hover:text-cyan-400 transition-colors group"
                >
                  <div className="mt-1 bg-cyan-500/10 p-2.5 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5 group-hover:text-cyan-200">Email</p>
                    <p>info.coolwavecare@gmail.com</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://maps.google.com/?q=Hathras,Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-slate-400 text-sm hover:text-cyan-400 transition-colors group"
                >
                  <div className="mt-1 bg-cyan-500/10 p-2.5 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5 group-hover:text-cyan-200">Location</p>
                    <p>Hathras, UP & 20+ other cities</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 CoolWave AC Services. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link to="/policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/term&codition" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        .letter-anim {
          opacity: 0;
          animation: popIn 0.5s ease-out forwards;
          display: inline-block;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); filter: blur(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .slogan-container {
          perspective: 1000px;
        }
        .slogan-text {
          animation: sloganSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes sloganSlideIn {
          0% { opacity: 0; transform: translateY(20px) rotateX(-20deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
      `}</style>
    </footer>
  );
}