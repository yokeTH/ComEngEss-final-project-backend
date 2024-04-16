import express from 'express';

import * as userController from '../controllers/user';

const router = express.Router();

router.post('/add-user', userController.createUser);
router.post('/login', userController.login);

export default router;
