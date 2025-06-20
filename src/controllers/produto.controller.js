import { z } from "zod";
import { findAll, create, update, remove } from "../models/produtoModel.js";

// Schema de validação
const produtoSchema = z.object({
  id_produto: z.number().int().positive().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  preco: z.number().nonnegative("Preço não pode ser negativo"),
  tipo_preparo: z.string().min(1, "Tipo de preparo é obrigatório"),
  id_categoria: z.number().int().positive("Categoria inválida"),
  id_restaurante: z.number().int().positive("Restaurante inválido"),
  ativo: z.boolean(),
  imagem: z.string().url("URL inválida").optional(),
});

export const getProdutos = async (req, res) => {
  try {
    const produtos = await findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar produtos" });
  }
};

export const createProduto = async (req, res) => {
  try {
    const produtoData = produtoSchema.parse(req.body);
    await create(produtoData);
    res.status(201).json({ message: "Produto criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar produto" });
  }
};

export const updateProduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    const produtoData = produtoSchema.partial().parse(req.body);
    await update(id_produto, produtoData);
    res.status(200).json({ message: `Produto ${id_produto} atualizado com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar produto" });
  }
};

export const deleteProduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    await remove(id_produto);
    res.status(200).json({ message: `Produto ${id_produto} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar produto" });
  }
};
