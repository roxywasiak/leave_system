import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import leaveRoutes from './routes/leaveRoutes';
import pool from "./config/db";


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leave', leaveRoutes);

export default app;
