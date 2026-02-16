import { Request, Response } from "express";
import { CooperadoService } from "./cooperadoService";

export class CooperadoController {
    
    async create(req: Request, res: Response) {
        const service = new CooperadoService();
        
        const data = req.body;

        if (!data.usuario || !data.dadosPessoais || !data.endereco || !data.financeiro) {
            return res.status(400).json({ 
                error: "Dados incompletos. Verifique se usuario, dadosPessoais, endereco e financeiro foram enviados." 
            });
        }

        try {
            const result = await service.execute(data);
            return res.status(201).json(result);
            
        } catch (error: any) {
            // Tratamento de erros conhecidos (Status 400)
            if (
                error.message === "Email já cadastrado." || 
                error.message === "CPF do cooperado inválido." ||
                error.message === "Produto selecionado não achado. Verifique o ID do produto."
            ) {
                return res.status(400).json({ error: error.message });
            }

            console.error("Erro ao cadastrar cooperado:", error);
            return res.status(500).json({ error: "Erro interno do servidor ao cadastrar cooperado." });
        }
    }
}