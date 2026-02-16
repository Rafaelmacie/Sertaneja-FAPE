import { PoolClient } from "pg";
import { IFinanceiroInput } from "../../cooperadoModel";

export class ContaBancariaRepository {

    async create(idCooperado: number, data: IFinanceiroInput, client: PoolClient): Promise<void> {
        
        // SQL baseado no seu diagrama de classes (Tabela Conta Bancária)
        // Colunas: id_cooperado, nome (banco), tipo, agencia, num_conta, chave_pix
        const sql = `
            INSERT INTO conta_bancaria (
                id_cooperado, 
                nome_banco, 
                tipo_conta, 
                agencia, 
                num_conta, 
                chave_pix
            )
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [
            idCooperado,
            data.nomeBanco,
            data.tipoConta, // 'corrente' ou 'poupanca'
            data.agencia,
            data.numConta,  // O banco vai receber como string ou int dependendo da sua tabela
            data.chavePix
        ];

        await client.query(sql, values);
    }
}