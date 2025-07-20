
import express from 'express';
import schemeController from '../controllers/schemeController.js';

const router = express.Router();

router.get('/', schemeController.getSchemes);

router.get('/:id', schemeController.getSchemeById);


router.post('/', schemeController.createScheme);

export default router;