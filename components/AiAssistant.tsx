import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { submitToGoogleForm } from '../services/formService';

type ChatState = 'ASK_NAME' | 'ASK_PHONE' | 'ASK_EMAIL' | 'READY';

interface AiAssistantProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onToggle }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for Lead Capture Flow
  const [chatState, setChatState] = useState<ChatState>('ASK_NAME');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0', 
      role: 'model', 
      text: 'Olá! Sou a Nova, a inteligência artificial da GameIFTech. 🤖✨ Estou pronta para impulsionar seu projeto. Para iniciarmos um atendimento exclusivo, como posso te chamar?' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // ----------------------------------------------------
      // STEP 1: CAPTURE NAME
      // ----------------------------------------------------
      if (chatState === 'ASK_NAME') {
        setLeadName(userText);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: `É um prazer te conhecer, ${userText}! 🚀 Para agilizarmos sua consultoria e mantermos contato via WhatsApp, poderia me informar seu número com DDD?`
          }]);
          setChatState('ASK_PHONE');
          setIsLoading(false);
        }, 800);
        return;
      }

      // ----------------------------------------------------
      // STEP 2: CAPTURE PHONE
      // ----------------------------------------------------
      if (chatState === 'ASK_PHONE') {
        setLeadPhone(userText);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: `Excelente! E para formalizarmos propostas e detalhes técnicos, qual é o seu melhor e-mail corporativo ou pessoal? 📧`
          }]);
          setChatState('ASK_EMAIL');
          setIsLoading(false);
        }, 800);
        return;
      }

      // ----------------------------------------------------
      // STEP 3: CAPTURE EMAIL & AUTO-SUBMIT FORM
      // ----------------------------------------------------
      if (chatState === 'ASK_EMAIL') {
        // Validate email simply
        if (!userText.includes('@') || userText.length < 5) {
           setTimeout(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: "Hmm, o formato do e-mail parece incorreto. Poderia verificar e digitar novamente, por favor?"
            }]);
            setIsLoading(false);
          }, 600);
          return;
        }

        // Auto-submit to Google Forms
        await submitToGoogleForm({
          name: leadName,
          phone: leadPhone,
          email: userText,
          message: 'Usuário completou o cadastro inicial no chat da IA (Nova).'
        });

        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Tudo pronto! Seus dados estão seguros comigo. 🔒 Agora, conte-me: que desafio tecnológico ou projeto incrível você quer tirar do papel hoje?"
          }]);
          setChatState('READY');
          setIsLoading(false);
        }, 1000);
        return;
      }

      // ----------------------------------------------------
      // STEP 4: NORMAL GEMINI CHAT
      // ----------------------------------------------------
      if (chatState === 'READY') {
        // Give Gemini context of who it's talking to
        const prompt = `[Lead: ${leadName}, Phone: ${leadPhone}] ${userText}`;
        const responseText = await sendMessageToGemini(prompt);
        
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }

    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'model',
         text: "Desculpe, tive um breve lapso nos meus circuitos. Pode repetir, por favor?",
         isError: true
       }]);
       setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Determine placeholder text based on state
  const getPlaceholder = () => {
    if (chatState === 'ASK_NAME') return "Digite seu nome...";
    if (chatState === 'ASK_PHONE') return "(11) 99999-9999";
    if (chatState === 'ASK_EMAIL') return "Digite seu e-mail...";
    return "Descreva seu projeto ou dúvida...";
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => onToggle(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-gradient-to-r from-brand-neonPink to-brand-neonBlue text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-brand-card border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-neonPink/10 to-brand-neonBlue/10 border-b border-white/5 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-brand-neonPink to-brand-neonBlue rounded-lg">
                <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Nova - GameIFTech</h3>
              <p className="text-xs text-brand-neonBlue">Online • Inteligência Artificial</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-neonBlue text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                  } ${msg.isError ? 'bg-red-500/20 text-red-200' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={getPlaceholder()}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-neonBlue placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-brand-neonBlue rounded-xl text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};