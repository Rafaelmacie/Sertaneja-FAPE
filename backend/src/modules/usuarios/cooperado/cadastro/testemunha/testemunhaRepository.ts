import { PoolClient } from "pg";
import { ITestemunhaInput } from "../../cooperadoModel";

export class TestemunhaRepository {

    /**
     * Recebe uma lista de testemunhas (geralmente 2) e salva vinculando ao cooperado.
     */
    async createMany(idCooperado: number, testemunhas: ITestemunhaInput[], client: PoolClient): Promise<void> {
        
        const sql = `
            INSERT INTO testemunha (id_cooperado, nome, cpf)
            VALUES ($1, $2, $3)
        `;

        // Loop para salvar cada testemunha da lista
        for (const t of testemunhas) {
            // Remove caracteres não numéricos do CPF antes de salvar
            const cpfLimpo = t.cpf.replace(/\D/g, '');

            await client.query(sql, [
                idCooperado, 
                t.nome, 
                cpfLimpo
            ]);
        }
    }
}