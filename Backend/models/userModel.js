import { poolPromise } from '../config/db.js';
import sql from "mssql";

// Add user
export const addUser = async (email, hashedPassword) => {
    try {
    const pool = await poolPromise;   

    await pool.request()
        .input("email", sql.VarChar(100), email)
        .input("hashedPassword", sql.VarChar(100), hashedPassword)
        .query('INSERT INTO Users (email, password) VALUES (@email, @hashedPassword)');
    } catch (err) {
    console.error("SQL AddUser error:", err);
    throw err; 
    }
};

// Find User
export const findUser = async (email) => {
    try {    
    const pool = await poolPromise;

    const result = await pool.request()
        .input("email", sql.VarChar(100), email)
        .query(`SELECT * FROM Users WHERE email = @email`)

    return result;
    } catch (err) {
    console.error("SQL findUser error:", err);
    throw err; 

    }
}