import { poolPromise } from '../config/db.js';
import sql from "mssql";

// Add user
export const addUser = async (email, hashedPassword) => {
    const pool = await poolPromise;   

    await pool.request()
        .input("email", sql.VarChar(100), email)
        .input("hashedPassword", sql.VarChar(100), hashedPassword)
        .query('INSERT INTO Users (email, password) VALUES (@email, @hashedPassword)');
};