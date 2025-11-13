import connectDB from '../../db/connection.js';

// Buscar todos os produtos
export async function findAll() {
  try {
    const sqlQuery = `
      SELECT id_produto, nome, descricao, preco, tipo_preparo, id_categoria, id_restaurante, ativo, imagem 
      FROM produto;
    `;
    const query = connectDB.prepare(sqlQuery);
    const result = await query.all();
    return result;
  } catch (error) {
    console.error('[ProdutoModel] Erro ao buscar produtos:', error);
    throw new Error('Erro ao buscar produtos: ' + error.message);
  }
}

// Criar novo produto
export async function create(produtoData) {
  try {
    const query = `
      INSERT INTO produto 
      (nome, descricao, preco, tipo_preparo, id_categoria, id_restaurante, ativo, imagem) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insert = connectDB.prepare(query);

    const result = await insert.run(
      produtoData.nome ?? '',
      produtoData.descricao ?? '',
      Number(produtoData.preco) || 0,
      produtoData.tipo_preparo ?? '',
      produtoData.id_categoria ?? null,
      produtoData.id_restaurante ?? null,
      produtoData.ativo ?? 1,
      produtoData.imagem ?? null
    );

    const novoProdutoQuery = connectDB.prepare('SELECT * FROM produto WHERE id_produto = ?');
    const novoProduto = await novoProdutoQuery.get(result.lastInsertRowid);
    return novoProduto;
  } catch (error) {
    console.error('[ProdutoModel] Erro ao criar produto:', error);
    throw new Error('Erro ao criar produto: ' + error.message);
  }
}

// Atualizar produto existente
export async function update(id_produto, produtoData) {
  console.log('Model Produto:', produtoData);
  try {
    if (!id_produto) {
      throw new Error('ID do produto não fornecido.');
    }

    // const query = `
    //   UPDATE produto 
    //   SET 
    //     nome = ?, 
    //     descricao = ?, 
    //     preco = ?, 
    //     tipo_preparo = ?, 
    //     id_categoria = ?, 
    //     id_restaurante = ?, 
    //     ativo = ?, 
    //     imagem = ?
    //   WHERE id_produto = ?;
    // `;
    const query = `
      UPDATE produto 
      SET 
        nome = ?, 
        descricao = ?, 
        preco = ?, 
        id_categoria = ?, 
        id_restaurante = ? 
      WHERE id_produto = ?;
    `;

    const update = connectDB.prepare(query);

    const result = await update.run(
      produtoData.nome,
      produtoData.descricao,
      Number(produtoData.preco),
      produtoData.id_categoria,
      produtoData.id_restaurante,
      id_produto
    );

    if (result.changes === 0) {
      throw new Error('Produto não encontrado ou dados idênticos.');
    }

    return result;
  } catch (error) {
    console.error('[ProdutoModel] Erro ao atualizar produto:', error);
    throw new Error('Erro ao atualizar produto: ' + error.message);
  }
}

// Remover produto
export async function remove(id_produto) {
  try {
    const query = 'DELETE FROM produto WHERE id_produto = ?;';
    const remove = connectDB.prepare(query);
    const result = await remove.run(id_produto);

    if (result.changes === 0) {
      throw new Error('Produto não encontrado');
    }

    return result;
  } catch (error) {
    console.error('[ProdutoModel] Erro ao deletar produto:', error);
    throw new Error('Erro ao deletar produto: ' + error.message);
  }
}
