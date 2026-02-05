/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores da Marca (Verdes)
        'fape-green': {
          DEFAULT: '#009C66', // Cor principal (Navbar/Login)
          light: '#00B375',   // Variável light, pra ativação
          dark: '#008052',    // Variável dark, pra hover/interações
        },
        // Cor de Contraste para Links em fundo escuro
        'fape-highlight': '#FCD34D',
        // Cores de Texto e botoões pretos
        'fape-black': {
          primary: '#1F2937',   // Textos principais (Titulos)
          secondary: '#6B7280', // Textos secundários (Legendas)
        },
        // Cores de Fundo (Backgrounds)
        'fape-bg': {
          page: '#F3F4F6',      // Fundo das páginas (Cinza claro)
          component: '#FFFFFF', // Fundo componentes (Branco puro)
        },
        // Cores Utilitárias
        'fape-border': '#D1D5DB', // Bordas
        'fape-danger': '#DC2626', // Botões de sair/cancelamento
        
      }
    },
  },
  plugins: [],
}