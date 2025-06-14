import { connectDB } from '../../db/connection.js';


export async function findAll() {
  try {
    const database = await connectDB();
    const query = "SELECT id, username, email, senha FROM users;";
    const statement =  database.prepare(query);
    const users = statement.all();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching users: " + error.message);
  }
}

export async function create(userData) {
  try {
    const database = await connectDB();
    const query = "INSERT INTO users (nome, email) VALUES (?, ?);";
    const statement = database.prepare(query);
    const result = statement.run(userData.username, userData.email);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user: " + error.message);
  }
}
