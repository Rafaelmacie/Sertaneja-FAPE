import { ArrowLeft } from 'lucide-react';

interface AbaSocioeconomicaProps {
  onNext: () => void;
  onPrev: () => void;
}

export function AbaSocioeconomica({ onNext, onPrev }: AbaSocioeconomicaProps) {
  return (
    <form className="flex flex-col gap-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Profissão:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Ocupação:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">Selecione a sua renda mensal Individual:</label>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
          {['Até 1 salário mínimo', 'De 1 a 2 salários mínimos', 'Mais de 2 salários mínimos'].map((renda, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="renda" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{renda}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">Selecione o seu grau de escolaridade:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
          {['Não frequentou a escola', 'Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo', 'Superior ou mais'].map((esc, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="escolaridade" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{esc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Acessibilidade do Sistema</h3>
        <label className="block text-sm font-semibold text-gray-700 mb-4">O(a) cooperado sabe ler e escrever?</label>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
          {['Sim, lê e escreve', 'Sim lê e não escreve', 'Não lê e não escreve'].map((aces, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="acessibilidade" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{aces}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-100">
        <button type="button" onClick={onPrev} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} /> Voltar
        </button>
        <button type="button" onClick={onNext} className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-full shadow-md transition-transform hover:scale-105">
          Próximo
        </button>
      </div>
    </form>
  );
}