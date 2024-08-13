import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

const prisma = new PrismaClient();

/**
 * Controller for creating a new category.
 */
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
  }

  const { name } = req.body;

  try {
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return next(new ErrorHandler("Category already exists", 400));
    }

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

/**
 * Controller for listing all categories.
 */
export const listCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { books: true },
        },
      },
    });

    console.log(categories);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});
;

/**
 * Controller for updating a category.
 */
export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    });

    res.status(200).json({
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

/**
 * Controller for deleting a category.
 */
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});
