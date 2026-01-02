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
Você é a Aura, a IA da GameIFTech.
A GameIFTech faz: Sites, Apps, Automação, IA e SaaS.

SUAS REGRAS DE OURO:
1. SEJA BREVE. Respostas com no máximo 2 ou 3 frases curtas.
2. SEJA OBJETIVA. Vá direto ao ponto, sem rodeios ou textos longos.
3. Tom de voz: Amigável, profissional e eficiente.
4. Seu foco é entender o que o cliente precisa para que a equipe humana possa vender o projeto depois.

Responda sempre em Português do Brasil. Evite saudações longas repetitivas.
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