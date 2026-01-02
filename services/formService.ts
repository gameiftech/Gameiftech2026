export const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeOXwJm4zQSEYKORvGbLYdMb_FaRkaMtvKuoaB8CCH6qduypQ/formResponse";

export const GOOGLE_FORM_ENTRIES = {
  NAME: 'entry.43769559',
  PHONE: 'entry.1910933423', // Reusing the slot previously used for Company
  EMAIL: 'entry.2040509355',
  INTEREST: 'entry.1913692001',
  MESSAGE: 'entry.1787594821'
};

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  interest?: string;
  message?: string;
}

export const submitToGoogleForm = async (data: LeadData): Promise<boolean> => {
  const formBody = new FormData();
  
  formBody.append(GOOGLE_FORM_ENTRIES.NAME, data.name);
  formBody.append(GOOGLE_FORM_ENTRIES.EMAIL, data.email);
  formBody.append(GOOGLE_FORM_ENTRIES.PHONE, data.phone);
  formBody.append(GOOGLE_FORM_ENTRIES.INTEREST, data.interest || 'Contato via Assistente Virtual');
  formBody.append(GOOGLE_FORM_ENTRIES.MESSAGE, data.message || 'Usuário iniciou conversa com a Nova (IA).');

  try {
    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors", 
      body: formBody
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    return false;
  }
};