import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

// Uma função que retorna um middleware (Higher-Order Function)
export function ensureRequiredFields(fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingFields: string[] = [];

        fields.forEach(field => {
            // Verifica se o campo está ausente ou é uma string vazia/espaços
            if (!req.body[field] || (typeof req.body[field] === 'string' && req.body[field].trim() === '')) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            // Lança o erro, que será pego pelo Middleware Global de Erro
            throw new AppError(`Campos obrigatórios faltando: ${missingFields.join(", ")}.`, 400);
        }

        return next();
    };
}