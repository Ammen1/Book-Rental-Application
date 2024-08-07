import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';
import bcrypt from 'bcrypt';
import {sendMail} from '../services/common.js';
import crypto from 'crypto';
import { passwordResetTemplate } from '../services/emailTemplates.js';

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

  // Exclude password from the user object
  const { password: _, ...userWithoutPassword } = user;

  // Send token
  sendToken(userWithoutPassword, 200, res, "User Logged In!");
});


export const resetPasswordRequest = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;


  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Generate a reset token
  const token = crypto.randomBytes(48).toString('hex');

  // Update user with reset token
  await prisma.user.update({
    where: { email },
    data: { resetPasswordToken: token }
  });

  // Create the reset password link
  const resetPageLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
  const subject = 'Password Reset Request for Book Rental Application';
  const html = passwordResetTemplate(resetPageLink); // Ensure this template function is properly defined

  // Send email with reset link
  const response = await sendMail({ to: email, subject, html });
  res.json({ success: true, message: 'Password reset email sent', response });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email, password, token } = req.body;

  // Find the user with the provided email and token
  const user = await prisma.user.findUnique({
    where: { email, resetPasswordToken: token }
  });

  if (!user) {
    return next(new ErrorHandler('Invalid token or email', 400));
  }

  // Hash the new password
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
    if (err) {
      return next(new ErrorHandler('Error hashing password', 500));
    }

    // Update user with the new password and clear the reset token
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword.toString('hex'),
        salt,
        resetPasswordToken: null
      }
    });

    // Send confirmation email
    const subject = 'Password successfully reset';
    const html = `<p>You have successfully reset your password.</p>`;
    await sendMail({ to: email, subject, html });

    res.json({ success: true, message: 'Password successfully reset' });
  });
});