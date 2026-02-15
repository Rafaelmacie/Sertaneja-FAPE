import { useState } from 'react'; 
import { Search, Plus, MoreHorizontal, X, Upload, FileText, UserCircle, Download } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

// Adicionado idade e CPF mocado para o PopUp
const cooperadosMocados = [
  { id: 1, nome: 'Rafael Maciel Nogueira', produtos: 'Manga, bolo, polpa, torta', idade: 25, cpf: '123.456.789-00' },
  { id: 2, nome: 'Davi Nascimento Pereira', produtos: 'Abacaxi, suco de abacaxi', idade: 20, cpf: '400.289.224-00' },
  { id: 3, nome: 'Beterraba Silva', produtos: 'Beterraba', idade: 45, cpf: '111.222.333-44' },
];

export function CooperadoIndexPage() {
  const navigate = useNavigate();

  // Estados dos modais
  const [isModalInitialOpen, setIsModalInitialOpen] = useState(false);
  const [isUploadPdfModalOpen, setIsUploadPdfModalOpen] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  // NOVO ESTADO: Controle do Modal de Detalhes
  const [cooperadoSelecionado, setCooperadoSelecionado] = useState<typeof cooperadosMocados[0] | null>(null);

  const handleOpenPdfUpload = () => {
    setIsModalInitialOpen(false);
    setPdfFileName(null);
    setIsUploadPdfModalOpen(true);
  };

  const handleProcessarPdf = () => {
    alert('Processando arquivo PDF...');
    setIsUploadPdfModalOpen(false);
  };

  // Função para abrir os detalhes
  const handleAbrirDetalhes = (cooperado: typeof cooperadosMocados[0]) => {
    setCooperadoSelecionado(cooperado);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 relative">
      
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">LISTA DE COOPERADOS</h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="Buscar por nome" className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] bg-white shadow-sm transition-all" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button onClick={() => setIsModalInitialOpen(true)} className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 shadow-md transition-colors shrink-0">
            Cadastrar Cooperado <Plus size={20} />
          </button>
        </div>
      </header>

      <main className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Nome</th>
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Produto(s)</th>
              <th className="p-4 text-sm font-bold text-gray-700 text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cooperadosMocados.map((cooperado) => (
              <tr key={cooperado.id} className="hover:bg-gray-50 transition-colors group">
                <td className="p-4 text-gray-600 font-medium">{cooperado.nome}</td>
                <td className="p-4 text-gray-500">{cooperado.produtos}</td>
                <td className="p-4 text-center">
                  {/* BOTÃO QUE ABRE O MODAL DE DETALHES */}
                  <button 
                    onClick={() => handleAbrirDetalhes(cooperado)}
                    className="text-gray-400 hover:text-[#00A859] hover:bg-emerald-50 p-2 rounded-full transition-all"
                  >
                    <MoreHorizontal size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* ========================================================= */}
      {/* NOVO MODAL: DETALHES DO COOPERADO                         */}
      {/* ========================================================= */}
      {cooperadoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
            
            <button onClick={() => setCooperadoSelecionado(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <X size={28} strokeWidth={2.5} />
            </button>

            {/* Cabeçalho do Perfil */}
            <div className="flex items-center gap-6 border-b border-gray-100 pb-6 pr-8">
              <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shrink-0">
                <UserCircle size={80} strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">{cooperadoSelecionado.nome}</h2>
                <p className="text-gray-600 font-medium text-lg">Idade: <span className="font-normal">{cooperadoSelecionado.idade}</span></p>
                <p className="text-gray-600 font-medium text-lg">CPF: <span className="font-normal">{cooperadoSelecionado.cpf}</span></p>
              </div>
            </div>

            {/* Arquivos PDF */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <FileText size={24} />
                  </div>
                  <span className="font-semibold text-gray-700 text-left">Arquivo de cadastro ({cooperadoSelecionado.nome.split(' ')[0]}).pdf</span>
                </div>
                <Download size={20} className="text-gray-400 group-hover:text-gray-700" />
              </button>

              <button className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <FileText size={24} />
                  </div>
                  <span className="font-semibold text-gray-700 text-left">Estado de integralização ({cooperadoSelecionado.nome.split(' ')[0]}).pdf</span>
                </div>
                <Download size={20} className="text-gray-400 group-hover:text-gray-700" />
              </button>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-3 mt-2">
              <button className="w-full bg-[#0066B3] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-transform active:scale-95 text-lg">
                Editar dados do cooperado
              </button>
              
              <button 
                onClick={() => navigate(`/cooperados/desligamento/${cooperadoSelecionado.id}`)}
                className="w-full bg-[#FF3B30] hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-md transition-transform active:scale-95 text-lg"
              >
                Demitir/Desligar cooperado
              </button>
            </div>

          </div>
        </div>
      )}

      {/* (MANTIDOS OS OUTROS MODAIS AQUI EMBAIXO PARA NÃO POLUIR O CÓDIGO DO EXEMPLO) */}
      {/* MODAL 1: ESCOLHA DE TIPO DE CADASTRO */}
      {isModalInitialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalInitialOpen(false)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105"><X size={18} strokeWidth={3} /></button>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Tipo de Cadastro</h2>
            <div className="flex flex-col gap-4 w-full">
              <button onClick={() => navigate('/cooperados/novo')} className="bg-[#00A859] hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95">Cadastrar novo cooperado</button>
              <button onClick={handleOpenPdfUpload} className="bg-white border-2 border-[#00A859] text-[#00A859] hover:bg-emerald-50 font-semibold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95">Cadastrar cooperado já existente</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: IMPORTAÇÃO DE PDF */}
      {isUploadPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsUploadPdfModalOpen(false)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105"><X size={18} strokeWidth={3} /></button>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-inner"><FileText className="text-[#00A859]" size={32} /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Importar Ficha Cadastral</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">Envie o arquivo PDF com os dados do cooperado já existente.</p>
            <div onClick={() => setPdfFileName(pdfFileName ? null : 'ficha_cadastro_antigo.pdf')} className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all mb-8 group ${pdfFileName ? 'border-[#00A859] bg-emerald-50' : 'border-[#00A859]/40 bg-emerald-50/50 hover:bg-emerald-50'}`}>
              {pdfFileName ? (
                <><FileText className="text-[#00A859] mb-3" size={36} /><span className="text-sm font-bold text-emerald-800 text-center">{pdfFileName}</span><span className="text-xs text-emerald-600 mt-1">Clique para trocar o arquivo</span></>
              ) : (
                <><Upload className="text-[#00A859] mb-3 group-hover:scale-110 transition-transform" size={36} /><span className="text-sm font-semibold text-emerald-800 text-center">Clique para selecionar o PDF</span><span className="text-xs text-emerald-600 mt-1">ou arraste o arquivo para cá</span></>
              )}
            </div>
            <div className="flex w-full gap-3">
              <button onClick={() => setIsUploadPdfModalOpen(false)} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-all active:scale-95">Cancelar</button>
              <button onClick={handleProcessarPdf} disabled={!pdfFileName} className={`w-1/2 font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 ${pdfFileName ? 'bg-[#00A859] hover:bg-emerald-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}>Processar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}