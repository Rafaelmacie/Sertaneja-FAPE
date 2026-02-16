import { PoolClient } from "pg";
import { IEnderecoInput } from "../../cooperadoModel";

export class EnderecoRepository {

    /**
     * Salva o endereço base e depois o específico (Rural ou Urbano).
     * Tudo dentro da mesma transação (client).
     */
    async create(idCooperado: number, data: IEnderecoInput, client: PoolClient): Promise<void> {
        
        // 1. Inserir na tabela base (endereco_cooperado)
        const sqlBase = `
            INSERT INTO endereco_cooperado (
            id_cooperado, 
            tipo_endereco, 
            bairro, 
            cep, 
            cidade, 
            uf)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_endereco_cooperado
        `;
        
        const valuesBase = [
            idCooperado,
            data.tipo,     // 'urbano' ou 'rural'
            data.bairro,
            data.cep.replace(/\D/g, ''), // Limpa o CEP (só números)
            data.cidade,
            data.uf
        ];

        const resultBase = await client.query(sqlBase, valuesBase);
        const idEndereco = resultBase.rows[0].id_endereco_cooperado;

        // 2. Inserir na tabela específica (Herança)
        if (data.tipo === 'urbano') {
            await this.createUrbano(idEndereco, data, client);
        } else {
            await this.createRural(idEndereco, data, client);
        }
    }

    // Método Privado para Urbano
    private async createUrbano(idEndereco: number, data: IEnderecoInput, client: PoolClient) {
        const sql = `
            INSERT INTO endereco_urbano (id_endereco, logradouro, numero, complemento)
            VALUES ($1, $2, $3, $4)
        `;
        // Convertendo numero para int ou null se vier vazio
        const numero = data.numero ? Number(data.numero) : null;
        
        await client.query(sql, [idEndereco, data.logradouro, numero, data.complemento]);
    }

    // Método Privado para Rural
    private async createRural(idEndereco: number, data: IEnderecoInput, client: PoolClient) {
        const sql = `
            INSERT INTO endereco_rural (id_endereco, tipo_local, nome_local)
            VALUES ($1, $2, $3)
        `;
        
        await client.query(sql, [idEndereco, data.tipoLocal, data.nomeLocal]);
    }
}