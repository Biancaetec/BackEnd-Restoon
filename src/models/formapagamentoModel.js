// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';
// Buscar todas as formas de pagamento
export async function findAll() {
  try {
    const db = await connectDB();
    const query = "SELECT id_pagamento, descricao, id_restaurante, ativo FROM forma_pagamento;";
    const formas = await db.all(query);
    return formas;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar formas de pagamento: " + error.message);
  }
}

// Criar nova forma de pagamento
export async function create(data) {
  try {
    const db = await connectDB();
    const query = "INSERT INTO forma_pagamento (descricao, id_restaurante, ativo) VALUES (?, ?, ?);";
    const result = await db.run(query, data.descricao, data.id_restaurante, data.ativo);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar forma de pagamento: " + error.message);
  }
}

// Atualizar forma de pagamento
export async function update(id_pagamento, data) {
  try {
    const db = await connectDB();

    // Constrói o SET dinâmico
    const fields = [];
    const values = [];

    if (data.descricao !== undefined) {
      fields.push("descricao = ?");
      values.push(data.descricao);
    }
    if (data.id_restaurante !== undefined) {
      fields.push("id_restaurante = ?");
      values.push(data.id_restaurante);
    }
    if (data.ativo !== undefined) {
      fields.push("ativo = ?");
      values.push(data.ativo);
    }

    if (fields.length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    const query = `UPDATE forma_pagamento SET ${fields.join(", ")} WHERE id_pagamento = ?;`;
    values.push(id_pagamento);

    const result = await db.run(query, ...values);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar forma de pagamento: " + error.message);
  }
}


// Deletar forma de pagamento
export async function remove(id_pagamento) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM forma_pagamento WHERE id_pagamento = ?;";
    const result = await db.run(query, id_pagamento);
    if (result.changes === 0) {
      throw new Error("Forma de pagamento não encontrada");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar forma de pagamento: " + error.message);
  }
}
