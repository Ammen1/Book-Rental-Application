import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routers/authRoutes.js'; 
import userRoutes from './src/routers/userRoutes.js';
import categoryRoutes from './src/routers/categoryRoutes.js';
import bookRoutes from './src/routers/bookRoutes.js';

const app = express();
config({ path: './config/config.env' });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/book', bookRoutes);




export default app;