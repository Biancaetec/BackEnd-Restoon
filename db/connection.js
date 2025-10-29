// import sqlite3 from 'sqlite3'; import { open } from 'sqlite'; import { dbPath } from '../src/utils/dbpath.js'; export const connectDB = async () => { try { const db = await open({ filename: dbPath, driver: sqlite3.Database, }); console.log("Banco de dados conectado com sucesso!"); return db; } catch (error) { console.error("Erro ao conectar ao banco de dados:", error); throw error; } };
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import { dbPath } from '../src/utils/dbpath.js';

// export const connectDB = async () => {
//   try { 
//     const db = await open({
//       filename: dbPath,
//       driver: sqlite3.Database,
//     });

//     console.log("Banco de dados conectado com sucesso!");
//     return db;
//   } catch (error) {
//     console.error("Erro ao conectar ao banco de dados:", error);
//     throw error;
//   }
// };

import {DatabaseSync} from "node:sqlite";

import {dbPath} from "../src/utils/dbpath.js"

let db = null;

try {
    db = new DatabaseSync(dbPath, {
        verbose: console.log,
        mode: DatabaseSync.OPEN_READWRITE | DatabaseSync.OPEN_CREATE,
    });
    console.log("Banco de dados conectado com sucesso!");    
} catch (error) {
    console.log(error);
}

export default db;