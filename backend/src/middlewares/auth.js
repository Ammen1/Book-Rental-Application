import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { catchAsyncErrors } from './catchAsyncError.js';
import ErrorHandler from './error.js';

const prisma = new PrismaClient();

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!req.user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});
