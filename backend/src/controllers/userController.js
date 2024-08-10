import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

const prisma = new PrismaClient();

// Get all users
// Get all users
export const getUsers = catchAsyncErrors(async (req, res, next) => {
  // if (req.user.role !== 'ADMIN') {
  //   return next(new ErrorHandler("You are not authorized to view this resource", 403)); 
  // }

  const users = await prisma.user.findMany({
  });

  res.status(200).json({
    success: true,
    users,
  });
});


// Get a single user by ID
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      location: true,
      password: false,
      wallet: false,
    },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email, phone, password, role, location } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Ensure wallet is not updated
  if (req.body.wallet) {
    return next(new ErrorHandler("Cannot update wallet", 400));
  }

  const updatedData = {
    email,
    phone,
    role,
    location,
  };

  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: updatedData,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});

// Delete user
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await prisma.user.delete({
    where: { id: parseInt(id, 10) },
  });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
