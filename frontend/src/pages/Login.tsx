import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Adicionamos Eye e EyeOff aqui:
import { User, Eye, EyeOff } from 'lucide-react'; 
import axios from 'axios';

// --- SERVIÇOS E COMPONENTES ---
import { administrativoApi } from '../services/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// --- ASSETS ---
import Logo from '../assets/logo-verde-sem-fundo.svg';
import fundoImg from '../assets/logo-fundo-fape.jpg';

/**
 * Componente da Página de Login.
 * Responsável por autenticar o administrador, armazenar os dados da sessão (token e user)
 * no Local Storage e redirecionar para o Dashboard principal.
 */
export function Login() {
  const navigate = useNavigate();

  // Estados do formulário
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado para controlar a visualização da senha
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /**
   * Lida com a submissão do formulário de login.
   * Comunica-se com a API e trata erros comuns.
   */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await administrativoApi.login({ email, senha });
      
      // Persistência da sessão
      localStorage.setItem('@Fape:token', data.token);
      localStorage.setItem('@Fape:user', JSON.stringify(data.user));

      // Redirecionamento após sucesso
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao realizar login.';
        alert(message);
      } else {
        alert('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Exibe alerta temporário para funcionalidades não implementadas.
   */
  const handleEmDesenvolvimento = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Funcionalidade em desenvolvimento 🚧');
  };

  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* --- PAINEL ESQUERDO (Informativo / Visual) --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src={fundoImg}
          alt="Imagem de agricultores"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-12 left-12 text-white z-10 max-w-md bg-black/40 p-6 rounded-xl backdrop-blur-sm"
        >
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            A força da união no campo.
          </h2>
          <p className="text-lg text-white/90">
            Tecnologia e cooperação para fortalecer a agricultura familiar.
          </p>
        </motion.div>
      </div>

      {/* --- PAINEL DIREITO (Formulário de Autenticação) --- */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-8 py-12 overflow-hidden">

        {/* Elementos Decorativos do Fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-400 to-green-250" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-700 rounded-full blur-2xl opacity-30" />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md bg-white/75 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-green-100"
        >
          
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <img src={Logo} alt="Logo FAPE" className="w-40 drop-shadow-md" />
            <h1 className="text-green-700 font-bold text-lg tracking-wide">
              SERTANEJA - LOGIN
            </h1>
          </motion.div>

          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="E-mail" 
              icon={User} 
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            
            {/* CAIXA DE SENHA COM OLHINHO */}
            <div className="relative w-full">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Senha"  
                value={senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors z-10"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm w-full">
              <label className="flex items-center gap-2 cursor-pointer text-green-700">
                <input
                  type="checkbox"
                  className="rounded border-green-400 text-green-600 focus:ring-green-500"
                />
                <span className="select-none">Lembrar senha</span>
              </label>

              {/* MUDANÇA: Alerta de em desenvolvimento */}
              <button
                type="button"
                onClick={handleEmDesenvolvimento}
                className="underline text-green-600 hover:text-green-800 transition-colors duration-200"
              >
                Esqueci senha
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all duration-300"
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Button>
            </motion.div>
          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Ainda não tem acesso?{' '}
            {/* MUDANÇA: Alerta de em desenvolvimento */}
            <button
              type="button"
              onClick={handleEmDesenvolvimento}
              className="font-bold text-green-700 hover:text-green-900 transition-colors"
            >
              Cadastre-se
            </button>
          </p>

        </motion.div>
      </div>
    </div>
  );
}