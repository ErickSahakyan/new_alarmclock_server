import express from 'express';
import alarmController from '../controllers/alarmController';
import { checkAuth } from '../utils/checkAuth';

const router = express.Router();

router.post('/create', checkAuth as any,  alarmController.createAlarm as any);
router.get('/alarms', checkAuth as any, alarmController.getMyAlarms as any);
router.put('/toggle', alarmController.toggleCondition)
router.delete('/:id',checkAuth as any,  alarmController.removeAlarm as any)
router.put('/:id', alarmController.changeAlarm)
router.post('/duplicate', checkAuth as any, alarmController.duplicateAlarm as any)


export = router;
