import { useState } from 'react'; 
// Adicionei Upload e FileText aqui nos imports
import { Search, Plus, MoreHorizontal, X, Upload, FileText } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const cooperados = [
  { id: 1, nome: 'Rafael Maciel Nogueira', produtos: 'Manga, bolo, polpa, torta' },
  { id: 2, nome: 'Davi Nascimento Pereira', produtos: 'Abacaxi, suco de abacaxi' },
  { id: 3, nome: 'Erlano Benevides de Sousa', produtos: 'Goiaba, doce de goiaba, suco' },
  { id: 4, nome: 'Marcos Antônio Barros', produtos: 'Banana, doce de banana, vitamina' },
  { id: 5, nome: 'Kayron Warlen', produtos: 'Mel de abelha e mel de engenho' },
  { id: 6, nome: 'Beterraba Silva', produtos: 'Beterraba' },
  { id: 7, nome: 'Beterraba Silva', produtos: 'Beterraba' },
  { id: 8, nome: 'Beterraba Silva', produtos: 'Beterraba' },
];

export function CooperadoIndexPage() {
  const navigate = useNavigate();

  // --- ESTADOS DOS MODAIS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadPdfModalOpen, setIsUploadPdfModalOpen] = useState(false);
  
  // Estado apenas para simular visualmente que um arquivo foi escolhido
  const [fileName, setFileName] = useState<string | null>(null);

  // Função para abrir o modal de PDF
  const handleOpenPdfUpload = () => {
    setIsModalOpen(false); // Fecha o modal de escolha inicial
    setFileName(null); // Limpa qualquer arquivo antigo
    setIsUploadPdfModalOpen(true); // Abre o modal do PDF
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 relative">
      
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <h1 className="text-2xl font-bold text-slate-800">LISTA DE COOPERADOS</h1>

      {/* --- BARRA DE AÇÃO (Busca + Botão) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por nome" 
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white shadow-sm transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 shadow-md transition-colors"
        >
          Cadastrar Cooperado <Plus size={20} />
        </button>
      </div>

      {/* --- TABELA PADRONIZADA --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Nome</th>
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Produto(s)</th>
              <th className="p-4 text-sm font-bold text-gray-700 text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cooperados.map((cooperado) => (
              <tr key={cooperado.id} className="hover:bg-gray-50 transition-colors group">
                <td className="p-4 text-gray-600 font-medium">{cooperado.nome}</td>
                <td className="p-4 text-gray-500">{cooperado.produtos}</td>
                <td className="p-4 text-center">
                  <button className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-all">
                    <MoreHorizontal size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================= */}
      {/* 1. POPUP INICIAL: TIPO DE CADASTRO        */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <X size={18} strokeWidth={3} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Tipo de Cadastro
            </h2>

            <div className="flex flex-col gap-4 w-full">
              <button 
                onClick={() => navigate('/cooperados/novo')} 
                className="bg-[#00A859] hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
              >
                Cadastrar novo cooperado
              </button>
              
              {/* BOTÃO ALTERADO AQUI */}
              <button 
                onClick={handleOpenPdfUpload}
                className="bg-white border-2 border-[#00A859] text-[#00A859] hover:bg-emerald-50 font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95"
              >
                Cadastrar cooperado já existente
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 2. POPUP NOVO: UPLOAD DE PDF EXISTENTE    */}
      {/* ========================================= */}
      {isUploadPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsUploadPdfModalOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <X size={18} strokeWidth={3} />
            </button>

            {/* Ícone de Destaque */}
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <FileText className="text-[#00A859]" size={32} />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Importar Ficha Cadastral
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Envie o arquivo PDF com os dados do cooperado já existente para o sistema processar.
            </p>

            {/* ÁREA DE DROPZONE (Com simulação visual de clique) */}
            <div 
              onClick={() => setFileName(fileName ? null : 'ficha_cadastro_antigo.pdf')}
              className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all mb-8 group
                ${fileName 
                  ? 'border-[#00A859] bg-emerald-50' 
                  : 'border-[#00A859]/40 bg-emerald-50/50 hover:bg-emerald-50'
                }
              `}
            >
              {fileName ? (
                // Visão quando um arquivo foi "selecionado"
                <>
                  <FileText className="text-[#00A859] mb-3" size={36} />
                  <span className="text-sm font-bold text-emerald-800 text-center">{fileName}</span>
                  <span className="text-xs text-emerald-600 mt-1">Clique para trocar o arquivo</span>
                </>
              ) : (
                // Visão Inicial
                <>
                  <Upload className="text-[#00A859] mb-3 group-hover:scale-110 transition-transform" size={36} />
                  <span className="text-sm font-semibold text-emerald-800 text-center">Clique para selecionar o PDF</span>
                  <span className="text-xs text-emerald-600 mt-1">ou arraste o arquivo para cá</span>
                </>
              )}
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex w-full gap-3">
              <button 
                onClick={() => setIsUploadPdfModalOpen(false)}
                className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  alert('Processando arquivo PDF...');
                  setIsUploadPdfModalOpen(false);
                }}
                disabled={!fileName} // Só deixa clicar se tiver arquivo
                className={`w-1/2 font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95
                  ${fileName 
                    ? 'bg-[#00A859] hover:bg-emerald-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  }
                `}
              >
                Processar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}