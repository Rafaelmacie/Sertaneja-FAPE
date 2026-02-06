// Aqui centralizamos os cargos. Se criar um novo, adiciona aqui.
export type CargoDiretor = 'ADMINISTRATIVO' | 'FINANCEIRO' | 'EXECUTIVO';

export interface IDiretor {
    id_diretor: number;
    id_usuario: number;
    cpf: string;
    cargo: CargoDiretor;
}