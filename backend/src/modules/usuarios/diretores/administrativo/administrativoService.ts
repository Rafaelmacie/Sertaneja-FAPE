import db from "./../../../../shared/config/db"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioRepository } from "./../../usuarioRepository";
import { DiretorRepository } from "./../diretorRepository";
import { AdministrativoRepository } from "./administrativoRepository";
import { ICreateAdministrativoDTO, ILoginResponse } from "./administrativoModel";

export class AdministrativoService {
    private usuarioRepo: UsuarioRepository;
    private diretorRepo: DiretorRepository;
    private adminRepo: AdministrativoRepository;

    constructor() {
        this.usuarioRepo = new UsuarioRepository();
        this.diretorRepo = new DiretorRepository();
        this.adminRepo = new AdministrativoRepository();
    }

    async execute(data: Omit<ICreateAdministrativoDTO, 'senhaHash'> & { senha: string }) {
        // 1. LIMPEZA DE DADOS
        const cpfLimpo = data.cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            throw new Error("CPF inválido. Deve conter 11 dígitos.");

        }    
        // 2. Validações (Usando os repositórios genéricos)
        const emailExists = await this.usuarioRepo.findByEmail(data.email);
        if (emailExists) throw new Error("Email já cadastrado.");

        const cpfExists = await this.diretorRepo.findByCpf(cpfLimpo);
        if (cpfExists) throw new Error("CPF já cadastrado.");

       // 3. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(data.senha, salt);

        // 4. Transação (O MAESTRO EM AÇÃO)
        return await db.transaction(async (client) => {
            // A. Cria Usuário (Genérico)
            const userId = await this.usuarioRepo.create({ 
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senhaHash 
            }, client);

            // B. Cria Diretor Administrativo (Genérico + Cargo Fixo)
            await this.diretorRepo.create(userId, cpfLimpo, 'ADMINISTRATIVO', client);

            return { 
                id_usuario: userId, 
                message: "Administrador cadastrado com sucesso!" 
            };
        });
    }
    async listAll() {
        // Usa o repositório específico de Adm para filtrar por cargo
        const users = await this.adminRepo.findAll();
        
        if (!users || users.length === 0) {
            return [];
        }

        return users;
    }

    async authenticate(email: string, senhaPlana: string): Promise<ILoginResponse> {
        // 1. Busca o usuário (Usando o repo específico que traz a senha)
        const user = await this.adminRepo.findUserForLogin(email);
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