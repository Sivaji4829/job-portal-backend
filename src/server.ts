import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import jobRoutes from './routes/jobRoutes';
import authRoutes from './routes/authRoutes';

// Load environment variables (MONGO_URI, PORT, JWT_SECRET)
dotenv.config();

// Initialize MongoDB Cluster Connection
connectDB();

const app: Application = express();

/**
 * Middleware Configuration
 */
app.use(cors());
app.use(express.json());

/**
 * API Route Definitions
 */

// Job Management Partition
app.use('/api/jobs', jobRoutes);

// Identity & Access Partition (Strict Login/Register Logic)
// This mounts the routes handled by the authController which uses the User Model in the Canvas
app.use('/api/auth', authRoutes);

/**
 * Node Server Activation
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Secure Cluster Server running on port ${PORT}`);
  console.log(`Administrative Gateway active at /api/auth`);
});