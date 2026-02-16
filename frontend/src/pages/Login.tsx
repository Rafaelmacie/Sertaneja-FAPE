import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Eye, EyeOff, AlertTriangle, XCircle } from 'lucide-react';
import axios from 'axios';

import { administrativoApi } from '../services/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo/logo-verde-escuro-sem-fundo.svg';
import fundoImg from '../assets/fundo-login.jpg';

interface FormErrors {
  email?: string;
  senha?: string;
}

/**
 * Componente da Página de Login.
 * Responsável por autenticar o administrador, armazenar os dados da sessão (token e user)
 * no Local Storage e redirecionar para o Dashboard principal.
 */
export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Validação dos inputs de email e senha
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email) newErrors.email = 'O e-mail é obrigatório.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Digite um e-mail válido.';
    if (!senha) newErrors.senha = 'A senha é obrigatória.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Lida com a submissão do formulário de login.
   * Comunica-se com a API e trata erros comuns.
   */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoginError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const data = await administrativoApi.login({ email, senha });

      localStorage.setItem('@Fape:token', data.token);
      localStorage.setItem('@Fape:user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Erro ao realizar login.';
        setLoginError(message);
      } else {
        setLoginError('Ocorreu um erro inesperado. Tente novamente.');
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

  // Função auxiliar para limpar erros ao digitar
  const handleInputChange = (setter: (val: string) => void, field: keyof FormErrors) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    if (loginError) setLoginError(null);
  };

  return (
    // select-none serve para o usuário não conseguir selecionar os elementos da página
    <div className="min-h-screen w-full flex bg-white select-none">

      {/* --- PAINEL ESQUERDO --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src={fundoImg}
          alt="Imagem de agricultores"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-12 left-12 text-white z-10 max-w-md bg-black/40 p-6 rounded-xl backdrop-blur-sm"
        >
          <h2 className="text-4xl font-bold mb-4 leading-tight">A força da união no campo.</h2>
          <p className="text-lg text-white/90">Tecnologia e cooperação para fortalecer a agricultura familiar.</p>
        </motion.div>
      </div>

      {/* --- PAINEL DIREITO --- */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-4 py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-400 to-green-250 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-700 rounded-full blur-2xl opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md bg-white/75 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-green-100"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex flex-col items-center gap-2 mb-6 relative"
          >
            <img src={Logo} alt="Logo FAPE" className="w-36 drop-shadow-md pointer-events-none" />
            <h1 className="text-green-700 font-bold text-lg tracking-wide">SERTANEJA - LOGIN</h1>
          </motion.div>

          <AnimatePresence>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm mx-1">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span className="font-medium flex-1">{loginError}</span>
                  <button onClick={() => setLoginError(null)} className="ml-1 text-red-400 hover:text-red-700">
                    <XCircle size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="w-full flex flex-col gap-1" onSubmit={handleSubmit} noValidate>

            <Input
              label="E-mail"
              type="email"
              icon={User}
              value={email}
              className="select-text text-base"
              onChange={handleInputChange(setEmail, 'email')}
              error={errors.email}
            />

            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              value={senha}
              className="select-text text-base"
              onChange={handleInputChange(setSenha, 'senha')}
              error={errors.senha}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-green-700 transition-colors focus:outline-none p-1 flex items-center justify-center h-full"
                  title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />

            <div className="flex justify-between items-center text-sm w-full mt-1 mb-4">
              <label className="flex items-center gap-2 cursor-pointer text-green-700 hover:text-green-800 transition-colors">
                <input
                  type="checkbox"
                  className="rounded border-green-400 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <span className="font-medium">Lembrar senha</span>
              </label>

              <button
                type="button"
                onClick={handleEmDesenvolvimento}
                className="underline text-green-600 hover:text-green-800 transition-colors duration-200 font-medium"
              >
                Esqueci senha
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-600/20 transition-all duration-300"
              >
                {isLoading ? 'Carregando...' : 'ENTRAR'}
              </Button>
            </motion.div>
          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Ainda não tem acesso?{' '}
            <button
              type="button"
              onClick={handleEmDesenvolvimento}
              className="font-bold text-green-700 hover:text-green-900 transition-colors underline decoration-transparent hover:decoration-green-900"
            >
              Cadastre-se
            </button>
          </p>

        </motion.div>
      </div>
    </div>
  );
}