import express from 'express';
import { getAllAssets, createAsset, updateAsset, deleteAsset } from '../controllers/assetsController.js';

const router = express.Router();

router.get('/', getAllAssets);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router; 