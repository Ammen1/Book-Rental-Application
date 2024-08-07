import { body } from 'express-validator';

export const validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 50 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 50 })
    .withMessage('Author must be less than 50 characters'),
  body('categoryId')
    .isInt({ gt: 0 })
    .withMessage('Category ID must be a positive integer'),
  body('ownerId')
    .isInt({ gt: 0 })
    .withMessage('Owner ID must be a positive integer'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),
];
