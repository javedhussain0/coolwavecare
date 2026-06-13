import React, { useState, useEffect } from "react";
import technician from "../assets/coolwave-technician.png";
import heroContainer from "../assets/heroContainer.png";
import { Wrench, Fan, Search } from "lucide-react";

const servicesList: string[] = [
  "AC Repair",
  "AC Installation",
  "Gas Refill",
  "Annual Maintenance",
  "Dismantling",
  "Water Leakage Fix",
  "PCB Repair",
  "Compressor Replacement",
];

export default function Hero() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = servicesList.filter((service) =>
        service.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query]);

  const handleSearch = (): void => {
    if (query.trim() === "") {
      alert("🔍 Please type a service (e.g., Repair, Gas Refill)");
      return;
    }
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
    sessionStorage.setItem("lastSearch", query);
  };

  const selectSuggestion = (suggestion: string): void => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroContainer})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 border border-white/20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Professional{" "}
                <span className="text-cyan-300 drop-shadow-[0_0_12px_#22d3ee]">
                  AC Repair
                </span>{" "}
                & Service
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-gray-200">
                Fast, reliable, and affordable cooling solutions by{" "}
                <span className="font-bold text-white">200+</span> certified
                experts.
              </p>

              <div className="mt-8 relative">
                <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-xl">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={query}
                      placeholder="e.g., AC Repair, Gas Refill, Installation..."
                      className="w-full px-6 py-4 text-lg outline-none text-gray-800"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
                      onKeyDown={handleKeyDown}
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-xl z-20 divide-y divide-gray-100">
                        {suggestions.map((s, idx) => (
                          <li
                            key={idx}
                            onClick={() => selectSuggestion(s)}
                            className="px-6 py-3 text-gray-700 hover:bg-cyan-50 cursor-pointer transition"
                          >
                            🔧 {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-[#0a2540] px-8 py-4 text-white text-lg font-semibold hover:bg-cyan-800 transition flex items-center justify-center gap-2"
                  >
                    <Search size={20} /> Search
                  </button>
                </div>
                <p className="text-sm text-white/70 mt-3">
                  💡 Try: "Repair", "Gas", "Maintenance" – expert system finds
                  the right service.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-white/80">
                <span className="flex items-center gap-1">✅ 24/7 Service</span>
                <span className="flex items-center gap-1">⭐ 4.9 Rating</span>
                <span className="flex items-center gap-1">🔧 1-Yr Warranty</span>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <Wrench
                size={80}
                className="absolute -left-12 top-10 text-white/30 animate-pulse"
              />
              <Fan
                size={80}
                className="absolute -right-8 bottom-10 text-white/30 animate-spin-slow"
              />
              <div className="bg-white/20 p-3 rounded-[35px] border-[8px] border-white/40 shadow-2xl backdrop-blur-sm">
                <img
                  src={technician}
                  alt="Certified AC Technician"
                  className="w-[180px] h-[320px] object-cover rounded-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}