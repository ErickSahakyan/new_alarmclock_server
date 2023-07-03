import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/registration', userController.registrationUser);
router.post('/authorization', userController.authorizationUser);
router.get('/user', userController.getUser);

export = router;
