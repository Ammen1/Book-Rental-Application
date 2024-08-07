import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const register = catchAsyncErrors(async (req, res, next) => {
  const { email, phone, password, role, location, name } = req.body;
  if (!email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  
  const isEmail = await prisma.user.findUnique({ where: { email } });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 400));
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email,
    phone,
    password: hashedPassword,
    role,
    location,
    name,
  };

  const user = await prisma.user.create({ data: userData });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  // Check role
  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and ${role} not found!`, 404));
  }

  // Send token
  sendToken(user, 200, res, "User Logged In!");
});
