import db from "../../../shared/config/db";
import { PoolClient } from "pg";
import { CargoDiretor } from "../../../shared/constants/cargoDiretor";

export class DiretorRepository {

    /**
     * Vincula um usuário existente à tabela de diretores com um cargo específico.
     */
    async create(idUsuario: number, cpf: string, cargo: CargoDiretor, client: PoolClient): Promise<void> {
        const sql = `
            INSERT INTO diretor (id_usuario, cpf, cargo)
            VALUES ($1, $2, $3)
        `;
        // O cargo entra aqui validado pelo TypeScript
        await client.query(sql, [idUsuario, cpf, cargo]);
    }

    /**
     * Verifica se o CPF já existe na tabela de diretores
     */
    async findByCpf(cpf: string): Promise<boolean> {
        const sql = `SELECT id_diretor FROM diretor WHERE cpf = $1`;
        const result = await db.query(sql, [cpf]);
        return (result.rowCount ?? 0) > 0;
    }
}