import express from 'express';
import {
  createVillage,
  getAllVillages,
  getVillageById,
  updateVillage,
  deleteVillage,
} from '../controllers/villageController.js';

const router = express.Router();

router.post('/', createVillage);
router.get('/', getAllVillages);
router.get('/:id', getVillageById);
router.put('/:id', updateVillage);
router.delete('/:id', deleteVillage);

export default router;