// import { Schema, z } from "zod";
// import { findAll, create, update, remove } from "../models/produtoModel.js";

// // Schema de validação
// const produtoSchema = z.object({
//   id_produto: z.number().int().positive().optional(),
//   nome: z.string().min(1, "Nome é obrigatório"),
//   descricao: z.string().min(1, "Descrição é obrigatória"),
//   preco: z.number().nonnegative("Preço não pode ser negativo"),
//   tipo_preparo: z.string().min(1, "Tipo de preparo é obrigatório"),
//   id_categoria: z.number().int().positive("Categoria inválida"),
//   id_restaurante: z.number().int().positive("Restaurante inválido"),
//   ativo: z.union([z.literal(0), z.literal(1)], {
//     errorMap: () => ({ message: "O campo ativo deve ser 0 (falso) ou 1 (verdadeiro)" })
//   }),
//   imagem: z.string().url("URL inválida").nullable().optional(),
// });

// export const getProdutos = async (req, res) => {
//   try {
//     const produtos = await findAll();
//     res.status(200).json(produtos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erro interno ao listar produtos" });
//   }
// };

// export const createProduto = async (req, res) => {
//   try {
//     const produtoData = produtoSchema.parse(req.body);

//     console.log("Dados do produto recebidos pelo controller:", produtoData);

//     await create(produtoData);
//     res.status(201).json({ message: "Produto criado com sucesso" });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: "Erro de validação",
//         errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
//       });
//     }
//     console.error(error);
//     res.status(500).json({ message: "Erro interno ao criar produto" });
//   }
// };

// export const updateProduto = async (req, res) => {
//   try {
//     const { id_produto } = req.params;
  
//     const produtoData = {
//       id_produto: Number(id_produto),
//       nome: req.body.nome,
//       descricao: req.body.descricao,
//       preco: req.body.preco,
//       tipo_preparo: req.body.tipo_preparo,
//       id_categoria: req.body.id_categoria,
//       id_restaurante: req.body.id_restaurante,
//       imagem: req.body.imagem
//     };

//     await produtoSchema.partial().parseAsync(produtoData);
//     await update(id_produto, produtoData);

//     res.status(200).json({ message: "Produto atualizado com sucesso" });

//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         message: "Erro de validação",
//         errors: error.errors.map(e => ({
//           atributo: e.path[0],
//           mensagem: e.message
//         })),
//       });
//     }
//     res.status(500).json({ message: "Erro interno ao atualizar produto" });
//   }
// };


// export const deleteProduto = async (req, res) => {
//   try {
//     const { id_produto } = req.params;
//     await remove(id_produto);
//     res.status(200).json({ message: `Produto ${id_produto} deletado com sucesso` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erro interno ao deletar produto" });
//   }
// };

import { z } from "zod";
import { findAll, create, update, remove } from "../models/produtoModel.js";

// Schema corrigido
const produtoSchema = z.object({
  id_produto: z.number().int().positive().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  preco: z.number().nonnegative("Preço não pode ser negativo"),
  tipo_preparo: z.string().min(1, "Tipo de preparo é obrigatório"),
  id_categoria: z.number().int().positive("Categoria inválida"),
  id_restaurante: z.number().int().positive("Restaurante inválido"),

  // ACEITA APENAS O NOME DO ARQUIVO, NÃO URL COMPLETA
  imagem: z.string().min(1, "Imagem inválida"),
  
  ativo: z.union([z.literal(0), z.literal(1)], {
    errorMap: () => ({ message: "O campo ativo deve ser 0 ou 1" })
  }),
});

// 🔥 GET PRODUTOS (agora filtra por restaurante)
export const getProdutos = async (req, res) => {
  try {
    const { id_restaurante } = req.params;

    if (!id_restaurante) {
      return res.status(400).json({ message: "id_restaurante é obrigatório" });
    }

    const produtos = await findAll(id_restaurante);
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar produtos" });
  }
};
// 🔥 CREATE PRODUTO
export const createProduto = async (req, res) => {
  try {
    const produtoData = produtoSchema.parse(req.body);

    await create(produtoData);

    res.status(201).json({ message: "Produto criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path[0],
          mensagem: e.message
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar produto" });
  }
};

// 🔥 UPDATE PRODUTO
export const updateProduto = async (req, res) => {
  try {
    const { id_produto } = req.params;

    const produtoData = {
      id_produto: Number(id_produto),
      nome: req.body.nome,
      descricao: req.body.descricao,
      preco: Number(req.body.preco),
      tipo_preparo: req.body.tipo_preparo,
      id_categoria: Number(req.body.id_categoria),
      id_restaurante: Number(req.body.id_restaurante),
      imagem: req.body.imagem,
      ativo: req.body.ativo
    };

    await produtoSchema.partial().parseAsync(produtoData);

    await update(id_produto, produtoData);

    res.status(200).json({ message: "Produto atualizado com sucesso" });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path[0],
          mensagem: e.message
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar produto" });
  }
};

// 🔥 DELETE PRODUTO
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
