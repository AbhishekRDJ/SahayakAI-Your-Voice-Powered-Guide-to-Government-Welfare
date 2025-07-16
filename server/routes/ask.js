import express from 'express';
import { askController } from '../controllers/askController.js';
const router = express.Router();

router.post('/', askController);

export default router; 