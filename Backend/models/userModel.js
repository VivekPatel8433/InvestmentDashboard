import sql from "mssql";
import { poolPromise } from "../config/db.js";

export const addUser = async ({ email, password }) => {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("email", sql.VarChar, email)
    .input("password", sql.VarChar, password)
    .query(`
      INSERT INTO Users (email, password)
      OUTPUT INSERTED.id, INSERTED.email
      VALUES (@email, @password)
    `);

  return result.recordset[0];
};


export const findUserByEmail = async (email) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("email", sql.VarChar(100), email)
    .query(
      "SELECT * FROM Users WHERE email = @email"
    );
    return result.recordset[0] ?? null; // ?? (Nullish Coalescing Operator)
};



// import { poolPromise } from '../config/db.js';
// import sql from "mssql";

// // Add user
// export const addUser = async (email, hashedPassword) => {
//     try {
//     const pool = await poolPromise;   

//     await pool.request()
//         .input("email", sql.VarChar(100), email)
//         .input("hashedPassword", sql.VarChar(100), hashedPassword)
//         .query('INSERT INTO Users (email, password) VALUES (@email, @hashedPassword)');
//     } catch (err) {
//     console.error("SQL AddUser error:", err);
//     throw err; 
//     }
// };

// // Find User
// export const findUser = async (email) => {
//     try {    
//     const pool = await poolPromise;

//     const result = await pool.request() // or we can do return pool.request instead of await
//         .input("email", sql.VarChar(100), email)
//         .query(`SELECT * FROM Users WHERE email = @email`)
//     return result;
//     } catch (err) {
//     console.error("SQL findUser error:", err);
//     throw err; 
//     }
// }