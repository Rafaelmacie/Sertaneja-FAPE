import { Router } from "express";
import { AdministrativoController } from "./administrativoController";
import { ensureRequiredFields } from "../../../../shared/middlewares/validateResources";

const administrativoRoutes = Router();
const controller = new AdministrativoController();

// Rota de Cadastro
// Valida se nome, email, senha e cpf estão presentes antes de chamar o controller
administrativoRoutes.post(
    "/cadastro", 
    ensureRequiredFields(["nome", "email", "senha", "cpf", "telefone"]), 
    (req, res) => controller.create(req, res)
);

// Rota de Login
// Valida se email e senha estão presentes
administrativoRoutes.post(
    "/login", 
    ensureRequiredFields(["email", "senha"]),
    (req, res) => controller.login(req, res)
);

administrativoRoutes.get("/listar", (req, res) => controller.list(req, res));

export { administrativoRoutes };