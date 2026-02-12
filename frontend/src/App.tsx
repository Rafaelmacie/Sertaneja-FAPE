import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { DefaultLayout } from './layouts/DefaultLayout';

// IMPORTAÇÃO ATUALIZADA: Apontando para a pasta do seu líder
import { CooperadoIndexPage } from './pages/cooperados/cooperadoIndexPage';
import { Dashboard } from './pages/diretores/administrativo/Dashboard';
import { Clientes } from './pages/diretores/administrativo/Clientes';
import { Produtos } from './pages/diretores/administrativo/Produtos';
import { Demandas } from './pages/diretores/administrativo/Demandas';
import { AjudaSuporte } from './pages/diretores/administrativo/AjudaSuporte';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes/>} />
          <Route path="/produtos" element={<Produtos/>} />
          <Route path="/demandas" element={<Demandas/>} />
          <Route path="/ajuda" element={<AjudaSuporte/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;