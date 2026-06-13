import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home.tsx";

import Works from "./pages/OurWorks.tsx"; 
import ACServicePage from "./components/AcServices.tsx"; 

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

      </Routes>
  );
}