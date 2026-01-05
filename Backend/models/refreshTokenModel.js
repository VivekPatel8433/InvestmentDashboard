import { poolPromise } from "../config/db.js";

export const saveRefreshToken = async ({ userId, tokenHash, expiresAt }) => {
  const pool = await poolPromise;
  await pool.request()
    .input("userId", userId)
    .input("tokenHash", tokenHash)
    .input("expiresAt", expiresAt)
    .query(`
      INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
      VALUES (@userId, @tokenHash, @expiresAt)
    `);
};

export const findRefreshToken = async (tokenHash) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("tokenHash", tokenHash)
    .query(`
      SELECT * FROM refresh_tokens
      WHERE token_hash = @tokenHash AND revoked = 0
    `);

  return result.recordset[0];
};

export const revokeRefreshToken = async (id) => {
   const pool = await poolPromise;
  await pool.request()
    .input("id", id)
    .query(`UPDATE refresh_tokens SET revoked = 1 WHERE id = @id`);
};

export const revokeAllUserTokens = async (userId) => {
  await pool.request()
    .input("userId", userId)
    .query(`UPDATE refresh_tokens SET revoked = 1 WHERE user_id = @userId`);
};
