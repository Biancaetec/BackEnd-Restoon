import db from '../../db/connection.js';

// Buscar todos os restaurantes
export async function findAll() {
  try {
    const query = "SELECT * FROM restaurante;";
    return db.prepare(query).all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar restaurante: " + error.message);
  }
}

// Criar novo restaurante
export async function create(data) {
  try {
    const query = `
      INSERT INTO restaurante (id_usuario, nome, email, senha, status_licenciamento)
      VALUES (?, ?, ?, ?, ?);
    `;

    const stmt = db.prepare(query);

    const result = stmt.run(
      data.id_usuario,
      data.nome,
      data.email,
      data.senha,
      data.status_licenciamento
    );

    const novoRestaurante = db
      .prepare("SELECT * FROM restaurante WHERE id_restaurante = ?")
      .get(result.lastInsertRowid);

    return novoRestaurante;

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar restaurante: " + error.message);
  }
}

// Atualizar restaurante
export async function update(id_restaurante, data) {
  try {
    const query = `
      UPDATE restaurante
      SET nome = ?, email = ?, senha = ?, criado_em = ?, status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;

    return db.run(
      query,
      data.nome,
      data.email,
      data.senha,
      data.criado_em,
      data.status_licenciamento,
      id_restaurante
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar restaurante: " + error.message);
  }
}

// Deletar restaurante
export async function remove(id_restaurante) {
  try {
    const query = `DELETE FROM restaurante WHERE id_restaurante = ?;`;
    return db.run(query, id_restaurante);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar restaurante: " + error.message);
  }
}

// Atualizar status de licenciamento
export async function updateStatus(id_restaurante, status) {
  try {
    const query = `
      UPDATE restaurante
      SET status_licenciamento = ?
      WHERE id_restaurante = ?;
    `;
    return db.run(query, status, id_restaurante);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar status de licenciamento: " + error.message);
  }
}

// Buscar restaurante por email e senha (login)
export async function findByEmailAndSenha(email, senha) {
  try {
    const sqlQuery = `
      SELECT id_restaurante, id_usuario, nome, email, criado_em, status_licenciamento
      FROM restaurante
      WHERE email = ? AND senha = ?;
    `;

    return db.prepare(sqlQuery).get(email, senha);
    
  } catch (error) {
    console.error("Erro ao buscar restaurante por email e senha:", error);
    throw new Error("Erro ao buscar restaurante");
  }
}

// Buscar restaurante por ID
export async function findById(id_restaurante) {
  try {
    const query = `
      SELECT id_restaurante, id_usuario, nome, email, criado_em, status_licenciamento
      FROM restaurante
      WHERE id_restaurante = ?;
    `;
    return db.prepare(query).get(id_restaurante);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar restaurante por ID: " + error.message);
  }
}
