import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Área de Conteúdo (que muda conforme a página) */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
}