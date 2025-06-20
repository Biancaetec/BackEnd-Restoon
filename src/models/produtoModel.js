import { connectDB } from '../../db/connection.js';

// Buscar todos os produtos
export async function findAll() {
  try {
    const db = await connectDB();
    const query = `
      SELECT id_produto, nome, descricao, preco, tipo_preparo, id_categoria, id_restaurante, ativo, imagem 
      FROM produto;
    `;
    const produtos = await db.all(query);
    return produtos;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar produtos: " + error.message);
  }
}

// Criar novo produto
export async function create(produtoData) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO produto 
        (nome, descricao, preco, tipo_preparo, id_categoria, id_restaurante, ativo, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const result = await db.run(
      query,
      produtoData.nome,
      produtoData.descricao,
      produtoData.preco,
      produtoData.tipo_preparo,
      produtoData.id_categoria,
      produtoData.id_restaurante,
      produtoData.ativo,
      produtoData.imagem ?? null
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar produto: " + error.message);
  }
}

// Atualizar produto existente
export async function update(id_produto, produtoData) {
  try {
    const db = await connectDB();

    // Montar atualização dinâmica para permitir patch parcial
    const fields = [];
    const values = [];

    if (produtoData.nome !== undefined) {
      fields.push("nome = ?");
      values.push(produtoData.nome);
    }
    if (produtoData.descricao !== undefined) {
      fields.push("descricao = ?");
      values.push(produtoData.descricao);
    }
    if (produtoData.preco !== undefined) {
      fields.push("preco = ?");
      values.push(produtoData.preco);
    }
    if (produtoData.tipo_preparo !== undefined) {
      fields.push("tipo_preparo = ?");
      values.push(produtoData.tipo_preparo);
    }
    if (produtoData.id_categoria !== undefined) {
      fields.push("id_categoria = ?");
      values.push(produtoData.id_categoria);
    }
    if (produtoData.id_restaurante !== undefined) {
      fields.push("id_restaurante = ?");
      values.push(produtoData.id_restaurante);
    }
    if (produtoData.ativo !== undefined) {
      fields.push("ativo = ?");
      values.push(produtoData.ativo);
    }
    if (produtoData.imagem !== undefined) {
      fields.push("imagem = ?");
      values.push(produtoData.imagem);
    }

    if (fields.length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    const query = `UPDATE produto SET ${fields.join(", ")} WHERE id_produto = ?;`;
    values.push(id_produto);

    const result = await db.run(query, ...values);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar produto: " + error.message);
  }
}

// Remover produto
export async function remove(id_produto) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM produto WHERE id_produto = ?;";
    const result = await db.run(query, id_produto);
    if (result.changes === 0) {
      throw new Error("Produto não encontrado");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar produto: " + error.message);
  }
}
