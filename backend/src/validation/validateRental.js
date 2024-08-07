import { body } from 'express-validator';

export const validateRental = [
  body('bookId')
    .isInt({ gt: 0 })
    .withMessage('Book ID must be a positive integer'),
  body('renterId')
    .isInt({ gt: 0 })
    .withMessage('Renter ID must be a positive integer'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
];
