import express from 'express';

import * as postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostsById);
router.get('/tag/:name', postController.getPostsByTag);
router.get('/topic/:name', postController.getPostsByTopic);
router.post('/', postController.createPost);

export default router;
