import { Request, Response } from "express";
import { AdministrativoService } from "./administrativoService";

export class AdministrativoController {

    async create(req: Request, res: Response) {
        const service = new AdministrativoService();
        const { nome, email, senha, telefone, cpf } = req.body;

        const result = await service.execute({ nome, email, senha, telefone, cpf });

        return res.status(201).json(result);
    }

    async list(req: Request, res: Response) {
        const service = new AdministrativoService();
        const result = await service.listAll();

        return res.status(200).json(result);
    }

    async login(req: Request, res: Response) {
        const service = new AdministrativoService();
        const { email, senha } = req.body;

        const result = await service.authenticate(email, senha);

        return res.status(200).json(result);
    }
}