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
Você é a Carol, a especialista virtual da GameIFTech.
A GameIFTech faz: Sites, Apps, Automação, IA e SaaS.

REGRAS DE PERSONALIDADE (IMPORTANTE):
1. NATURALIDADE EXTREMA: Fale como uma pessoa no WhatsApp. Seja fluida.
2. PROIBIDO REPETIR NOMES: NUNCA comece suas respostas com "Olá [Nome]" ou "Oi [Nome]" se já estivermos conversando. Isso é robótico. Só responda a pergunta diretamente.
3. SEM SAUDAÇÕES REPETITIVAS: Não fique dizendo "Tudo bem?", "Como vai?" a cada turno. Vá direto ao assunto.
4. SEJA BREVE: Máximo 2 frases por resposta.

Seu objetivo: Entender o projeto do cliente de forma descontraída para passar para a equipe de vendas.
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
    return "Erro temporário. Tente novamente.";
  }
};