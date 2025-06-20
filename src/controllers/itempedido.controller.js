import { z } from "zod";
import { create, findAll, update, remove } from "../models/itempedidoModel.js";

const itemPedidoSchema = z.object({
  id_item: z.number().int().positive().optional(),
  id_pedido: z.number().int().positive(),
  id_produto: z.number().int().positive(),
  quantidade: z.number().int().positive(),
  preco_unitario: z.number().positive(),
  tipo_porção: z.enum(["inteira", "meia"]),
  status: z.enum(["aguardando", "em_preparo", "pronto"]),
});

// Criar item de pedido no banco
export const createItemPedido = async (req, res) => {
  try {
    const itemData = itemPedidoSchema.parse(req.body);
    const result = await create(itemData); // usar o model real
    res.status(201).json({ message: "Item de pedido criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar item de pedido" });
  }
};

// Listar itens do pedido
export const getItensPedido = async (req, res) => {
  try {
    const itens = await findAll();  // chama o model para pegar os dados do DB
    res.status(200).json(itens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar itens de pedido" });
  }
};

// Atualizar item de pedido
export const updateItemPedido = async (req, res) => {
  try {
    const { id_item } = req.params;
    const itemData = itemPedidoSchema.partial().parse(req.body);

    const result = await update(id_item, itemData); // usar model update real
    res.status(200).json({ message: `Item de pedido ${id_item} atualizado com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar item de pedido" });
  }
};

// Deletar item de pedido
export const deleteItemPedido = async (req, res) => {
  try {
    const { id_item } = req.params;

    await remove(id_item); // usar model remove real
    res.status(200).json({ message: `Item de pedido ${id_item} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar item de pedido" });
  }
};
