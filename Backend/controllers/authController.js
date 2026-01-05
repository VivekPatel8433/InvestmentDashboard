import { registerService, loginService, refreshService } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registerService(email, password);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginService(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.json({ user: { id: user.id, email: user.email }, accessToken });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const refreshController = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await refreshService(token);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};



// import { registerUser, loginUser } from "../services/authService.js";

// export const registerController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     await registerUser(email, password);

//     res.status(201).json({ message: "User created" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const result = await loginUser(email, password);

//     res.cookie("refreshToken", result.refreshToken, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     res.json({
//       user: result.user,
//       accessToken: result.accessToken
//     });

//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };



// // import bcrypt from "bcrypt";
// // import { addUser } from "../models/userModel.js"
// // import { findUser } from "../models/userModel.js";
// // import jwt from "jsonwebtoken"

// // // Register User
// // export const registerUserController = async (req, res) => {
// //     try {
// //         // Request body 
// //         const { email, password } = req.body;

// //         // Validate
// //         if (!email || !password) {
// //          return res.status(400).json({ message: 'All fields are required' });
// //         }
// //          // Hash Password
// //          const hashedPassword = await bcrypt.hash(password, 10);

// //         // Add User
// //          await addUser(email, hashedPassword);

// //          // Response
// //           res.status(201).json({ message: 'User created successfully' });
// //     } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Failed to register user' });
// // } 
// // }

// // // Login User
// // export const loginUserController = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // 1. Find user by email
// //     const result = await findUser(email);  // findUser should search by email ONLY
// //     const user = result.recordset[0];

// //     // If user not found
// //     if (!user) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     // 2. Compare password
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }
// //     const token = jwt.sign(
// //       {userId: user.id, email: user.email}, 
// //       process.env.JWT_SECRET, 
// //       {expiresIn: "7d"}
// //     )

// //     res.cookie("refreshToken", token, {
// //       httpOnly: true,
// //       secure: false, // Set true when deployed to work with https, set false for development to be displayed on http
// //       sameSite: "lax", // strict
// //       maxAge: 7 * 24 * 60 * 60 * 1000
// //     })

// //     // 3. Login success
// //     res.status(200).json({
// //       message: "Login Successful",
// //       user:{
// //          id: user.id,
// //         email: user.email,
// //       }
// //     });

// //   } catch (err) {
// //     console.error(err); 
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };
