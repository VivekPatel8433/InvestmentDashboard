import bcrypt from "bcrypt";
import { addUser } from "../models/userModel.js"
import { findUser } from "../models/userModel.js";

// Register User
export const registerUserController = async (req, res) => {
    try {
        // Request body 
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
         return res.status(400).json({ message: 'All fields are required' });
        }

         // Hash Password
         const hashedPassword = await bcrypt.hash(password, 10);

        // Add User
         await addUser(email, hashedPassword);

         // Response
          res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
} 
}

// Login User
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const result = await findUser(email);  // findUser should search by email ONLY
    const user = result.recordset[0];
    const rowsAffected = result.rowsAffected[0];

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Login success
    res.status(200).json({
      message: "Login Successful",
      user,
      rowsAffected
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
