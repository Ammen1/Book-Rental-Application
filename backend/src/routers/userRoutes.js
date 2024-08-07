import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { checkAbilities } from '../middlewares/checkAbility.js';

const router = express.Router();

router.get('/getusers', checkAbilities('read', 'User'), getUsers);
router.get('/getuser/:id', checkAbilities('read', 'User'), getUser);
router.put('/update/:id', checkAbilities('update', 'User'), updateUser);
router.delete('/delete/:id', checkAbilities('delete', 'User'), deleteUser);

export default router;



