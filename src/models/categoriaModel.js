import connectDB from '../../db/connection.js';

// Buscar todas as categorias
// export async function findAll() {
//   try {
//     const sqlQuery = "SELECT id_categoria, nome, id_restaurante FROM categoria;";
//     const query = connectDB.prepare(sqlQuery);
//     const result = await query.all();
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Erro ao buscar categorias: " + error.message);
//   }
// }
export async function findAll(id_restaurante) {
  try {
    const sqlQuery = `
      SELECT id_categoria, nome, id_restaurante
      FROM categoria
      WHERE id_restaurante = ?;
    `;
    const query = connectDB.prepare(sqlQuery);
    return await query.all(id_restaurante);
  } catch (error) {
    console.error('[CategoriaModel] Erro ao buscar categorias:', error);
    throw new Error('Erro ao buscar categorias: ' + error.message);
  }
}

// Criar nova categoria
export async function create(categoriaData) {
  try {
    const query = "INSERT INTO categoria (nome, id_restaurante) VALUES (?, ?);";
    const insert = connectDB.prepare(query);
    const result = await insert.run(categoriaData.nome, categoriaData.id_restaurante);

    // Retorna o registro recém-criado
    const novaCategoriaQuery = connectDB.prepare("SELECT * FROM categoria WHERE id_categoria = ?");
    const novaCategoria = await novaCategoriaQuery.get(result.lastInsertRowid);

    return novaCategoria;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar categoria: " + error.message);
  }
}

// Atualizar categoria existente
export async function update(id_categoria, categoriaData) {
  try {
    const query = "UPDATE categoria SET nome = ?, id_restaurante = ? WHERE id_categoria = ?;";
    const update = connectDB.prepare(query);
    const result = await update.run(categoriaData.nome, categoriaData.id_restaurante, id_categoria);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar categoria: " + error.message);
  }
}

// Remover categoria
export async function remove(id_categoria) {
  try {
    const query = "DELETE FROM categoria WHERE id_categoria = ?;";
    const remove = connectDB.prepare(query);
    const result = await remove.run(id_categoria);

    if (result.changes === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar categoria: " + error.message);
  }
}
