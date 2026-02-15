import { ArrowLeft } from 'lucide-react';

interface AbaDCEProps {
  onNext: () => void;
  onPrev: () => void;
}

export function AbaDCE({ onNext, onPrev }: AbaDCEProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="bg-gray-50 p-10 rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-wide">
          Declaração - Compromisso Estatutário
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 font-bold text-lg leading-relaxed text-justify uppercase">
            O COOPERADO acima qualificado DECLARA, a quem possa interessar, por meio da presente declaração, para que esta produza todos os fins de direito, que RECEBEU CÓPIA, CONHECE E ACEITA O ESTATUTO SOCIAL DA COOPERATIVA SERTANEJA CEARENSE - FAPE, PELO QUE SE COMPROMETE, a partir desta data, a cumprir todas as determinações contidas na mencionada norma social, sob pena das sanções estatutárias e legais.
          </p>
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