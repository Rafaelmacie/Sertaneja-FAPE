import db from "../../../shared/config/db";
import bcrypt from "bcryptjs";

// 1. Imports dos Repositórios (As peças do LEGO)
import { UsuarioRepository } from "../usuarioRepository";
import { CooperadoRepository } from "./cooperadoRepository"; 
import { EnderecoRepository } from "./cadastro/endereco/enderecoRepository";
import { ContaBancariaRepository } from "./cadastro/contaBancaria/contaBancariaRepository";
import { ProducaoRepository } from "./cadastro/producao/producaoRepository";
import { TestemunhaRepository } from "./cadastro/testemunha/testemunhaRepository";

// 2. Import do Model (O Contrato)
import { ICreateCooperadoDTO } from "./cooperadoModel";

export class CooperadoService {
    
    // Instancia todos os repositórios necessários
    private usuarioRepo = new UsuarioRepository();
    private cooperadoRepo = new CooperadoRepository();
    private enderecoRepo = new EnderecoRepository();
    private contaRepo = new ContaBancariaRepository();
    private producaoRepo = new ProducaoRepository();
    private testemunhaRepo = new TestemunhaRepository();

    async execute(data: ICreateCooperadoDTO) {
        
        // --- VALIDAÇÕES INICIAIS ---
        
        // 1. Verifica se o E-mail já existe (na tabela usuario)
        const emailExists = await this.usuarioRepo.findByEmail(data.usuario.email);
        if (emailExists) throw new Error("Email já cadastrado.");

        // 2. Limpa e valida CPF do Cooperado
        const cpfLimpo = data.dadosPessoais.cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) throw new Error("CPF do cooperado inválido.");

        // 3. Verifica se CPF já existe (na tabela cooperado, não diretor)
        // Nota: Precisaríamos de um método findByCpf no CooperadoRepo, 
        // mas se der erro de chave duplicada o banco avisa. Vamos seguir.

        // 4. Hash da Senha (segurança)
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(data.usuario.senhaHash, salt); // O front manda a senha pura aqui

        // --- INÍCIO DA TRANSAÇÃO (TUDO OU NADA) ---
        return await db.transaction(async (client) => {
            
            // PASSO A: Criar o Usuário Base (Login)
            const idUsuario = await this.usuarioRepo.create({
                nome: data.usuario.nome,
                email: data.usuario.email,
                telefone: data.usuario.telefone,
                senhaHash: senhaHash
            }, client);

            // PASSO B: Criar o Cooperado (Dados Pessoais)
            const idCooperado = await this.cooperadoRepo.create(idUsuario, {
                ...data.dadosPessoais,
                cpf: cpfLimpo // Garante que salva limpo
            }, client);

            // PASSO C: Salvar Endereço (Rural ou Urbano)
            // O repositório decide qual tabela usar baseado no data.endereco.tipo
            await this.enderecoRepo.create(idCooperado, data.endereco, client);

            // PASSO D: Salvar Conta Bancária
            await this.contaRepo.create(idCooperado, data.financeiro, client);

            // PASSO E: Salvar Produções (Lista)
            if (data.producoes && data.producoes.length > 0) {
                try {
                await this.producaoRepo.createMany(idCooperado, data.producoes, client);
                } catch (error: any) {
                    if (error.code === '23503') {
                        throw new Error("Produto selecionado não achado. Verifique o ID do produto.");
                    }
                    throw error;
                }
            }

            // PASSO F: Salvar Testemunhas (Lista - Opcional)
            if (data.testemunhas && data.testemunhas.length > 0) {
                await this.testemunhaRepo.createMany(idCooperado, data.testemunhas, client);
            }

            return {
                message: "Cooperado cadastrado com sucesso!",
                id_usuario: idUsuario,
                id_cooperado: idCooperado
            };
        });
    }
}