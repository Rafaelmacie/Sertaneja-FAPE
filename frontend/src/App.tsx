import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login'; // Importando a tela que criamos

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota "/" define o que aparece assim que o site abre */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;