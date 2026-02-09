import express from 'express';
import cors from 'cors';
import { administrativoRoutes } from './modules/usuarios/diretores/administrativo/administrativoRoutes';
import { globalErrorHandler } from './shared/middlewares/globalErrorHandler'

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API Online 🚀' });
});

// Diretor Administrativo
app.use('/usuarios/diretores/administrativo', administrativoRoutes);

app.use(globalErrorHandler);

export { app };