// Exemplo mínimo de usuario.model.js com exportações corretas

import { connectDB } from '../../db/connection.js';

// Buscar todos usuários
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

// Criar usuário
export async function create(userData) {
  try {
    const db = await connectDB();
    const query = `INSERT INTO usuario (nome, email, senha, funcao, id_restaurante, ativo) VALUES (?, ?, ?, ?, ?, ?)`;
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
