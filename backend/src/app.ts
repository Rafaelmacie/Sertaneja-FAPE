import express from 'express';
import cors from 'cors';
import { administrativoRoutes } from './modules/usuarios/diretores/administrativo/administrativoRoutes';
import { globalErrorHandler } from './shared/middlewares/globalErrorHandler';
import { produtoRoutes } from './modules/produto/produtoRoutes';
import { cooperadoRoutes } from "./modules/usuarios/cooperado/cooperadoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API Online 🚀' });
});

// Diretor Administrativo
app.use('/usuarios/diretores/administrativo', administrativoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use("/api/usuarios/cooperado", cooperadoRoutes);

app.use(globalErrorHandler);

export { app };