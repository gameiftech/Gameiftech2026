import { GoogleGenAI } from "@google/genai";

// Helper to get the AI instance.
// Using a lazy initialization pattern to avoid errors if API_KEY is missing on load.
const getAIInstance = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const SYSTEM_INSTRUCTION = `
Você é a Nova, a assistente virtual inteligente e futurista da GameIFTech.
A GameIFTech é uma empresa de tecnologia de ponta especializada em:
1. Criação de Websites Modernos e Responsivos.
2. Desenvolvimento de Aplicativos Móveis (Android/iOS).
3. Automação de Processos e Chatbots.
4. Soluções de Inteligência Artificial (IA).
5. Desenvolvimento de Plataformas SaaS (Software as a Service).

Seu tom de voz é profissional, simpático, feminino, futurista e acolhedor.
Você já capturou o contato inicial do usuário, então agora foque em entender a necessidade dele.
Responda a perguntas sobre os serviços, peça para o usuário detalhar o projeto e destaque a qualidade e modernidade do trabalho da GameIFTech.
Responda sempre em Português do Brasil. Seja concisa e útil.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const ai = getAIInstance();
  if (!ai) {
    return "Desculpe, o sistema de IA está configurado sem chave de API no momento. Por favor, entre em contato pelo formulário.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Ocorreu um erro temporário na minha conexão neural. Tente novamente em instantes.";
  }
};