import express from 'express';
import { createRental, listRentals, getRentalById, updateRental, deleteRental } from '../controllers/rentalController.js';
import { validateRental } from '../validation/validateRental.js';
import { checkAbilities } from '../middlewares/checkAbility.js';

const router = express.Router();

router.post(
  '/',
  validateRental,
  checkAbilities('create', 'Rental'),
  createRental
);

router.get(
  '/',
  checkAbilities('read', 'Rental'),
  listRentals
);

router.get(
  '/:id',
  checkAbilities('read', 'Rental'),
  getRentalById
);

router.put(
  '/:id',
  validateRental,
  checkAbilities('update', 'Rental'),
  updateRental
);

router.delete(
  '/:id',
  checkAbilities('delete', 'Rental'),
  deleteRental
);

export default router;
