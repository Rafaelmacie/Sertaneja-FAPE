import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  // Verifica se o usuário já tem um token salvo
  const token = localStorage.getItem('@Fape:token');

  // Se TEM token -> Joga pro Dashboard (replace evita que ele volte pela seta do navegador)
  // Se NÃO TEM token -> Renderiza a tela de Login (<Outlet />)
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}