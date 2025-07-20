import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AnalisisCualitativo from './components/AnalisisCualitativo';
import Gradio from './components/Gradio';
import APIsIA from './components/APIsIA';
import GitHub from './components/GitHub';
import LMStudio from './components/LMStudio';
import FlujosN8N from './components/FlujosN8N';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground smooth-scroll">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analisis-cualitativo" element={<AnalisisCualitativo />} />
            <Route path="/gradio" element={<Gradio />} />
            <Route path="/apis-ia" element={<APIsIA />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/lm-studio" element={<LMStudio />} />
            <Route path="/flujos-n8n" element={<FlujosN8N />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

