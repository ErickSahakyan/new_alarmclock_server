import express from 'express';
import alarmController from '../controllers/alarmController';

const router = express.Router();

router.post('/create', alarmController.createAlarm);

export = router;
