import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { validationResult } from 'express-validator';


const prisma = new PrismaClient();

// Controller for creating a new category
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
  }

  const { name } = req.body;

  try {
    // Check if category already exists
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return next(new ErrorHandler("Category already exists", 400));
    }

    // Create new category
    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});
