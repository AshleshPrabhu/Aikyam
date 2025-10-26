import express from 'express';
import {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} from '../controllers/regionController.js';

const router = express.Router();

router.post('/', createRegion);
router.get('/', getAllRegions);
router.get('/:id', getRegionById);
router.put('/:id', updateRegion);
router.delete('/:id', deleteRegion);

export default router;