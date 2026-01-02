import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'FinTech Dashboard',
    category: 'SaaS / Web App',
    image: 'https://picsum.photos/800/600?random=1',
    description: 'Plataforma de gestão financeira com análise de dados em tempo real e IA preditiva.'
  },
  {
    id: '2',
    title: 'HealthCare Mobile',
    category: 'App iOS / Android',
    image: 'https://picsum.photos/800/600?random=2',
    description: 'Aplicativo de telemedicina conectando pacientes e médicos com videochamadas criptografadas.'
  },
  {
    id: '3',
    title: 'E-commerce Automation',
    category: 'Automação / Bot',
    image: 'https://picsum.photos/800/600?random=3',
    description: 'Sistema automatizado de gestão de estoque e atendimento ao cliente via WhatsApp.'
  },
];

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-black relative overflow-hidden scroll-mt-24">
        {/* Decorative elements */}
        <div className="absolute right-0 top-1/3 w-1/3 h-1/3 bg-brand-neonBlue/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand-neonPink tracking-widest uppercase mb-2">Portfólio</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">Projetos Recentes</h3>
          </div>
          <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
            Ver Todos os Projetos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-xl overflow-hidden bg-brand-card border border-white/5">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 relative z-10">
                <span className="text-xs font-medium text-brand-neonBlue mb-2 block">{project.category}</span>
                <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};