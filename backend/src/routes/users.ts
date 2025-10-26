import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserByPhone,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:phone', getUserByPhone);
router.put('/', updateUser);
router.delete('/:phone', deleteUser);

export default router;