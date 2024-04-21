import express from 'express';
import * as tagtopController from '../controllers/tagtop.js';

const router = express.Router();

router.get('/tags', tagtopController.getTags);
router.get('/topics', tagtopController.getTopics);

export default router;