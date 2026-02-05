import db from "./../../../../shared/config/db";
import { PoolClient } from "pg";
import { ICreateAdministrativoDTO, IAdministrativoUser } from "./administrativoModel";

export class AdministrativoRepository {

    async findByEmail(email: string, client?: PoolClient): Promise<IAdministrativoUser | undefined> {
        const sql = `
            SELECT u.id_usuario, u.nome, u.email 
            FROM usuario u
            INNER JOIN diretor d ON u.id_usuario = d.id_usuario
            WHERE u.email = $1 AND d.cargo = 'ADMINISTRATIVO'
        `;
        
        // SOLUÇÃO DO ERRO: Executar separadamente para o TypeScript não confundir os tipos
        const result = client 
            ? await client.query(sql, [email]) 
            : await db.query(sql, [email]);
            
        return result.rows[0];
    }

    async findByCpf(cpf: string, client?: PoolClient): Promise<{ id_diretor: number } | undefined> {
        const sql = `SELECT id_diretor FROM diretor WHERE cpf = $1`;
        
        const result = client 
            ? await client.query(sql, [cpf]) 
            : await db.query(sql, [cpf]);

        return result.rows[0];
    }

    // Métodos de escrita (Sempre usam client, pois são chamados dentro de transação)
    async saveUsuario(data: ICreateAdministrativoDTO, client: PoolClient): Promise<number> {
        const sql = `
            INSERT INTO usuario (nome, email, senha, telefone)
            VALUES ($1, $2, $3, $4) RETURNING id_usuario
        `;
        const values = [data.nome, data.email, data.senhaHash, data.telefone];
        
        const result = await client.query(sql, values);
        return result.rows[0].id_usuario;
    }

    async saveDiretor(idUsuario: number, cpf: string, client: PoolClient): Promise<void> {
        const sql = `
            INSERT INTO diretor (id_usuario, cpf, cargo)
            VALUES ($1, $2, 'ADMINISTRATIVO') 
        `;
        await client.query(sql, [idUsuario, cpf]);
    }

    async findAll(): Promise<IAdministrativoUser[]> {
        const sql = `
            SELECT u.id_usuario, u.nome, u.email, d.cpf, u.telefone, d.cargo
            FROM usuario u
            INNER JOIN diretor d ON u.id_usuario = d.id_usuario
            WHERE d.cargo = 'ADMINISTRATIVO'
            ORDER BY u.nome ASC
        `;
        
        // Query simples de leitura, não precisa de transação
        const result = await db.query(sql);
        return result.rows;
    }

    // Adicionar ao AdministrativoRepository
    async findUserForLogin(email: string): Promise<any | undefined> {
        const sql = `
            SELECT u.id_usuario, u.nome, u.email, u.senha 
            FROM usuario u
            INNER JOIN diretor d ON u.id_usuario = d.id_usuario
            WHERE u.email = $1 AND d.cargo = 'ADMINISTRATIVO'
        `;
        const result = await db.query(sql, [email]);
        return result.rows[0];
    }
}