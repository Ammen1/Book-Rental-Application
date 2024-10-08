import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routers/authRoutes.js'; 
import userRoutes from './src/routers/userRoutes.js';
import categoryRoutes from './src/routers/categoryRoutes.js';
import bookRoutes from './src/routers/bookRoutes.js';
import rentalRoutes from './src/routers/rentalRoutes.js';
import { errorMiddleware } from "./src/middlewares/error.js";
import { authenticate } from './src/middlewares/authenticate.js';

const app = express();
config({ path: './config/config.env' });

const corsOptions = {
    origin: 'https://book-rental-application.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};


// Apply CORS middleware with options
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);

// Apply the isAuthenticated middleware selectively to protected routes
app.use('/api/v1/users', authenticate, userRoutes);
app.use('/api/v1/categories', authenticate, categoryRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/rentals', authenticate, rentalRoutes);

app.use(errorMiddleware);

export default app;
