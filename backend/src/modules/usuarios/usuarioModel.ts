export interface IUsuario {
    id_usuario: number;
    nome: string;
    email: string;
    senha?: string; // Opcional no retorno para não vazar a senha
    telefone: string;
}

// O DTO (Data Transfer Object) para criação
export interface ICreateUsuarioDTO {
    nome: string;
    email: string;
    senhaHash: string;
    telefone: string;
}