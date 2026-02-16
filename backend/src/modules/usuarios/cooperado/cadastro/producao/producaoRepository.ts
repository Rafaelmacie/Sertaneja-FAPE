import { PoolClient } from "pg";
import { IProducaoInput } from "../../cooperadoModel";

export class ProducaoRepository {
    async createMany(idCooperado: number, listaProducoes: IProducaoInput[], client: PoolClient): Promise<void> {
        const sql = `
            INSERT INTO producao (
                id_cooperado,
                id_produto,
                unidade_medida,
                qtd_producao,
                valor_insumo,
                hectares,
                nome_propriedade,
                cidade,
                uf
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

        for (const item of listaProducoes) {
            await client.query(sql, [
                idCooperado,
                item.idProduto,
                item.unidadeMedida,
                item.quantidade,
                item.valorInsumo,
                item.hectares,
                item.nomePropriedade,
                item.cidade,
                item.uf
            ]);
        }
    }
}