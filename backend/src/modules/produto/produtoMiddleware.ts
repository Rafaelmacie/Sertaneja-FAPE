// src/modules/produto/produtoMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/appError";

export const validateProdutoEntry = (req: Request, res: Response, next: NextFunction) => {
    const { codigo, nome_prod, unidade_medida, preco } = req.body;

    if (!codigo || !nome_prod || !unidade_medida || preco === undefined) {
        throw new AppError("Campos obrigatórios (codigo, nome_prod, unidade_medida, preco) faltando.");
    }

    next();
};