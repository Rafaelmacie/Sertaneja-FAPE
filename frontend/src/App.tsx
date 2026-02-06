import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { DefaultLayout } from './layouts/DefaultLayout';

// IMPORTAÇÃO ATUALIZADA: Apontando para a pasta do seu líder
import { CooperadoIndexPage } from './pages/cooperados/cooperadoIndexPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas Privadas (Com a Sidebar) */}
        <Route element={<DefaultLayout />}>
          {/* Quando acessar /cooperados, carrega o componente da pasta nova */}
          <Route path="/cooperados" element={<CooperadoIndexPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;