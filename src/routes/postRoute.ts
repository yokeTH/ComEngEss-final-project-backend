import express from 'express';
import fileMiddleware from '@/middlewares/fileMiddleware';
import * as postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostsById);
router.get('/tag/:name', postController.getPostsByTag);
router.get('/topic/:name', postController.getPostsByTopic);
router.post('/', fileMiddleware.single('image'), postController.createPost);

export default router;
