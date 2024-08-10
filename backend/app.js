import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routers/authRoutes.js'; 
import userRoutes from './src/routers/userRoutes.js';
import categoryRoutes from './src/routers/categoryRoutes.js';
import bookRoutes from './src/routers/bookRoutes.js';
import rentalRoutes from './src/routers/rentalRoutes.js';
import { isAuthenticated } from './src/middlewares/auth.js';
import { errorMiddleware } from "./src/middlewares/error.js";


const app = express();
config({ path: './config/config.env' });

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/auth', authRoutes);

// Apply the isAuthenticated middleware selectively to protected routes
app.use('/api/v1/users', isAuthenticated, userRoutes);
app.use('/api/v1/categories', isAuthenticated, categoryRoutes);
app.use('/api/v1/book', isAuthenticated, bookRoutes);
app.use('/api/v1/rentals', isAuthenticated, rentalRoutes);


app.use(errorMiddleware);

export default app;
