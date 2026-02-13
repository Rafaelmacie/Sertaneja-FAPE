import { ArrowLeft } from 'lucide-react';

interface AbaConfirmacaoProps {
  onPrev: () => void;
  onFinish: () => void; // Esse abre o modal de senha lá no "Pai"
}

export function AbaConfirmacao({ onPrev, onFinish }: AbaConfirmacaoProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Coleta de Aceite do Compromisso Estatutário</h2>

      <p className="font-semibold text-gray-700">Cooperado: <span className="font-normal">Davi Nascimento Pereira</span></p>

      <div className="flex flex-col gap-4 mt-2">
        <p className="text-sm font-semibold text-gray-700">Atesto, sob as penas da lei, que realizei o seguinte procedimento na presença do(a) cooperado(a):</p>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-5 h-5 accent-[#00A859] rounded cursor-pointer" />
          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">LI EM VOZ ALTA todo o Compromisso Estatutário para o(a) cooperado(a).</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-5 h-5 accent-[#00A859] rounded cursor-pointer" />
          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">O(A) cooperado(a) declarou verbalmente ter compreendido os termos e concordou com eles.</span>
        </label>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Registro de Testemunhas (Obrigatório)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Testemunha 1 (Nome):</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CPF:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Testemunha 2 (Nome):</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CPF:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Selecione o método utilizado após a leitura e aceite verbal:</p>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="metodoAssinatura" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Coleta de Impressão Digital</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="metodoAssinatura" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Gerar documento sem assinatura.</span>
          </label>
        </div>
      </div>

      <div className="mt-8 bg-emerald-50 p-4 rounded-xl border border-[#00A859]/30">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-5 h-5 accent-[#00A859] rounded cursor-pointer" />
          <span className="text-[#00A859] font-bold">Eu, [Nome da Diretora], confirmo a veracidade deste procedimento.</span>
        </label>
      </div>

      <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-100">
        <button type="button" onClick={onPrev} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} /> Voltar
        </button>
        <button type="button" onClick={onFinish} className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-full shadow-md transition-transform hover:scale-105">
          Definir Senha e Finalizar
        </button>
      </div>
    </div>
  );
}