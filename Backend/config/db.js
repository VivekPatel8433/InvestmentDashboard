import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  pool: {
    max: 20,   // max active connections
    min: 5,    // minimum connections kept alive
    idleTimeoutMillis: 30000 // close idle connections after 30 sec
  },
  options: {
    encrypt: true,                         // Use encryption
    trustServerCertificate: true           // Necessary for self-signed certificates or local development
  },
};


// Create and export a connection pool to be used across the app
export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed - ', err));  