import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Mail, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  UserCircle
} from 'lucide-react';
import logoImg from '../assets/logo/logo-verde-sem-fundo.svg';

/**
 * Componente de Menu Lateral (Sidebar).
 * Gerencia a navegação principal do sistema e a função de logout.
 */
export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Cooperados', icon: Users, path: '/cooperados' },
    { label: 'Clientes', icon: UserCircle, path: '/clientes' },
    { label: 'Produtos', icon: ShoppingBag, path: '/produtos' },
    { label: 'Demandas', icon: Mail, path: '/demandas' },
    { label: 'Ajuda/Suporte', icon: HelpCircle, path: '/ajuda' },
  ];

  /**
   * Encerra a sessão do usuário, limpando os dados salvos e redirecionando para o login.
   * Ao fazer isso, a nossa `PrivateRoute` vai barrar a volta pro sistema.
   */
  const handleLogout = () => {
    localStorage.removeItem('@Fape:token');
    localStorage.removeItem('@Fape:user');
    navigate('/');
  };

  return (
    <aside 
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative z-20 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Botão de Recolher */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-50 text-[#00A859] hover:text-emerald-700 transition-colors p-2"
      >
        {isCollapsed ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
      </button>

      {/* --- LOGO --- */}
      <div className={`p-6 flex justify-center items-center ${isCollapsed ? 'px-2' : ''}`}>
        <img 
          src={logoImg} 
          alt="Logo FAPE" 
          className={`object-contain transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-40'}`} 
        />
      </div>

      {/* --- PERFIL --- */}
      <div className={`mx-4 mb-6 rounded-xl bg-gray-200 border border-gray-100 p-3 flex items-center gap-3 transition-all ${isCollapsed ? 'justify-center mx-2 p-2 bg-transparent border-0' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00A859] font-bold shrink-0 shadow-sm">
          DN
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-800 truncate">Davi Nascimento</p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
          </div>
        )}
      </div>

      {/* --- NAVEGAÇÃO --- */}
      <nav className="flex-1 px-3 flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out group
                ${isCollapsed ? 'justify-center px-2' : ''} 
                
                ${isActive 
                  ? isCollapsed 
                    ? 'bg-[#00A859] text-white shadow-md' // ESTILO FECHADO
                    : 'bg-white shadow-lg shadow-gray-300/50 text-[#00A859] font-bold translate-x-2 z-10' // ESTILO ABERTO
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900' // INATIVO
                }
              `}
            >
              {/* BARRINHA VERDE LATERAL */}
              {isActive && !isCollapsed && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00A859] rounded-l-xl"></div>
              )}
              
              <item.icon 
                size={22} 
                className={`
                  shrink-0 z-10 relative transition-colors
                  ${isActive 
                    ? isCollapsed ? 'text-white' : 'text-[#00A859]' 
                    : 'text-gray-400 group-hover:text-gray-900'
                  }
                `} 
              />
              
              {!isCollapsed && <span className="z-10 relative">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* --- BOTÃO SAIR --- */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={22} />
          {!isCollapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  );
}