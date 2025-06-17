import { connectDB } from '../../db/connection.js';

// Buscar todos os restaurantes
export async function findAll() {
  try {
    const db = await connectDB();
    const query = "SELECT * FROM restaurante;";
    const restaurante = await db.all(query);
    return restaurante;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar restaurante: " + error.message);
  }
}

// Criar novo restaurante
export async function create(data) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO restaurante (id_usuario, nome, email, senha, criado_em, status_licenciamento)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await db.run(
      query,
      data.id_usuario,
      data.nome,
      data.email,
      data.senha,
      data.criado_em,
      data.status_licenciamento
    );

    const novoRestaurante = await db.get("SELECT * FROM restaurante WHERE id_restaurante = ?", result.lastID);
    return novoRestaurante;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar restaurante: " + error.message);
  }
}

// Atualizar restaurante
export async function update(id_restaurante, data) {
  try {
    const db = await connectDB();
    const query = `
      UPDATE restaurante
      SET nome = ?, email = ?, senha = ?, criado_em = ?, status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;
    const result = await db.run(
      query,
      data.nome,
      data.email,
      data.senha,
      data.criado_em,
      data.status_licenciamento,
      id_restaurante
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar restaurante: " + error.message);
  }
}

// Deletar restaurante
export async function remove(id_restaurante) {
  try {
    const db = await connectDB();
    const query = `DELETE FROM restaurante WHERE id_restaurante = ?;`;
    const result = await db.run(query, id_restaurante);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar restaurante: " + error.message);
  }
}

// Atualizar status de licenciamento
export async function updateStatus(id_restaurante, status) {
  try {
    const db = await connectDB();
    const query = `
      UPDATE restaurante
      SET status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;
    const result = await db.run(query, status, id_restaurante);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar status de licenciamento: " + error.message);
  }
}
