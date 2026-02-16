import { PoolClient } from "pg";
import { ICreateCooperadoDTO } from "./cooperadoModel";

export class CooperadoRepository {

    /**
     * Cria o registro na tabela 'cooperado' vinculado ao usuário de login.
     * Retorna o ID do novo cooperado.
     */
    async create(idUsuario: number, data: ICreateCooperadoDTO['dadosPessoais'], client: PoolClient): Promise<number> {
        
        const sql = `
            INSERT INTO cooperado (
                id_usuario,
                num_matricula,
                cpf,
                rg,
                data_nasc,
                nome_pai,
                nome_mae,
                nacionalidade,
                naturalidade,
                estado_civil,
                regime_comunhao,
                profissao,
                ocupacao,
                renda_mensal,
                alfabetizacao,
                grau_escola,
                num_cnh,
                metodo_aceite
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                $11, $12, $13, $14, $15, $16, $17, $18
            )
            RETURNING id_cooperado
        `;

        const values = [
            idUsuario,
            data.numMatricula,
            data.cpf.replace(/\D/g, ''), // Limpa CPF
            data.rg,
            data.dataNasc,
            data.nomePai,
            data.nomeMae,
            data.nacionalidade,
            data.naturalidade,
            data.estadoCivil,
            data.regimeComunhao || null, // Opcional
            data.profissao,
            data.ocupacao,
            data.rendaMensal,
            data.alfabetizacao,
            data.grauEscola,
            data.numCnh || null,         // Opcional
            data.metodoAceite
        ];

        const result = await client.query(sql, values);
        return result.rows[0].id_cooperado;
    }
}