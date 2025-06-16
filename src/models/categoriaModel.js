// categoriaModel.js
import { connectDB } from '../../db/connection.js';

// Buscar todas as categorias
export async function findAll() {
  try {
    const database = await connectDB();
    const query = "SELECT id_categoria, nome, id_restaurante FROM categorias;";
    const statement = database.prepare(query);
    const categorias = statement.all();
    return categorias;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar categorias: " + error.message);
  }
}

// Criar nova categoria
export async function create(categoriaData) {
  try {
    const database = await connectDB();
    const query = "INSERT INTO categorias (nome, id_restaurante) VALUES (?, ?);";
    const statement = database.prepare(query);
    const result = statement.run(categoriaData.nome, categoriaData.id_restaurante);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar categoria: " + error.message);
  }
}

// Atualizar categoria existente
export async function update(id_categoria, categoriaData) {
  try {
    const database = await connectDB();
    const query = "UPDATE categorias SET nome = ?, id_restaurante = ? WHERE id_categoria = ?;";
    const statement = database.prepare(query);
    const result = statement.run(categoriaData.nome, categoriaData.id_restaurante, id_categoria);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar categoria: " + error.message);
  }
}

// Remover categoria
export async function remove(id_categoria) {
  try {
    const database = await connectDB();
    const query = "DELETE FROM categorias WHERE id_categoria = ?;";
    const statement = database.prepare(query);
    const result = statement.run(id_categoria);
    if (result.changes === 0) {
      throw new Error("Categoria não encontrada");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar categoria: " + error.message);
  }
}
