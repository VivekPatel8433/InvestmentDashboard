import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js' // Imports authroutes
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 5000;
const app = express(); 

// Middleware
app.use(express.json()); // parse JSON bodies

app.use(cors({
  origin: "http://localhost:5173", // Forfrontend URL
  credentials: true // For Backend
}));
app.use(cookieParser()); // Without this: Cookies might be sent, Backend cannot read them

app.use(express.static('public'));             // Serve static files, like index.html, from the "public" directory

// Routes
app.use('/api/v1/auth', authRoutes);           // Mount authentication routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
