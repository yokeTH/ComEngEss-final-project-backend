import express from 'express';

import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/add-user', userController.createUser);
router.post('/login', userController.login);
router.get('/validate-token', userController.refreshtoken);

export default router;
