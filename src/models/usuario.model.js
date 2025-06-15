import { connectDB } from '../../db/connection.js';

// Buscar todos os usuários
export async function findAll() {
  try {
    const db = await connectDB();
    const query = `SELECT * FROM usuario;`;
    const usuarios = await db.all(query);
    return usuarios;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar usuários: " + error.message);
  }
}

// Criar novo usuário
export async function create(userData) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO usuario (nome, email, senha, funcao, id_restaurante, ativo) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.run(
      query,
      userData.nome,
      userData.email,
      userData.senha,
      userData.funcao,
      userData.id_restaurante,
      userData.ativo
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar usuário: " + error.message);
  }
}

// Deletar usuário por ID
export async function remove(id) {
  try {
    const db = await connectDB();
    const result = await db.run("DELETE FROM usuario WHERE id_usuario = ?", [id]);

    if (result.changes === 0) {
      throw new Error("Usuário não encontrado");
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
}

// Atualizar todos os dados do usuário
export async function update(id, usuarioData) {
  try {
    const db = await connectDB();
    const query = `
      UPDATE usuario 
      SET nome = ?, email = ?, senha = ?, funcao = ?, id_restaurante = ?, ativo = ?
      WHERE id_usuario = ?;
    `;
    const result = await db.run(query, [
      usuarioData.nome,
      usuarioData.email,
      usuarioData.senha,
      usuarioData.funcao,
      usuarioData.id_restaurante,
      usuarioData.ativo,
      id
    ]);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
}

// Atualizar apenas a função do usuário
export async function updateFuncao(id, funcao) {
  try {
    const db = await connectDB();
    const query = `UPDATE usuario SET funcao = ? WHERE id_usuario = ?`;
    const result = await db.run(query, [funcao, id]);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar função do usuário: " + error.message);
  }
}
