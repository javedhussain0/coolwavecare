import { Link } from "react-router-dom";
import Navbar from "../components/Nav";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { services } from "../utils/constant";

export default function Home() {
  return (
<div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />

      <section className="services-section py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4">
              ❄️{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Coolwave Home Services
              </span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
              Expert AC maintenance, repair, and comprehensive AMC plans right
              at your doorstep. Reliable and affordable.
            </p>
          </div>

          {/* Services grid - responsive layout remains unchanged */}
          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                to={`/ac-service?serviceId=${service.id}`}
                key={service.id}
                className="group"
              >
                <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-gray-800">
                  <ServiceCard service={service} onBookNow={() => {}} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}