import { ProdutoRepository } from "./produtoRepository";
import { ICreateProdutoDTO } from "./produtoModel";
import { AppError } from "../../shared/errors/appError";
import { toTitleCase } from "../../shared/utils/formatters";

export class ProdutoService {
    private repository = new ProdutoRepository();

    async execute(data: ICreateProdutoDTO) {
        // Validação de negócio: código único
        const exists = await this.repository.findByCodigo(data.codigo);
        if (exists) throw new AppError("Já existe um produto com este código.");

        // Formatação
        data.nome_prod = toTitleCase(data.nome_prod);
        if (data.marca_prod) data.marca_prod = toTitleCase(data.marca_prod);

        return await this.repository.save(data);
    }
}