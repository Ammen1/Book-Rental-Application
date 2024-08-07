import express from 'express';
import { checkAbilities } from '../middlewares/checkAbility.js';
import {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { validateCategory } from '../validation/validateCategory.js';

const router = express.Router();

router.post('/',
  validateCategory,
  checkAbilities('create', 'Category'),
  createCategory
);

router.get('/',
  checkAbilities('read', 'Category'),
  listCategories
);

router.put('/:id',
  validateCategory,
  checkAbilities('update', 'Category'),
  updateCategory
);

router.delete('/:id',
  checkAbilities('delete', 'Category'),
  deleteCategory
);

export default router;
