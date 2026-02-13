import { Upload, ArrowLeft } from 'lucide-react';

// Aqui definimos o que essa aba espera receber do "Pai"
interface AbaDadosPessoaisProps {
  onNext: () => void;
  onCancel: () => void;
  onOpenUpload: (docName: string) => void;
}

export function AbaDadosPessoais({ onNext, onCancel, onOpenUpload }: AbaDadosPessoaisProps) {
  return (
    <form className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Nome:</label>
        <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Estado Civil:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">RG:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div className="md:col-span-1 flex justify-center pb-1">
          <button type="button" onClick={() => onOpenUpload('RG')} className="bg-[#00A859] hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-md transition-transform hover:scale-105">
            <Upload size={20} />
          </button>
        </div>
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Data Nasc:</label>
          <input type="date" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all text-gray-600" />
        </div>
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Regime de Comunhão:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Pai:</label>
        <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Mãe:</label>
        <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nacionalidade:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Naturalidade:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nº CNH:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div className="md:col-span-1 flex justify-center pb-1">
          <button type="button" onClick={() => onOpenUpload('CNH')} className="bg-[#00A859] hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-md transition-transform hover:scale-105">
            <Upload size={20} />
          </button>
        </div>
        <div className="md:col-span-7">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail:</label>
        <input type="email" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
      </div>

      {/* --- BOTÕES DO RODAPÉ --- */}
      <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} /> Voltar
        </button>
        <button type="button" onClick={onNext} className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-full shadow-md transition-transform hover:scale-105">
          Próximo
        </button>
      </div>
    </form>
  );
}