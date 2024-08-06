import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { checkAbilities } from '../middlewares/checkAbility.js';
import { createCategory } from '../controllers/categoryController.js';
import { validateCategory } from '../validation/validateCategory.js';

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(isAuthenticated);

router.post('/create', 
  validateCategory, // Validate the request body
  checkAbilities('create', 'Category'), // Check user permissions
  createCategory 
);

export default router;
