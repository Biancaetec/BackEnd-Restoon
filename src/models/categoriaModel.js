// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';

// Buscar todas as categorias
export async function findAll() {
  try {
    const db = await connectDB();
    const query = "SELECT id_categoria, nome, id_restaurante FROM categoria;";
    const categorias = await db.all(query);
    return categorias;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar categorias: " + error.message);
  }
}

// Criar nova categoria
export async function create(categoriaData) {
  try {
    // const db = await connectDB();
    const query = "INSERT INTO categoria (nome, id_restaurante) VALUES (?, ?);";
    const result = await db.run(query, categoriaData.nome, categoriaData.id_restaurante);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar categoria: " + error.message);
  }
}

// Atualizar categoria existente
export async function update(id_categoria, categoriaData) {
  try {
    const db = await connectDB();
    const query = "UPDATE categoria SET nome = ?, id_restaurante = ? WHERE id_categoria = ?;";
    const result = await db.run(query, categoriaData.nome, categoriaData.id_restaurante, id_categoria);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar categoria: " + error.message);
  }
}

// Remover categoria
export async function remove(id_categoria) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM categoria WHERE id_categoria = ?;";
    const result = await db.run(query, id_categoria);
    if (result.changes === 0) {
      throw new Error("Categoria não encontrada");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar categoria: " + error.message);
  }
}
