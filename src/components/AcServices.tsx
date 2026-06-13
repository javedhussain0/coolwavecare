import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "./Nav";
import Footer from "./Footer";
import BookingForm from "../pages/BookingForm";
import  { services } from "../utils/constant"; 
import  type { Service } from "../utils/constant"; 

export default function ACServicePage() {
  const [searchParams] = useSearchParams();
  const serviceIdStr = searchParams.get("serviceId");
  
  const foundService = serviceIdStr 
    ? services.find((s) => s.id === Number(serviceIdStr)) || null 
    : null;


  const [selectedService] = useState<Service | null>(foundService);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(foundService !== null);

  if (!selectedService) {

    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Service Not Found 😔</h2>
          <p className="text-slate-500 mb-6">Pata nahi aap kaunsi service dhoond rahe hain.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Go Back to Home
          </Link>
          
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors">
          <span className="mr-2">←</span> Back to All Services
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          
          <div className="lg:w-1/2 relative bg-slate-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              src={selectedService.image} 
              alt={selectedService.name} 
              className="w-full h-72 lg:h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 z-20">
               <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                 Coolwave Assured
               </span>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center text-blue-500 mb-4 text-3xl">
              <i className={selectedService.icon}></i>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              {selectedService.name}
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <span className="block text-sm font-semibold text-slate-500 uppercase mb-1">Starting Price</span>
                <span className="text-4xl font-extrabold text-blue-600">{selectedService.price}</span>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-md transform transition hover:-translate-y-1"
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingForm 
        isOpen={isModalOpen} 
        selectedService={selectedService as Service} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}