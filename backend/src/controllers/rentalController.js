import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Create a new rental
export const createRental = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
    }
  
    const { bookId, renterId, startDate, endDate, amount } = req.body;
  
    try {
      const book = await prisma.book.findUnique({
        where: { id: bookId },
      });
  
      if (!book) {
        return next(new ErrorHandler("Book not found", 404));
      }
  
      const renter = await prisma.user.findUnique({
        where: { id: renterId },
      });
  
      if (!renter) {
        return next(new ErrorHandler("Renter not found", 404));
      }
  
      const rental = await prisma.rental.create({
        data: {
          bookId,
          renterId,
          startDate,
          endDate,
          amount,
          rentalStatus: 'PENDING',
        },
      });
  
      // Add rental amount to the owner's wallet
      await prisma.user.update({
        where: { id: book.ownerId },
        data: { wallet: { increment: amount } },
      });
  
      res.status(201).json({
        success: true,
        rental,
      });
    } catch (error) {
      return next(new ErrorHandler("Internal Server Error", 500));
    }
  });
  
  // Update a rental by ID
  export const updateRental = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate, returnDate, amount, rentalStatus } = req.body;
  
    try {
      const rental = await prisma.rental.findUnique({
        where: { id: Number(id) },
        include: {
          book: true,
        },
      });
  
      if (!rental) {
        return next(new ErrorHandler("Rental not found", 404));
      }
  
      const updatedRental = await prisma.rental.update({
        where: { id: Number(id) },
        data: {
          startDate,
          endDate,
          returnDate,
          amount,
          rentalStatus,
        },
      });
  
      // Adjust the owner's wallet if the amount has changed
      if (amount !== rental.amount) {
        const amountDifference = amount - rental.amount;
        await prisma.user.update({
          where: { id: rental.book.ownerId },
          data: { wallet: { increment: amountDifference } },
        });
      }
  
      res.status(200).json({
        success: true,
        rental: updatedRental,
      });
    } catch (error) {
      return next(new ErrorHandler("Internal Server Error", 500));
    }
  });
// List all rentals with optional filtering
export const listRentals = catchAsyncErrors(async (req, res, next) => {
  const { bookId, renterId, rentalStatus } = req.query;

  const filter = {};
  if (bookId) filter.bookId = Number(bookId);
  if (renterId) filter.renterId = Number(renterId);
  if (rentalStatus) filter.rentalStatus = rentalStatus;

  try {
    const rentals = await prisma.rental.findMany({
      where: filter,
      include: {
        book: true,
        renter: true,
      },
    });

    res.status(200).json({
      success: true,
      rentals,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Get a rental by ID
export const getRentalById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const rental = await prisma.rental.findUnique({
      where: { id: Number(id) },
      include: {
        book: true,
        renter: true,
      },
    });

    if (!rental) {
      return next(new ErrorHandler("Rental not found", 404));
    }

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Delete a rental by ID
export const deleteRental = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.rental.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Rental deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});
