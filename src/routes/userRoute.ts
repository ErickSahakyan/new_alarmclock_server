import express from 'express';
import userController from '../controllers/userController';
import { checkAuth } from '../utils/checkAuth';
import userValidation, { validator } from '../utils/validator';

const router = express.Router();

router.post('/registration', validator, userValidation, userController.registrationUser);
router.post('/authorization', validator, userValidation,  userController.authorizationUser);
router.get('/user', checkAuth as any, userController.getUser as any );
router.post('/findUser', userController.userFind)
router.put('/reset', userController.passwordReset)

export = router;
