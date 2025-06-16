import { connectDB } from '../../db/connection.js';

// Buscar todos os restaurantes
export async function findAll() {
  try {
    const db = await connectDB();
    const query = "SELECT * FROM restaurante;";
    const statement = db.prepare(query);
    const result = statement.all();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar restaurantes: " + error.message);
  }
}

// Criar novo restaurante e retornar o restaurante criado
export async function create(data) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO restaurante (nome, email, senha, criado_em, status_licenciamento)
      VALUES (?, ?, ?, ?, ?);
    `;
    const statement = db.prepare(query);
    const result = statement.run(
      data.nome,
      data.email,
      data.senha,
      data.criado_em,
      data.status_licenciamento
    );

    // Pega o restaurante recém-criado pelo ID gerado
    const novoRestaurante = db.prepare("SELECT * FROM restaurante WHERE id_restaurante = ?").get(result.lastInsertRowid);
    return novoRestaurante;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar restaurante: " + error.message);
  }
}

// Atualizar dados completos do restaurante
export async function update(id, data) {
  try {
    const db = await connectDB();
    const query = `
      UPDATE restaurante
      SET nome = ?, email = ?, senha = ?, criado_em = ?, status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;
    const statement = db.prepare(query);
    const result = statement.run(
      data.nome,
      data.email,
      data.senha,
      data.criado_em,
      data.status_licenciamento,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar restaurante: " + error.message);
  }
}

// Deletar restaurante pelo ID
export async function remove(id) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM restaurante WHERE id_restaurante = ?;";
    const statement = db.prepare(query);
    const result = statement.run(id);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover restaurante: " + error.message);
  }
}

// Atualizar somente o status de licenciamento do restaurante
export async function updateStatusLicenciamento(id, status) {
  try {
    const db = await connectDB();
    const query = `
      UPDATE restaurante
      SET status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;
    const statement = db.prepare(query);
    const result = statement.run(status, id);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar status de licenciamento: " + error.message);
  }
}
