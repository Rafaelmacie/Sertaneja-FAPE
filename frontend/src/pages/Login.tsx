import { User, Lock } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// --- IMPORTAÇÕES DE IMAGENS ---
import logoImg from '../assets/logo-fape-semfundo.png'; 
// Aqui importamos sua imagem nova (atenção para a extensão .jpeg)
import fundoImg from '../assets/logo-fundo-fape.jpg';

export function Login() {
  return (
    <div className="min-h-screen w-full flex">
      
      {/* --- LADO ESQUERDO --- */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        
        {/* 1. Imagem Pura (Sem opacity, sem filtro) */}
        <img 
          src={fundoImg} 
          alt="Fundo FAPE" 
          className="absolute inset-0 w-full h-full object-cover" 
        />

        {/* REMOVI O DIV DO FILTRO VERDE QUE FICAVA AQUI */}

        {/* 3. Texto sobre a imagem */}
        {/* Adicionei um 'bg-black/50' apenas atrás do texto para garantir que dê para ler */}
        <div className="absolute bottom-10 left-10 text-white z-10 max-w-md p-4 rounded-lg bg-black/40 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-3">A força da união no campo.</h2>
          <p className="text-lg text-white">
            Tecnologia e cooperação para fortalecer a agricultura familiar.
          </p>
        </div>
      </div>

      {/* --- LADO DIREITO (Formulário) --- */}
      <div className="w-full lg:w-1/2 bg-[#00A859] flex flex-col items-center justify-center px-8 py-12">
        
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          
          <div className="text-center flex flex-col items-center gap-4 mb-2">
            <img src={logoImg} alt="Logo FAPE" className="w-72 object-contain drop-shadow-sm" />
            <h1 className="text-white font-bold text-xl tracking-wide">
              SERTANEJA - LOGIN
            </h1>
          </div>

          <form className="w-full flex flex-col gap-4">
            <Input type="text" placeholder="CPF" icon={User} />
            <Input type="password" placeholder="Senha" icon={Lock} />

            <div className="flex justify-between items-center text-sm text-white w-full px-1">
              <label className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <input type="checkbox" className="rounded text-emerald-800 focus:ring-0 cursor-pointer" />
                <span>Lembrar senha</span>
              </label>
              <a href="#" className="underline hover:text-emerald-100 transition-colors">
                Esqueci senha
              </a>
            </div>

            <div className="mt-2">
              <Button type="submit">Login</Button>
            </div>
          </form>

          <p className="text-white text-sm mt-4">
            Ainda não tem acesso?{' '}
            <a href="/cadastro" className="font-bold underline hover:text-emerald-100 transition-colors">
              Cadastre-se
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}