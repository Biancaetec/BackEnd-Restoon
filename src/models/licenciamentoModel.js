// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';

// Buscar todos os licenciamentos
export async function findAll() {
  try {
    const db = await connectDB();
    const query = `
      SELECT
        id_licenciamento,
        id_restaurante,
        data_inicio,
        data_fim,
        status,
        valor,
        tipo
      FROM licenciamento;
    `;
    const licenciamentos = await db.all(query);
    return licenciamentos;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar licenciamentos: " + error.message);
  }
}

// Criar novo licenciamento
export async function create(licenciamentoData) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO licenciamento
        (id_restaurante, data_inicio, data_fim, status, valor, tipo)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await db.run(
      query,
      licenciamentoData.id_restaurante,
      licenciamentoData.data_inicio,
      licenciamentoData.data_fim,
      licenciamentoData.status,
      licenciamentoData.valor,
      licenciamentoData.tipo
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar licenciamento: " + error.message);
  }
}

// Atualizar licenciamento existente
export async function update(id_licenciamento, licenciamentoData) {
  try {
    const db = await connectDB();

    // Montar dinamicamente os campos a atualizar
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(licenciamentoData)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    values.push(id_licenciamento);

    const query = `
      UPDATE licenciamento SET ${fields.join(", ")} WHERE id_licenciamento = ?;
    `;

    const result = await db.run(query, ...values);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar licenciamento: " + error.message);
  }
}

// Remover licenciamento
export async function remove(id_licenciamento) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM licenciamento WHERE id_licenciamento = ?;";
    const result = await db.run(query, id_licenciamento);
    if (result.changes === 0) {
      throw new Error("Licenciamento não encontrado");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar licenciamento: " + error.message);
  }
}
