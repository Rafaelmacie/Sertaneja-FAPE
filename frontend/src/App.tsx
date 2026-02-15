import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Nossos "Guarda-costas" de rotas
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';

import { Login } from './pages/Login';
import { DefaultLayout } from './layouts/DefaultLayout';

// imports de cooperad
import { CooperadoIndexPage } from './pages/diretores/administrativo/controleCooperados/tabelaCooperados';
import { CadastroCooperadoIndexPage } from './pages/diretores/administrativo/controleCooperados/cadastroCooperado';
import { TermoDesligamentoPage } from './pages/diretores/administrativo/controleCooperados/TermoDesligamentoPage';

// imports das paginas 
import { Dashboard } from './pages/diretores/administrativo/Dashboard';
import { Clientes } from './pages/diretores/administrativo/Clientes';
import { Produtos } from './pages/diretores/administrativo/Produtos';
import { Demandas } from './pages/diretores/administrativo/Demandas';
import { AjudaSuporte } from './pages/diretores/administrativo/AjudaSuporte';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ============================================================== */}
        {/* ROTA PÚBLICA (Só acessa o Login se NÃO estiver autenticado)    */}
        {/* ============================================================== */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>


        {/* ============================================================== */}
        {/* ROTAS PRIVADAS (Só acessa o Sistema se ESTIVER autenticado)    */}
        {/* ============================================================== */}
        <Route element={<PrivateRoute />}>
          
          {/* O DefaultLayout engloba a Sidebar para todas essas telas */}
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rotas de Cooperados */}
            <Route path="/cooperados" element={<CooperadoIndexPage />} />
            <Route path="/cooperados/novo" element={<CadastroCooperadoIndexPage />} />
            <Route path="/cooperados/desligamento/:id" element={<TermoDesligamentoPage />} /> 
            
            {/* Outras páginas */}
            <Route path="/clientes" element={<Clientes/>} />
            <Route path="/produtos" element={<Produtos/>} />
            <Route path="/demandas" element={<Demandas/>} />
            <Route path="/ajuda" element={<AjudaSuporte/>} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;