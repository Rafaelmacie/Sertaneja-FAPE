import db from "./../../../../shared/config/db";
import { IAdministrativoUser } from "./administrativoModel";

export class AdministrativoRepository {

    //Lista todos os usuários que são diretores administrativos.
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

    // Busca um administrador específico pelo email para realizar o Login.
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