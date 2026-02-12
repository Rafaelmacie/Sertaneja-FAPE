import { User, Lock, Mail, FileText } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import logoImg from '../assets/logo-fape.png'; 

export function Cadastro() {
  return (
    <div className="min-h-screen w-full flex">
      
      {/* --- LADO ESQUERDO (Imagem de Plantio/Início) --- */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop" 
          alt="Mãos plantando" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Texto sobre a imagem */}
        <div className="absolute bottom-10 left-10 text-white z-10 max-w-md p-4 rounded-lg bg-black/40 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-3">Semeando o futuro.</h2>
          <p className="text-lg text-white">
            Faça parte da rede que conecta e fortalece o produtor sertanejo.
          </p>
        </div>
      </div>

      {/* --- LADO DIREITO (Formulário) --- */}
      <div className="w-full lg:w-1/2 bg-[#00A859] flex flex-col items-center justify-center px-8 py-12">
        
        {/* Scroll caso o formulário seja grande em telas pequenas */}
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          
          <div className="text-center flex flex-col items-center gap-4 mb-2">
            <img src={logoImg} alt="Logo FAPE" className="w-64 object-contain drop-shadow-sm" />
            <h1 className="text-white font-bold text-xl tracking-wide">
              CRIE SUA CONTA
            </h1>
          </div>

          <form className="w-full flex flex-col gap-4">
            <Input type="text" placeholder="Nome Completo" icon={User} />
            <Input type="text" placeholder="CPF" icon={FileText} />
            <Input type="email" placeholder="E-mail" icon={Mail} />
            
            <div className="flex gap-4">
              <Input type="password" placeholder="Senha" icon={Lock} />
              <Input type="password" placeholder="Confirmar" icon={Lock} />
            </div>

            <div className="mt-4">
              <Button type="submit">CADASTRAR</Button>
            </div>
          </form>

          <p className="text-white text-sm mt-4">
            Já possui cadastro?{' '}
            <a href="/" className="font-bold underline hover:text-emerald-100 transition-colors">
              Fazer Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}