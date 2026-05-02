import { Router } from 'express';
import { handleChat, checkRumor } from '../controllers/aiController';

const router = Router();

router.post('/chat', handleChat);
router.post('/rumor-checker', checkRumor);

export default router;
