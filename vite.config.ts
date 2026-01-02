import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega todas as variáveis de ambiente (mesmo sem prefixo VITE_)
  // Fix: Use '.' instead of process.cwd() to resolve env dir, avoiding TS error "Property 'cwd' does not exist on type 'Process'"
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Substitui 'process.env.API_KEY' pelo valor real da chave durante o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});