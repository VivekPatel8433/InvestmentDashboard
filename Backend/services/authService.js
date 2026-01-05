import bcrypt from "bcrypt";
import { hashToken } from "../utils/crypto.js";
import {
  saveRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens
} from "../models/refreshTokenModel.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../utils/jwt.js";
import { addUser, findUserByEmail } from "../models/userModel.js";

export const registerService = async (email, password) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await addUser({
    email,
    password: hashedPassword
  });

  return user;
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });

  await saveRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 86400000)
  });

  return { user, accessToken, refreshToken };
};

export const refreshService = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);

  const stored = await findRefreshToken(tokenHash);

  if (!stored) {
    await revokeAllUserTokens(decoded.userId);
    throw new Error("Token reuse detected");
  }

  await revokeRefreshToken(stored.id);

  const newRefreshToken = signRefreshToken({ userId: decoded.userId });
  const newAccessToken = signAccessToken({ userId: decoded.userId });

  await saveRefreshToken({
    userId: decoded.userId,
    tokenHash: hashToken(newRefreshToken),
    expiresAt: new Date(Date.now() + 7 * 86400000)
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};


// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { addUser, findUserByEmail } from "../models /userModel.js";

// export const registerUser = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await addUser(email, hashedPassword);
// };

// export const loginUser = async (email, password) => {
//   const result = await findUserByEmail(email);
//   const user = result.recordset[0];

//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   const accessToken = jwt.sign(
//     { userId: user.id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   );

//   const refreshToken = jwt.sign(
//     { userId: user.id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   return {
//     user: {
//       id: user.id,
//       email: user.email
//     },
//     accessToken,
//     refreshToken
//   };
// };
