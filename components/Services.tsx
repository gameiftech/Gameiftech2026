import React from 'react';
import { Smartphone, Globe, Bot, Zap, Database, Layers } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Desenvolvimento de Apps',
    description: 'Aplicativos nativos e híbridos para iOS e Android com performance excepcional e UX intuitiva.',
    icon: Smartphone,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: '2',
    title: 'Websites Modernos',
    description: 'Sites responsivos, landing pages de alta conversão e plataformas web robustas utilizando React e Next.js.',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: '3',
    title: 'Inteligência Artificial',
    description: 'Integração de modelos de IA (Gemini, GPT) para análise de dados, chatbots e funcionalidades inteligentes.',
    icon: Bot,
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: '4',
    title: 'Automação de Processos',
    description: 'Automatize tarefas repetitivas e otimize fluxos de trabalho do seu negócio com scripts e ferramentas customizadas.',
    icon: Zap,
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: '5',
    title: 'SaaS Development',
    description: 'Construção completa de Software as a Service, desde o MVP até a escala global, com arquitetura segura.',
    icon: Layers,
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    id: '6',
    title: 'Sistemas Backend',
    description: 'APIs robustas, bancos de dados escaláveis e infraestrutura em nuvem para suportar seu crescimento.',
    icon: Database,
    gradient: 'from-gray-200 to-gray-400'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-dark relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-neonBlue tracking-widest uppercase mb-2">Nossas Especialidades</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Soluções Completas para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neonPink to-brand-neonBlue">
              Escalar seu Negócio
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative p-8 rounded-2xl bg-brand-card border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                <div className="w-full h-full bg-brand-card rounded-[10px] flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                {service.title}
              </h4>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};