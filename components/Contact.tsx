import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { submitToGoogleForm } from '../services/formService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Desenvolvimento de App',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('sending');

    const success = await submitToGoogleForm({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: formData.interest,
      message: formData.message
    });

    if (success) {
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: 'Desenvolvimento de App',
        message: ''
      });
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="text-sm font-bold text-brand-neonPink tracking-widest uppercase mb-2">Contato</h2>
            <h3 className="text-4xl font-bold text-white mb-6">
              Vamos Transformar sua <br/>
              Ideia em Realidade?
            </h3>
            <p className="text-gray-400 mb-10 text-lg">
              Entre em contato para um orçamento personalizado. Nossa equipe de especialistas está pronta para acelerar o seu negócio.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="text-brand-neonBlue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white font-medium">gameiftech@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="text-brand-neonPink" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone / WhatsApp</p>
                  <p className="text-white font-medium">+55 (11) 94984-6059</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="text-brand-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="text-white font-medium">Bragança Paulista, Rua da Tecnologia, 635</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-brand-card p-8 rounded-2xl border border-white/5 shadow-2xl relative min-h-[500px] flex items-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neonBlue/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            
            {status === 'success' ? (
              <div className="w-full text-center space-y-6 animate-fade-in relative z-10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-white">Mensagem Enviada!</h4>
                <p className="text-gray-400">
                  Obrigado por entrar em contato. Nossa equipe responderá o mais breve possível.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-brand-neonBlue hover:text-white font-medium transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 w-full relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neonBlue transition-colors disabled:opacity-50" 
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp / Telefone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neonBlue transition-colors disabled:opacity-50" 
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neonBlue transition-colors disabled:opacity-50" 
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Interesse</label>
                  <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neonBlue transition-colors appearance-none disabled:opacity-50"
                  >
                    <option value="Desenvolvimento de App">Desenvolvimento de App</option>
                    <option value="Website / Landing Page">Website / Landing Page</option>
                    <option value="Automação & IA">Automação & IA</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neonBlue transition-colors disabled:opacity-50" 
                    placeholder="Conte-nos sobre seu projeto..."
                    required
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    <span>Ocorreu um erro. Verifique sua conexão.</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-brand-neonPink to-brand-neonBlue text-white font-bold py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};