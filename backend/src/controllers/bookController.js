import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Create a new book
export const createBook = catchAsyncErrors(async (req, res, next) => {
  console.log('Request body:', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
  }

  const { title, author, categoryId, ownerId, quantity } = req.body;

  if (!title || !ownerId || !categoryId) {
    return next(new ErrorHandler("Title, Owner ID, and Category ID are required", 400));
  }

  try {
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      return next(new ErrorHandler("Owner not found", 404));
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        categoryId,
        ownerId,
        quantity,
        available: true,
        approved: false,
      },
    });

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// List all books with optional search and filtering
export const listBooks = catchAsyncErrors(async (req, res, next) => {
    const { title, author, categoryId, ownerId, available, approved, ownerLocation } = req.query;
  
    const filter = {};
    if (title) filter.title = { contains: title, mode: 'insensitive' };
    if (author) filter.author = { contains: author, mode: 'insensitive' };
    if (categoryId) filter.categoryId = Number(categoryId);
    if (ownerId) filter.ownerId = Number(ownerId);
    if (available) filter.available = available === 'true';
    if (approved) filter.approved = approved === 'true';
    if (ownerLocation) filter.owner = { location: { contains: ownerLocation, mode: 'insensitive' } };
  
    try {
      const books = await prisma.book.findMany({
        where: filter,
        include: {
          owner: true, 
        },
      });
      console.log(books)
      res.status(200).json({ success: true, books });
    } catch (error) {
      console.error('Error listing books:', error);
      return next(new ErrorHandler("Internal Server Error", 500));
    }
  });
  

// Get a book by ID
export const getBookById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }
    console.log(book)

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Get books by owner ID
export const getBooksByOwnerId = catchAsyncErrors(async (req, res, next) => {
  const { ownerId } = req.params;

  try {
    const books = await prisma.book.findMany({
      where: { ownerId: Number(ownerId) },
    });
    console.log(books)
    if (books.length === 0) {
      return next(new ErrorHandler("No books found for this owner", 404));
    }

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error('Error fetching books by owner ID:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Update a book by ID
export const updateBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, author, categoryId, ownerId, quantity, available, approved } = req.body;

  if (!title && !author && !categoryId && !ownerId && quantity === undefined && available === undefined && approved === undefined) {
    return next(new ErrorHandler("At least one field is required to update", 400));
  }

  try {
    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
        ownerId: ownerId !== undefined ? Number(ownerId) : undefined,
        quantity,
        available,
        approved,
      },
    });

    res.status(200).json({
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Delete a book by ID
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getStatistics = catchAsyncErrors(async (req, res, next) => {
  try {
    // Fetch counts and group by operations
    const [
      totalBooks,
      totalCategories,
      totalUsers,
      totalAvailableBooks,
      totalApprovedBooks,
      booksByOwner,
      availableBooksByCategory
    ] = await Promise.all([
      prisma.book.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.book.count({ where: { available: true } }),
      prisma.book.count({ where: { approved: true } }),
      prisma.book.groupBy({
        by: ['ownerId'],
        _count: { id: true }
      }),
      prisma.book.groupBy({
        by: ['categoryId'],
        _count: { id: true },
        where: { available: true }
      })
    ]);

    // Extract unique owner IDs and category IDs
    const ownerIds = booksByOwner.map(stat => stat.ownerId);
    const categoryIds = availableBooksByCategory.map(stat => stat.categoryId);

    // Fetch owner names
    const owners = await prisma.user.findMany({
      where: { id: { in: ownerIds } },
      select: { id: true, name: true }
    });
    console.log('Fetched owners:', owners); // Log owners

    const ownerMap = new Map(owners.map(owner => [owner.id, owner.name]));

    // Fetch category names
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true }
    });
    console.log('Fetched categories:', categories); // Log categories

    const categoryMap = new Map(categories.map(category => [category.id, category.name]));

    // Prepare response
    const statistics = {
      totalBooks,
      totalCategories,
      totalUsers,
      totalAvailableBooks,
      totalApprovedBooks,
      booksByOwner: booksByOwner.map(stat => ({
        ownerId: stat.ownerId,
        ownerName: ownerMap.get(stat.ownerId) || 'Unknown',
        bookCount: stat._count.id
      })),
      availableBooksByCategory: availableBooksByCategory.map(stat => ({
        categoryId: stat.categoryId,
        categoryName: categoryMap.get(stat.categoryId) || 'Unknown',
        availableBookCount: stat._count.id
      }))
    };

    console.log('Statistics to be sent:', statistics); // Log final statistics

    res.status(200).json({
      success: true,
      statistics
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});