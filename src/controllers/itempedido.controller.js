//import { z } from "zod";

//const ItemPedidoSchema = z.object({
//    id_item: z.number().int().positive().optional(),
//  id_pedido: z.number().int().positive(),
//  id_produto: z.number().int().positive(),
// quantidade: z.number().int().positive(),
//  preco_unitario: z.number().positive(),
//  tipo_porção: z.enum(["inteira", "meia"]),  
// status: z.enum(["aguardando", "em_preparo", "pronto"]),
//});

//const ItemPedidoController = {
//  async create(req, res) {
//    try {
//      ItemPedidoSchema.parse(req.body);
//      res.status(201).json({ message: "Item de pedido criado com sucesso" });
//    } catch (error) {
//      if (error instanceof z.ZodError) {
//        return res.status(400).json({
//          message: "Erro de validação",
//         errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
//        });
//      }
//      res.status(500).send({ message: error.message });
//    }
//  },

//  async update(req, res) {
//    try {
//      const { id_item } = req.params;
//     ItemPedidoSchema.partial().parse(req.body);
//      res.status(200).json({ message: `Item de pedido ${id_item} atualizado com sucesso` });
//    } catch (error) {
//      res.status(500).send({ message: error.message });
//    }
//  },

//  async get(req, res) {
//    try {
//      const data = [
//        {
//          id_item: 1,
//          id_pedido: 1,
//          id_produto: 5,
//          quantidade: 2,
//          preco_unitario: 25.5,
//          status: "aguardando",
//        },
//        {
//          id_item: 2,
//          id_pedido: 1,
//          id_produto: 3,
//          quantidade: 1,
//          preco_unitario: 40,
//          status: "em_preparo",
//        },
//      ];
//      res.status(200).json({ data, message: "Itens de pedido listados com sucesso" });
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  },
//};

//export default ItemPedidoController;
import { z } from "zod";

// Schema de validação
const itemPedidoSchema = z.object({
  id_item: z.number().int().positive().optional(),
  id_pedido: z.number().int().positive(),
  id_produto: z.number().int().positive(),
  quantidade: z.number().int().positive(),
  preco_unitario: z.number().positive(),
  tipo_porção: z.enum(["inteira", "meia"]),
  status: z.enum(["aguardando", "em_preparo", "pronto"]),
});

// Listar itens do pedido
export const getItensPedido = async (req, res) => {
  try {
    const data = [
      {
        id_item: 1,
        id_pedido: 1,
        id_produto: 5,
        quantidade: 2,
        preco_unitario: 25.5,
        tipo_porção: "inteira",
        status: "aguardando",
      },
      {
        id_item: 2,
        id_pedido: 1,
        id_produto: 3,
        quantidade: 1,
        preco_unitario: 40,
        tipo_porção: "meia",
        status: "em_preparo",
      },
    ];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar itens de pedido" });
  }
};

// Criar novo item de pedido
export const createItemPedido = async (req, res) => {
  try {
    const itemData = itemPedidoSchema.parse(req.body);

    // Simulação de criação (substituir por model real depois)
    // const result = await createItemPedidoNoBanco(itemData);

    res.status(201).json({ message: "Item de pedido criado com sucesso", item: itemData });
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

// Atualizar item de pedido
export const updateItemPedido = async (req, res) => {
  try {
    const { id_item } = req.params;
    const itemData = itemPedidoSchema.partial().parse(req.body);

    // Simulação de atualização (substituir por model real depois)
    // const result = await updateItemPedidoNoBanco(id_item, itemData);

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

// Deletar item de pedido (opcional)
export const deleteItemPedido = async (req, res) => {
  try {
    const { id_item } = req.params;

    // Simulação de exclusão (substituir por model real depois)
    // const result = await deleteItemPedidoDoBanco(id_item);

    // if (result.changes === 0) {
    //   return res.status(404).json({ message: "Item de pedido não encontrado" });
    // }

    res.status(200).json({ message: `Item de pedido ${id_item} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar item de pedido" });
  }
};
