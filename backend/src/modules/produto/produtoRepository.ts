import db from "../../shared/config/db";
import { ICreateProdutoDTO } from "./produtoModel";

export class ProdutoRepository {
    async save(data: ICreateProdutoDTO) {
        const sql = `
            INSERT INTO produto (id_cooperado_origem, codigo, nome_prod, marca_prod, unidade_medida, qtd_estoque, ncm, preco)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_produto
        `;
        const values = [
            data.id_cooperado_origem, data.codigo, data.nome_prod, 
            data.marca_prod, data.unidade_medida, data.qtd_estoque, 
            data.ncm, data.preco
        ];
        const result = await db.query(sql, values);
        return result.rows[0];
    }

    async findByCodigo(codigo: number) {
        const result = await db.query('SELECT id_produto FROM produto WHERE codigo = $1', [codigo]);
        return result.rows[0];
    }
}