// Interface do payload de entrada (DTO - Data Transfer Object)
export interface ICreateAdministrativoDTO {
    nome: string;
    email: string;
    senhaHash: string;
    telefone: string;
    cpf: string;
}

// Interface do objeto de retorno (Entidade completa)
export interface IAdministrativoUser {
    id_usuario: number;
    nome: string;
    email: string;
    cpf: string;
    cargo: string;
}