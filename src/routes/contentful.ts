import { Router } from 'express';

import { validateArticlePreview } from '../middlewares/contentful';
import ContentfulController from '../controllers/contentful';

const router = Router();
const controller = new ContentfulController();

//handle contentful webhook
router.post('/sendMessage', validateArticlePreview, controller.sendArticlePreviewToTelegram);

export default router;
