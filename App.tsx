import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <Navbar />
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      
      <AiAssistant 
        isOpen={isChatOpen} 
        onToggle={setIsChatOpen} 
      />

      <footer className="bg-black py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GameIFTech. Todos os direitos reservados.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-brand-neonBlue transition-colors">Instagram</a>
            <a 
              href="https://www.linkedin.com/in/deividfcastro/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-neonBlue transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/gameiftech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-neonBlue transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;