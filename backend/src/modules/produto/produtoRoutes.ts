// src/modules/produto/produtoRoutes.ts
import { Router } from "express";
import { ProdutoController } from "./produtoController";
import { validateProdutoEntry } from "./produtoMiddleware";

const produtoRoutes = Router();
const controller = new ProdutoController();

// A rota final será /api/produtos/cadastrar
produtoRoutes.post("/cadastrar", validateProdutoEntry, (req, res) => controller.create(req, res));

export { produtoRoutes };