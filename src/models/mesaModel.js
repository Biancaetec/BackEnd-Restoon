// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';

// Buscar todas as mesas
export async function findAll() {
  try {
    // const db = await connectDB();
    const sqlQuery = "SELECT id_mesa, numero, descricao, id_restaurante, ocupada FROM mesa WHERE id_restaurante = ?;";
    //const mesas = await db.all(query);
    const query = connectDB.prepare(sqlQuery);
    const result = await query.all(1); // Substitua 1 pelo id_usuario desejado
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar mesas: " + error.message);
  }
}

// Criar nova mesa
export async function create(mesaData) {
  try {
    //const db = await connectDB();
    const query = "INSERT INTO mesa (numero, descricao, id_restaurante, ocupada) VALUES (?, ?, ?, ?);";
    const insert = connectDB.prepare(query);
    const result = await insert.run(
      mesaData.numero,
      mesaData.descricao,
      mesaData.id_restaurante,
      mesaData.ocupada
    );
    
    const novaMesaQuery = connectDB.prepare("SELECT * FROM mesa WHERE id_mesa = ?");
    const novaMesa = await novaMesaQuery.get(result.lastInsertRowid);
    
    return novaMesa;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar mesa: " + error.message);
  }
}

// Atualizar mesa existente
export async function update(id_mesa, mesaData) {
  try {
    const query = "UPDATE mesa SET numero = ?, descricao = ?, id_restaurante = ?, ocupada = ? WHERE id_mesa = ?;";
    //const db = await connectDB();
    //const query = `
    //  UPDATE mesa SET
    //    numero = COALESCE(?, numero),
    //    descricao = COALESCE(?, descricao),
    //    id_restaurante = COALESCE(?, id_restaurante),
    //    ocupada = COALESCE(?, ocupada)
    //  WHERE id_mesa = ?;
    //`;
    const update = connectDB.prepare(query);
    const result = await db.run(
      query,
      mesaData.numero,
      mesaData.descricao,
      mesaData.id_restaurante,
      mesaData.ocupada,
      id_mesa
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar mesa: " + error.message);
  }
}

// Remover mesa
export async function remove(id_mesa) {
  try {
    //const db = await connectDB();
    const query = "DELETE FROM mesa WHERE id_mesa = ?;";
    const remove = connectDB.prepare(query);
    const result = await remove.run(query, id_mesa);
    if (result.changes === 0) {
      throw new Error("Mesa não encontrada");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar mesa: " + error.message);
  }
}
