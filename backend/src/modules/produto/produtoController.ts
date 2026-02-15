// src/modules/produto/produtoController.ts
import { Request, Response } from "express";
import { ProdutoService } from "./produtoService";

export class ProdutoController {
    async create(req: Request, res: Response) {
        const service = new ProdutoService();
        try {
            const result = await service.execute(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            // O tratamento de erro global ou específico via AppError
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}