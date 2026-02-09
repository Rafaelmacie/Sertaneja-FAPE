import db from "./../../../../shared/config/db";
import bcrypt from "bcryptjs";
import { UsuarioRepository } from "./../../usuarioRepository";
import { DiretorRepository } from "./../diretorRepository";
import { AdministrativoRepository } from "./administrativoRepository";
import { ICreateAdministrativoDTO, ILoginResponse } from "./administrativoModel";
import { Validators } from "../../../../shared/utils/validators";
import { Formatters } from "../../../../shared/utils/formatters";
import { AppError } from "../../../../shared/errors/appError"
import jwt from "jsonwebtoken";

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
        // Sanitização
        const nomeLimpo = Formatters.toTitleCase(data.nome);
        const emailLimpo = Formatters.lowerTrim(data.email);
        const cpfLimpo = Formatters.onlyNumbers(data.cpf);
        const telefoneLimpo = Formatters.onlyNumbers(data.telefone);

        // Validações (Lançam AppError com status code correto)
        if (!Validators.isValidName(nomeLimpo)) {
            throw new AppError("Nome inválido. Mínimo 3 caracteres, sem números ou símbolos.");
        }
        if (!Validators.isValidEmail(emailLimpo)) {
            throw new AppError("Formato de email inválido.");
        }
        if (!Validators.isValidCPF(cpfLimpo)) {
            throw new AppError("CPF inválido.");
        }
        if (!Validators.isValidPhone(telefoneLimpo)) {
            throw new AppError("Telefone inválido. Deve conter DDD + Número.");
        }
        if (!Validators.isValidPassword(data.senha)) {
            throw new AppError("Senha fraca. Mínimo 8 chars, Maiúscula, Minúscula e Número.");
        }

        // Validações de Banco (Conflito = 409)
        const emailExists = await this.usuarioRepo.findByEmail(emailLimpo);
        if (emailExists) throw new AppError("Email já cadastrado.", 409);

        const cpfExists = await this.diretorRepo.findByCpf(cpfLimpo);
        if (cpfExists) throw new AppError("CPF já cadastrado.", 409);

        // Persistência
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(data.senha, salt);

        return await db.transaction(async (client) => {
            const userId = await this.usuarioRepo.create({
                nome: nomeLimpo,
                email: emailLimpo,
                telefone: telefoneLimpo,
                senhaHash
            }, client);

            await this.diretorRepo.create(userId, cpfLimpo, 'ADMINISTRATIVO', client);

            return {
                id_usuario: userId,
                message: "Administrador cadastrado com sucesso!"
            };
        });
    }

    async listAll() {
        const users = await this.adminRepo.findAll();
        return users || [];
    }

    async authenticate(email: string, senhaPlana: string): Promise<ILoginResponse> {
        const user = await this.adminRepo.findUserForLogin(email);
        if (!user) throw new AppError("Credenciais inválidas.", 401);

        const isPasswordValid = await bcrypt.compare(senhaPlana, user.senha);
        if (!isPasswordValid) throw new AppError("Credenciais inválidas.", 401);

        const secret = process.env.JWT_SECRET || "fape-secret-key-2026";
        const token = jwt.sign(
            { id: user.id_usuario, email: user.email, role: 'ADMIN' },
            secret,
            { expiresIn: "1d" }
        );

        return {
            auth: true,
            token,
            user: { id_usuario: user.id_usuario, nome: user.nome, email: user.email }
        };
    }
}