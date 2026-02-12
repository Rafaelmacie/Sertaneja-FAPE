import { User, Lock } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

import Logo from '../assets/logo-verde-sem-fundo.svg';
import fundoImg from '../assets/logo-fundo-fape.jpg';

export function Login() {
  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* --- LADO ESQUERDO --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">

        <img
          src={fundoImg}
          alt="Imagem de agricultores com uma boa colheita"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* TEXTO SOBRE A IMAGEM (sem overlay verde agora) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
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

      {/* --- LADO DIREITO --- */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-8 py-12 overflow-hidden">

        {/* NOVO FUNDO DECORATIVO */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-400 to-green-250" />

        {/* Forma decorativa institucional */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-700 rounded-full blur-2xl opacity-30" />

        {/* FORMULÁRIO (inalterado) */}
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

            <img
              src={Logo}
              alt="Logo FAPE"
              className="w-40 drop-shadow-md"
            />
            
            
            <h1 className="text-green-700 font-bold text-lg tracking-wide">
              SERTANEJA - LOGIN
            </h1>
          </motion.div>


          <form className="w-full flex flex-col gap-5">

            <Input type="text" placeholder="CPF" icon={User} />
            <Input type="password" placeholder="Senha" icon={Lock} />

            <div className="flex justify-between items-center text-sm w-full">
              <label className="flex items-center gap-2 cursor-pointer text-green-700">
                <input
                  type="checkbox"
                  className="rounded border-green-400 text-green-600 focus:ring-green-500"
                />
                <span className="select-none">Lembrar senha</span>
              </label>

              <a
                href="#"
                className="underline text-green-600 hover:text-green-800 transition-colors duration-200"
              >
                Esqueci senha
              </a>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3"
            >
              <Button
                type="submit"
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all duration-300"
              >
                Entrar
              </Button>
            </motion.div>

          </form>

          <p className="text-gray-600 text-sm mt-6 text-center">
            Ainda não tem acesso?{' '}
            <a
              href="/cadastro"
              className="font-bold text-green-700 hover:text-green-900 transition-colors"
            >
              Cadastre-se
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
