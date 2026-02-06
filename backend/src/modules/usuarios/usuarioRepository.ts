import db from "../../shared/config/db";
import { PoolClient } from "pg";
// AQUI: Importamos a interface (não defina ela de novo lá embaixo)
import { ICreateUsuarioDTO } from "./usuarioModel"; 

export class UsuarioRepository {
    
    /**
     * Cria um usuário genérico (serve para Diretor, Cooperado, etc).
     */
    async create(data: ICreateUsuarioDTO, client: PoolClient): Promise<number> {
        const sql = `
            INSERT INTO usuario (nome, email, senha, telefone)
            VALUES ($1, $2, $3, $4) 
            RETURNING id_usuario
        `;
        const values = [data.nome, data.email, data.senhaHash, data.telefone];
        
        const result = await client.query(sql, values);
        return result.rows[0].id_usuario;
    }

    /**
     * Busca rápida para validar duplicidade de email.
     */
    async findByEmail(email: string): Promise<boolean> {
        const sql = `SELECT id_usuario FROM usuario WHERE email = $1`;
        const result = await db.query(sql, [email]);
        return (result.rowCount ?? 0) > 0;
    }
}