import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import jobRoutes from './routes/jobRoutes';
import { loginUser } from './controllers/authController'; // Import auth controller

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/jobs', jobRoutes);

// Auth Route (Strict Rule Implementation)
app.post('/api/auth/login', loginUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));