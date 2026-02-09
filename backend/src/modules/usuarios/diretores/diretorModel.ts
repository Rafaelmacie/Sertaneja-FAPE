import { CargoDiretor } from "../../../shared/constants/cargoDiretor";

export interface IDiretor {
    id_diretor: number;
    id_usuario: number;
    cpf: string;
    cargo: CargoDiretor;
}