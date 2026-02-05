import { Router } from "express";
import { AdministrativoController } from "./administrativoController";

const administrativoRoutes = Router();
const controller = new AdministrativoController();

// Como já definimos o prefixo longo no app.ts, aqui usamos apenas /cadastro
// URL Final: .../administrativo/cadastro
administrativoRoutes.post("/cadastro", (req, res) => controller.create(req, res));
// Adicionar ao administrativoRoutes.ts
administrativoRoutes.post("/login", (req, res) => controller.login(req, res));

administrativoRoutes.get("/listar", (req, res) => controller.list(req, res));

export { administrativoRoutes };