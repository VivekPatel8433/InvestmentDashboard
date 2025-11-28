import bcrypt from "bcrypt";
import { addUser } from "../models/userModel.js"


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