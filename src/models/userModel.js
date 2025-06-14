import { connectDB } from '../../db/connection.js';


export async function findAll() {
  try {
    const database = await connectDB();
    const query = "SELECT id_usuario, nome, email, senha FROM usuario;";
    const usuarios = await database.all(query); // 'all' já executa direto a query
    return usuarios;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users: " + error.message);
  }
}

export async function create(userData) {
  try {
    const database = await connectDB();
    const query = "INSERT INTO usuario (nome, email) VALUES (?, ?);";
    const result = await database.run(query, userData.nome, userData.email);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user: " + error.message);
  }
}
