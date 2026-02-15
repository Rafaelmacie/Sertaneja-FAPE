import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermoDesligamentoPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Título da Página fora do card */}
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Termo de Demissão, Exclusão ou Eliminação (TDEE)
      </h1>

      {/* Container principal do formulário */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 animate-in fade-in duration-300">
        
        <h2 className="text-xl font-bold text-gray-800 text-center mb-10 uppercase tracking-wide">
          Termo de Demissão, Exclusão ou Eliminação
        </h2>

        <form className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Desligamento:</label>
              <input 
                type="date" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all text-gray-600" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Motivação:</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Obs:</label>
            <textarea 
              rows={5}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all resize-none" 
            />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <input type="radio" name="metodoAssinatura" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Coleta de Impressão Digital (Assinatura a Rogo)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <input type="radio" name="metodoAssinatura" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Gerar documento sem assinatura.</span>
            </label>
          </div>

          {/* Botões do Rodapé */}
          <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => navigate('/cooperados')} 
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={20} /> Voltar
            </button>
            <button 
              type="button" 
              onClick={() => {
                alert('Termo gerado com sucesso!');
                navigate('/cooperados');
              }}
              className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              Gerar termo
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}