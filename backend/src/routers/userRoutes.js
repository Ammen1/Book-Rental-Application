import express from 'express';
import { getUsers, getUser, updateUser, deleteUser, updateUserStatus } from '../controllers/userController.js';
import { checkAbilities } from '../middlewares/checkAbility.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Apply authenticate middleware to all routes
router.use(authenticate);

router.get('/getusers', checkAbilities('read', 'User'), getUsers);
router.get('/getuser/:id', checkAbilities('read', 'User'), getUser);
router.put('/update/:id', checkAbilities('update', 'User'), updateUser);
router.delete('/delete/:id', checkAbilities('delete', 'User'), deleteUser);
router.put('/:userId/status',updateUserStatus);

export default router;
