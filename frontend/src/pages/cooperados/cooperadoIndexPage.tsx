import { Search, Plus, MoreHorizontal } from 'lucide-react';
// Dados falsos para visualização (depois virão do Back-end)
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
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <h1 className="text-2xl font-bold text-slate-800">Lista de Cooperados</h1>

      {/* --- BARRA DE AÇÃO (Busca + Botão) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Input de Busca Estilizado */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por nome" 
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white shadow-sm transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Botão de Adicionar (Verde) */}
        <button className="bg-[#00A859] hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 shadow-md transition-colors">
          Cadastrar Cooperado <Plus size={20} />
        </button>
      </div>

      {/* --- TABELA PADRONIZADA --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          {/* Cabeçalho da Tabela */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Nome</th>
              <th className="p-4 text-sm font-bold text-gray-700 w-1/3">Produto(s)</th>
              <th className="p-4 text-sm font-bold text-gray-700 text-center">Detalhes</th>
            </tr>
          </thead>

          {/* Corpo da Tabela */}
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

    </div>
  );
}