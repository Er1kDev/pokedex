import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from './Home.jsx'
import './index.css'
import { PokemonDetail } from './PokemonDetail.jsx';
import { PokemonProvider } from './PokemonContext.jsx';

createRoot(document.getElementById("root")).render(
  <Router>
    <PokemonProvider>
      <div className="bg-yellow-400 min-h-screen">
        <nav >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center items-center py-4"> {/* Changed justify-between to justify-center */}
              <div className="flex items-center">
                <img src="/public/pokemon.png" alt="logo-pokemon" width="300" height="50" />
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
    </PokemonProvider>
  </Router>
);
