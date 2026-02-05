import express from 'express';
import cors from 'cors';
import { administrativoRoutes } from './modules/usuarios/diretores/administrativo/administrativoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API Online 🚀' });
});

// AQUI É O SEGREDO DO CAMINHO:
// Isso cria a URL: http://localhost:3000/api/usuarios/diretores/administrativo/...
app.use('/api/usuarios/diretores/administrativo', administrativoRoutes);

export { app };