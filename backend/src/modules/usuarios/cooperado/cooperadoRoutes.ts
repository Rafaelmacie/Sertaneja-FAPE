import { Router } from "express";
import { CooperadoController } from "./cooperadoController";

const cooperadoRoutes = Router();
const controller = new CooperadoController();

// POST: http://localhost:3000/api/usuarios/cooperado/cadastro
cooperadoRoutes.post("/cadastro", (req, res) => controller.create(req, res));

export { cooperadoRoutes };