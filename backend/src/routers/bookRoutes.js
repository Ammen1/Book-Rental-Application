import express from 'express';
import { createBook, listBooks, getBookById, getBooksByOwnerId, updateBook, deleteBook, getStatistics } from '../controllers/bookController.js';
import { validateBook } from '../validation/validateBook.js';
import { checkAbilities } from '../middlewares/checkAbility.js';

const router = express.Router();

router.post(
  '/',
  validateBook,
  // checkAbilities('create', 'Book'),
  createBook
);

router.get(
  '/',
  // checkAbilities('read', 'Book'),
  listBooks
);
router.get(
  '/:id',
  // checkAbilities('read', 'Book'),
  getBookById
);

router.get(
  'owner/:ownerId',
  // checkAbilities('read', 'Book'),
  getBooksByOwnerId
);

router.put(
  '/:id',
  validateBook,
  checkAbilities('update', 'Book'),
  updateBook
);

router.delete(
  '/:id',
  checkAbilities('delete', 'Book'),
  deleteBook
);
router.get('/data/statistics',checkAbilities('read', 'Book'), getStatistics);

export default router;
