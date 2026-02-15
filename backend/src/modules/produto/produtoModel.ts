import { UnidadeMedida } from "../../shared/constants/unidadeMedida"; // Supondo que moveu pra cá

export interface ICreateProdutoDTO {
    id_cooperado_origem?: number;
    codigo: number;
    nome_prod: string;
    marca_prod?: string;
    unidade_medida: UnidadeMedida;
    qtd_estoque: number;
    ncm?: string;
    preco: number;
}