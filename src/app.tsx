import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home.tsx";

import Works from "./pages/OurWorks.tsx"; 
import ACServicePage from "./components/AcServices.tsx"; 
import TermsConditions from "./components/TermandConditions.tsx";
import PrivacyPolicy from "./components/Privacy.tsx";

export default function App() {
  return (
    
      <Routes>
        
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/works" 
          element={<Works />} 
        />

        
        <Route 
          path="/dashboard" 
        />

        <Route 
          path="/ac-service" 
          element={<ACServicePage />} 
        />

        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/term&codition" 
          element={<TermsConditions />} 
        />
        <Route 
          path="/policy" 
          element={<PrivacyPolicy />} 
        />

      </Routes>
  );
}