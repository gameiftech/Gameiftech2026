import React from 'react';
import { ArrowRight, Code, Cpu, Globe } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-neonPink/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-neonBlue/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-brand-purple/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="animate-fade-in space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-gray-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Disponível para novos projetos
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
            Nós Criamos o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neonPink via-brand-purple to-brand-neonBlue">
              Futuro Digital
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
            Da concepção à realidade. Especialistas em desenvolvimento Web, Apps, Automação e Inteligência Artificial para alavancar o seu negócio.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onOpenChat}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              Iniciar Projeto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#services" 
              onClick={handleScrollToServices}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all cursor-pointer"
            >
              Conhecer Serviços
            </a>
          </div>

          {/* Tech Stack Floating Icons */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex flex-col items-center gap-2">
                <Code className="w-8 h-8 text-brand-neonBlue" />
                <span className="text-xs font-mono">DEV</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Cpu className="w-8 h-8 text-brand-neonPink" />
                <span className="text-xs font-mono">AI</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Globe className="w-8 h-8 text-brand-purple" />
                <span className="text-xs font-mono">WEB</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};