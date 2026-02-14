import { ArrowLeft } from 'lucide-react';

interface AbaBancariosProps {
  onNext: () => void;
  onPrev: () => void;
}

export function AbaBancarios({ onNext, onPrev }: AbaBancariosProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold text-[#00A859] mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#00A859] text-white flex items-center justify-center text-sm">1</span>
          Conta Principal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-4">
          <div className="md:col-span-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Banco:</label>
            <input type="text" placeholder="Ex: Banco do Brasil" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Agência:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Conta Nº:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Selecione o tipo de Conta Bancária:</label>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="tipoConta1" value="poupanca" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Poupança</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="tipoConta1" value="corrente" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Corrente</span>
            </label>
          </div>
        </div>
        <div className="md:w-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Chave PIX:</label>
          <input type="text" placeholder="CPF, E-mail, Celular..." className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm">2</span>
          Conta Secundária (Opcional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-4">
          <div className="md:col-span-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Banco:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all bg-white" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Agência:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all bg-white" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Conta Nº:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all bg-white" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="tipoConta2" value="poupanca" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Poupança</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="tipoConta2" value="corrente" className="w-5 h-5 accent-[#00A859] cursor-pointer" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Corrente</span>
            </label>
          </div>
        </div>
        <div className="md:w-1/2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Chave PIX:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] transition-all bg-white" />
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
    </div>
  );
}