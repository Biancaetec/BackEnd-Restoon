// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';

// Buscar todas as mesas
export async function findAll(id_restaurante) {
  try {
    // const db = await connectDB();
    const sqlQuery = "SELECT id_mesa, numero, descricao, id_restaurante, ocupada FROM mesa WHERE id_restaurante = ?;";
    //const mesas = await db.all(query);
    const query = connectDB.prepare(sqlQuery);
    const result = await query.all(id_restaurante); // Substitua 1 pelo id_usuario desejado
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

    //converte boolean para inteiro 

    const ocupadaValue = mesaData.ocupada ? 1 : 0;

    const result = await insert.run(
      mesaData.numero,
      mesaData.descricao,
      mesaData.id_restaurante,
      ocupadaValue
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
// export async function update(id_mesa, mesaData) {
//   try {
//     //const db = await connectDB();
//     const query = `
//      UPDATE mesa SET
//        numero = COALESCE(?, numero),
//        descricao = COALESCE(?, descricao),
//        id_restaurante = COALESCE(?, id_restaurante),
//        ocupada = COALESCE(?, ocupada)
//      WHERE id_mesa = ?;
//     `;
//     const update = connectDB.prepare(query);
//     const result = await update.run(
      
//       mesaData.numero,
//       mesaData.descricao,
//       mesaData.id_restaurante,
//       mesaData.ocupada,
//       id_mesa
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Erro ao atualizar mesa: " + error.message);
//   }
// }
export async function update(id_mesa, mesaData) {
  try {
    const query = `
      UPDATE mesa SET
        numero = COALESCE(?, numero),
        descricao = COALESCE(?, descricao),
        id_restaurante = COALESCE(?, id_restaurante),
        ocupada = COALESCE(?, ocupada)
      WHERE id_mesa = ?;
    `;
    const updateStmt = connectDB.prepare(query);
    const result = await updateStmt.run(
      mesaData.numero ?? null,
      mesaData.descricao ?? null,
      mesaData.id_restaurante ?? null,
      mesaData.ocupada !== undefined ? (mesaData.ocupada ? 1 : 0) : null,
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
    const result = await remove.run(id_mesa);
    if (result.changes === 0) {
      throw new Error("Mesa não encontrada");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar mesa: " + error.message);
  }
}
