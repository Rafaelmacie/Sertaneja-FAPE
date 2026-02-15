import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // Verifica se o usuário tem um token salvo
  const token = localStorage.getItem('@Fape:token');

  // Se TEM token -> Deixa entrar no sistema (<Outlet />)
  // Se NÃO TEM token -> Chuta de volta pro Login (/)
  return token ? <Outlet /> : <Navigate to="/" replace />;
}