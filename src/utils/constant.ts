import foam from "../assets/FoamService.jpg"
import gas from "../assets/GasCharging.jpg"
import repair from "../assets/Maintainance.jpg"
import jet from "../assets/jetServices.jpg"
import outdoor from "../assets/Outdoor.jpg"
import AMC from "../assets/AMC.png"
import Casset from "../assets/Casset.png"
import DuctedAC from "../assets/ductedac.png"

export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "AC Complete Service",
    description: "Deep cleaning, filter wash, gas top-up check, coil cleaning – full maintenance.",
    price: "₹449",
    icon: "fas fa-wind",
    image: foam,
  },
  {
    id: 2,
    name: "Gas Charging",
    description: "Refrigerant gas charging restores cooling efficiency.",
    price: "₹3249",
    icon: "fas fa-temperature-low",
    image: gas,
  },
  {
    id: 3,
    name: "AC Repair & Troubleshoot",
    description: "PCB, compressor, fan motor repair – on-site fix.",
    price: "₹599",
    icon: "fas fa-tools",
    image: repair,
  },
  {
    id: 4,
    name: "Filter Cleaning & Sanitize",
    description: "Anti-bacterial wash, removes allergens, improves air quality.",
    price: "₹199",
    icon: "fas fa-broom",
    image: jet,
  },
  {
    id: 5,
    name: "Outdoor Unit Maintenance",
    description: "Coil cleaning, fan alignment, anti-rust coating.",
    price: "₹549",
    icon: "fas fa-fan",
    image: outdoor,
  },
  {
    id: 6,
    name: "Annual Maintenance Contract",
    description: "2 free services + priority support + 10% off on parts.",
    price: "₹3449",
    icon: "fas fa-calendar-check",
    image: AMC,
  },
  {
    id: 7,
    name: "Cassette AC Comprehensive Maintenance",
    description: "End-to-end service, deep chemical cleaning, fault diagnostics, and precision troubleshooting for ceiling cassette units.",
    price: "₹1499", 
    icon: "fas fa-fan", 
    image: Casset,
  },
  {
    id: 8,
    name: "Ducted HVAC System Servicing",
    description: "Full-cycle maintenance for ducted systems: airflow optimization, leak diagnostics, coil servicing, and central unit troubleshooting.",
    price: "₹3999",
    icon: "fas fa-wind",
    image: DuctedAC,
  },
];