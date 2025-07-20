
import express from 'express';
import schemeController from '../controllers/schemeController.js';

const router = express.Router();

// GET /api/schemes?q=search
router.get('/', schemeController.getSchemes);

// GET /api/schemes/:id
router.get('/:id', schemeController.getSchemeById);

// POST /api/schemes
router.post('/', schemeController.createScheme);

export default router;