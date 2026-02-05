import db from "./../../../../shared/config/db"; 
import bcrypt from "bcryptjs";
import { AdministrativoRepository } from "./administrativoRepository";
import { ICreateAdministrativoDTO } from "./administrativoModel";
import jwt from "jsonwebtoken";
import { ILoginResponse } from "./administrativoModel";

export class AdministrativoService {
    private repository: AdministrativoRepository;

    constructor() {
        this.repository = new AdministrativoRepository();
    }

    async execute(data: Omit<ICreateAdministrativoDTO, 'senhaHash'> & { senha: string }) {
        // 1. LIMPEZA DE DADOS (A CORREÇÃO ESTÁ AQUI)
        // Remove pontos e traços, deixando apenas os números.
        // Ex: "123.456.789-00" vira "12345678900" (11 caracteres)
        const cpfLimpo = data.cpf.replace(/\D/g, '');

        // Validação extra: CPF deve ter 11 dígitos
        if (cpfLimpo.length !== 11) {
            throw new Error("CPF inválido. Deve conter 11 dígitos.");
        }

        // 2. Validações de Leitura
        const emailExists = await this.repository.findByEmail(data.email);
        if (emailExists) throw new Error("Email já cadastrado.");

        // Usamos o cpfLimpo aqui na busca também
        const cpfExists = await this.repository.findByCpf(cpfLimpo);
        if (cpfExists) throw new Error("CPF já cadastrado.");

        // 3. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(data.senha, salt);

        // 4. Transação
        return await db.transaction(async (client) => {
            const userId = await this.repository.saveUsuario({ 
                ...data, 
                cpf: cpfLimpo, // Salvamos o CPF limpo no objeto do usuário se necessário
                senhaHash 
            }, client);

            // Passamos o cpfLimpo para a tabela diretor
            await this.repository.saveDiretor(userId, cpfLimpo, client);

            return { 
                id_usuario: userId, 
                message: "Administrador cadastrado com sucesso!" 
            };
        });
    }

    async listAll() {
        const users = await this.repository.findAll();
        
        if (!users || users.length === 0) {
            return []; // Retorna array vazio se não achar ninguém
        }

        return users;
    }
    async authenticate(email: string, senhaPlana: string): Promise<ILoginResponse> {
    // 1. Busca o usuário
        const user = await this.repository.findUserForLogin(email);
        if (!user) {
            throw new Error("Credenciais inválidas.");
        }

        // 2. Verifica a senha
        const isPasswordValid = await bcrypt.compare(senhaPlana, user.senha);
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas.");
        }

        // 3. Gera o Token (Validade de 1 dia)
        const secret = process.env.JWT_SECRET || "fape-secret-key-2026";
        const token = jwt.sign(
            { id: user.id_usuario, email: user.email, role: 'ADMIN' },
            secret,
            { expiresIn: "1d" }
        );

        return {
            auth: true,
            token,
            user: {
                id_usuario: user.id_usuario,
                nome: user.nome,
                email: user.email
            }
    };
}
}