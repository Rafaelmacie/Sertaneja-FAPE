import { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';

interface AbaEnderecoProps {
  onNext: () => void;
  onPrev: () => void;
  onOpenUpload: (docName: string) => void;
}

export function AbaEndereco({ onNext, onPrev, onOpenUpload }: AbaEnderecoProps) {
  const [regiao, setRegiao] = useState('urbana');
  const [localRural, setLocalRural] = useState('comunidade');

  const getNomeLocalRural = () => {
    if (localRural === 'sitio') return 'Nome do seu sítio:';
    if (localRural === 'fazenda') return 'Nome da sua fazenda:';
    if (localRural === 'vila') return 'Nome da sua vila:';
    return 'Nome da sua comunidade:';
  };

  return (
    <form className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-3">Defina a sua região:</label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="radio" name="regiao" value="urbana" checked={regiao === 'urbana'} onChange={() => setRegiao('urbana')} className="w-5 h-5 accent-[#00A859] cursor-pointer" />
            <span className="text-gray-700 font-medium group-hover:text-gray-900">Urbana</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="radio" name="regiao" value="rural" checked={regiao === 'rural'} onChange={() => setRegiao('rural')} className="w-5 h-5 accent-[#00A859] cursor-pointer" />
            <span className="text-gray-700 font-medium group-hover:text-gray-900">Rural</span>
          </label>
        </div>
      </div>

      {regiao === 'urbana' && (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rua:</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-9">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Complemento:</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Num:</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
            </div>
          </div>
        </div>
      )}

      {regiao === 'rural' && (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">Selecione o local:</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {['Sitio', 'Fazenda', 'Vila', 'Comunidade'].map((local) => (
                <label key={local} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="localRural" value={local.toLowerCase()} checked={localRural === local.toLowerCase()} onChange={() => setLocalRural(local.toLowerCase())} className="w-5 h-5 accent-[#00A859] cursor-pointer" />
                  <span className="text-gray-700 group-hover:text-gray-900">{local}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{getNomeLocalRural()}</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Bairro/Distrito:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">CEP:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Estado:</label>
          <input type="text" className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <label className="block text-sm font-semibold text-gray-700">Comprovante de residência:</label>
        <button type="button" onClick={() => onOpenUpload('Comprovante de Residência')} className="bg-[#00A859] hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-md transition-transform hover:scale-105">
          <Upload size={20} />
        </button>
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