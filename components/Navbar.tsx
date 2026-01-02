import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-neonPink to-brand-neonBlue p-0.5">
               <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="text-white w-6 h-6" />
               </div>
            </div>
            
            {/* Logo Text & Slogan */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white leading-none">
                Game<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neonPink to-brand-neonBlue">IFTech</span>
              </span>
              <span className="text-[10px] font-medium text-gray-400 tracking-wide uppercase mt-0.5">
                Game Intelligent Future Technology
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/5511949846059?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20GameIFTech%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-neonPink to-brand-neonBlue hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-bold transition-transform transform hover:scale-105"
              >
                Orçamento
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-card/95 backdrop-blur-xl border-b border-white/10 absolute w-full h-screen top-0 left-0 pt-24 z-[-1]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-white block px-3 py-4 rounded-md text-2xl font-medium"
              >
                {link.name}
              </a>
            ))}
             <a 
                href="https://wa.me/5511949846059?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20GameIFTech%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gradient-to-r from-brand-neonPink to-brand-neonBlue block px-8 py-4 rounded-full text-xl font-bold mt-4 text-center"
              >
                Solicitar Orçamento
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};