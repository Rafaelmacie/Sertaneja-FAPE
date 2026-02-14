import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Eye, EyeOff } from 'lucide-react';

// --- COMPONENTES DAS ABAS (Desacoplados) ---
import { AbaDadosPessoais } from '../cooperados/Abas/AbaDadosPessoais';
import { AbaSocioeconomica } from '../cooperados/Abas/AbaSocioeconomica';
import { AbaEndereco } from '../cooperados/Abas/AbaEndereco';
import { AbaProducao } from '../cooperados/Abas/AbaProducao';
import { AbaBancarios } from './Abas/Ababancarios';
import { AbaDCE } from '../cooperados/Abas/AbaDCE';
import { AbaConfirmacao } from '../cooperados/Abas/AbaConfirmacao';

/**
 * Configuração estática das abas do formulário.
 * Mantida fora do componente para evitar recriação de memória a cada re-renderização (Performance).
 */
const TABS_CONFIG = [
  { id: 'pessoais', label: 'Dados Pessoais' },
  { id: 'socioeconomica', label: 'Quali. Socioeconômica' },
  { id: 'endereco', label: 'Dados de Endereço' },
  { id: 'producao', label: 'Dados de Produção' },
  { id: 'bancarios', label: 'Dados Bancários' },
  { id: 'dce', label: 'DCE' },
  { id: 'confirmacao', label: 'Confirmação' },
];

/**
 * Componente Pai (Controller) do Cadastro de Cooperados.
 * Responsável por gerenciar o estado global do formulário multi-etapas,
 * a transição entre abas filhas e os modais sobrepostos (Upload e Senha).
 */
export function CadastroCooperadoIndexPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pessoais');

  // --- ESTADOS GLOBAIS DE MODAIS ---
  // Upload Genérico (Reaproveitado por múltiplas abas)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadDocName, setUploadDocName] = useState('');

  // Modal de Senha Final
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Abre o modal de upload genérico e define qual documento está sendo solicitado.
   * @param docName Nome de exibição do documento (ex: 'RG', 'Comprovante de Residência')
   */
  const handleOpenUpload = (docName: string) => {
    setUploadDocName(docName);
    setIsUploadModalOpen(true);
  };

  /**
   * Finaliza o fluxo de cadastro, fecha modais e redireciona o usuário para a listagem.
   */
  const handleFinalizarCadastro = () => {
    setIsPasswordModalOpen(false);
    navigate('/cooperados');
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* NAVEGAÇÃO DAS ABAS */}
        <nav className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
          {TABS_CONFIG.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-bold transition-colors relative
                ${activeTab === tab.id ? 'text-[#00A859]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
              `}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00A859] rounded-t-md"></div>}
            </button>
          ))}
        </nav>

        {/* ÁREA DE RENDERIZAÇÃO DAS ABAS (Componentes Desacoplados) */}
        <main className="p-8">
          {activeTab === 'pessoais' && <AbaDadosPessoais onNext={() => setActiveTab('socioeconomica')} onCancel={() => navigate('/cooperados')} onOpenUpload={handleOpenUpload} />}
          {activeTab === 'socioeconomica' && <AbaSocioeconomica onNext={() => setActiveTab('endereco')} onPrev={() => setActiveTab('pessoais')} />}
          {activeTab === 'endereco' && <AbaEndereco onNext={() => setActiveTab('producao')} onPrev={() => setActiveTab('socioeconomica')} onOpenUpload={handleOpenUpload} />}
          {activeTab === 'producao' && <AbaProducao onNext={() => setActiveTab('bancarios')} onPrev={() => setActiveTab('endereco')} />}
          {activeTab === 'bancarios' && <AbaBancarios onNext={() => setActiveTab('dce')} onPrev={() => setActiveTab('producao')} />}
          {activeTab === 'dce' && <AbaDCE onNext={() => setActiveTab('confirmacao')} onPrev={() => setActiveTab('bancarios')} />}
          {activeTab === 'confirmacao' && <AbaConfirmacao onPrev={() => setActiveTab('dce')} onFinish={() => setIsPasswordModalOpen(true)} />}
        </main>
      </div>

      {/* --- MODAIS GLOBAIS DA TELA --- */}

      {/* MODAL DE UPLOAD GERAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsUploadModalOpen(false)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
              <X size={18} strokeWidth={3} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Anexar {uploadDocName}</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">Formatos aceitos: PDF, JPG, PNG (Máx 5MB)</p>
            <div className="w-full border-2 border-dashed border-[#00A859]/40 bg-emerald-50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors">
              <Upload className="text-[#00A859] mb-3" size={36} />
              <span className="text-sm font-semibold text-emerald-800">Clique para selecionar</span>
              <span className="text-xs text-emerald-600 mt-1">ou arraste o arquivo aqui</span>
            </div>
            <button onClick={() => setIsUploadModalOpen(false)} className="mt-6 w-full bg-[#00A859] hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95">Confirmar Upload</button>
          </div>
        </div>
      )}

      {/* MODAL DE DEFINIR SENHA */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md relative flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsPasswordModalOpen(false)} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
              <X size={18} strokeWidth={3} />
            </button>
            <h2 className="text-2xl font-black text-gray-800 text-center uppercase tracking-wide">Defina uma senha para o usuário</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha:</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-2 focus:ring-[#00A859]/20 transition-all text-lg tracking-widest" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar senha:</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A859] focus:ring-2 focus:ring-[#00A859]/20 transition-all text-lg tracking-widest" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
            
            <button onClick={handleFinalizarCadastro} className="mt-2 w-full bg-[#00A859] hover:bg-emerald-700 text-white font-black py-4 px-4 rounded-xl shadow-lg transition-transform hover:scale-105 uppercase tracking-wide text-lg">
              Finalizar Cadastro
            </button>
          </div>
        </div>
      )}

    </div>
  );
}