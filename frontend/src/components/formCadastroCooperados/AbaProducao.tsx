import { useState } from 'react';
import { PlusCircle, Trash2, Edit, ArrowLeft } from 'lucide-react';

interface AbaProducaoProps {
  onNext: () => void;
  onPrev: () => void;
}

interface Produto {
  id: number;
  nome: string;
  hectares: string;
  estado: string;
  cidade: string;
  localidade: string;
}

export function AbaProducao({ onNext, onPrev }: AbaProducaoProps) {
  const [produtosList, setProdutosList] = useState<Produto[]>([]);
  const [isProdutoModalOpen, setIsProdutoModalOpen] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState<Produto>({
    id: 0, nome: '', hectares: '', estado: '', cidade: '', localidade: ''
  });

  const handleAbrirModalProduto = (produto?: Produto) => {
    if (produto) setProdutoAtual(produto);
    else setProdutoAtual({ id: 0, nome: '', hectares: '', estado: '', cidade: '', localidade: '' });
    setIsProdutoModalOpen(true);
  };

  const handleSalvarProduto = () => {
    if (produtoAtual.id === 0) {
      setProdutosList([...produtosList, { ...produtoAtual, id: Date.now() }]);
    } else {
      setProdutosList(produtosList.map(p => p.id === produtoAtual.id ? produtoAtual : p));
    }
    setIsProdutoModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 min-h-[400px] relative">
      <h3 className="text-gray-700 font-semibold mb-2">Qual(is) tipo(s) de produto você produz?</h3>

      {produtosList.length === 0 ? (
        <button onClick={() => handleAbrirModalProduto()} className="w-full flex flex-col items-center justify-center gap-4 p-16 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-emerald-50 hover:border-[#00A859] hover:text-[#00A859] transition-all text-gray-400 group">
          <PlusCircle size={64} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
          <span className="text-xl font-bold">Adicionar produto</span>
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          {produtosList.map((produto) => (
            <div key={produto.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-700 flex-wrap">
                <span className="text-[#00A859] font-black mr-2">▼</span>
                <span className="font-bold">{produto.nome}</span> - <span>{produto.hectares} hectares</span> - <span>{produto.estado || 'CE'}</span> - <span>{produto.cidade || 'Boa Viagem'}</span> - <span>{produto.localidade}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleAbrirModalProduto(produto)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"><Edit size={20} /></button>
                <button onClick={() => setProdutosList(produtosList.filter(p => p.id !== produto.id))} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => handleAbrirModalProduto()} className="flex items-center gap-2 text-[#00A859] font-bold hover:text-emerald-700 hover:bg-emerald-50 w-fit px-4 py-2 rounded-lg transition-colors mt-2">
            <PlusCircle size={20} /> Adicionar produto
          </button>
        </div>
      )}

      <div className="flex justify-end items-center gap-4 mt-auto pt-6 border-t border-gray-100">
        <button type="button" onClick={onPrev} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} /> Voltar
        </button>
        <button type="button" onClick={onNext} className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-full shadow-md transition-transform hover:scale-105">
          Próximo
        </button>
      </div>

      {isProdutoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-4 mb-2">
              {produtoAtual.id === 0 ? 'Adicionar Novo Produto' : 'Editar Produto'}
            </h2>
            <select value={produtoAtual.nome} onChange={(e) => setProdutoAtual({...produtoAtual, nome: e.target.value})} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859] bg-white">
              <option value="">Selecione o produto...</option>
              <option value="Mel">Mel</option>
              <option value="Manga">Manga</option>
              <option value="Caju">Caju</option>
            </select>
            <input type="number" placeholder="Hectares de produção" value={produtoAtual.hectares} onChange={(e) => setProdutoAtual({...produtoAtual, hectares: e.target.value})} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859]" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Estado" value={produtoAtual.estado} onChange={(e) => setProdutoAtual({...produtoAtual, estado: e.target.value})} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859]" />
              <input type="text" placeholder="Cidade" value={produtoAtual.cidade} onChange={(e) => setProdutoAtual({...produtoAtual, cidade: e.target.value})} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859]" />
            </div>
            <input type="text" placeholder="Localidade" value={produtoAtual.localidade} onChange={(e) => setProdutoAtual({...produtoAtual, localidade: e.target.value})} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00A859]" />
            <div className="flex flex-col gap-3 mt-4">
              <button onClick={handleSalvarProduto} disabled={!produtoAtual.nome} className="w-full bg-[#00A859] hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-xl">Salvar</button>
              <button onClick={() => setIsProdutoModalOpen(false)} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}