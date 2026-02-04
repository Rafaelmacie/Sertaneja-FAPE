import { Request, Response } from "express";
import { AdministrativoService } from "./administrativoService";

export class AdministrativoController {
    
    async create(req: Request, res: Response) {
        const service = new AdministrativoService();
        const { nome, email, senha, telefone, cpf } = req.body;

        if (!nome || !email || !senha || !cpf) {
            return res.status(400).json({ error: "Campos obrigatórios (nome, email, senha, cpf) faltando." });
        }

        try {
            const result = await service.execute({ nome, email, senha, telefone, cpf });
            return res.status(201).json(result);
            
        } catch (error: any) {
            if (error.message === "Email já cadastrado." || error.message === "CPF já cadastrado.") {
                return res.status(409).json({ error: error.message });
            }
            console.error("Erro interno:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    async list(req: Request, res: Response) {
        const service = new AdministrativoService();

        try {
            const result = await service.listAll();
            return res.status(200).json(result);
            
        } catch (error: any) {
            console.error("Erro ao listar:", error);
            return res.status(500).json({ error: "Erro interno ao buscar diretores." });
        }
    }
}